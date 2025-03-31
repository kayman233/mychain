// main.go

package main

import (
	"encoding/json"
	"net/http"
	"time"

	"log"

	"github.com/gorilla/mux"
	"github.com/rs/cors"

	"context"
	"errors"
	"fmt"

	"os"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	wasm "github.com/CosmWasm/wasmd/x/wasm/types"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/tx"
	"github.com/cosmos/cosmos-sdk/types/tx/signing"
	authsigning "github.com/cosmos/cosmos-sdk/x/auth/signing"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	proto "github.com/cosmos/gogoproto/proto"

	simapp "github.com/larry0x/abstract-account/simapp"
	"github.com/larry0x/abstract-account/x/abstractaccount/types"
)

const (
	chainID        = "mychain"
	grpcURL        = "127.0.0.1:9090"
	keyringBackend = "test"
	rootDir        = "/.mychain"
	signMode       = signing.SignMode_SIGN_MODE_DIRECT
)

type SendData struct {
	Sender    string `json:"sender"`
	Recipient string `json:"recipient"`
	Denom     string `json:"denom"`
	Amount    string `json:"amount"`
	User      string `json:"user"`
}

type CreateData struct {
	Sender string `json:"sender"`
	CodeID uint64 `json:"code_id"`
	Msg    string `json:"msg"`
	Funds  string `json:"funds"`
	Salt   string `json:"salt"`
}

type MsgRegisterAccount struct {
	Type string `json:"@type"`
	// Sender is the actor who signs the message
	Sender string `protobuf:"bytes,1,opt,name=sender,proto3" json:"sender,omitempty"`
	// CodeID indicates which wasm binary code is to be used for this contract
	CodeID uint64 `protobuf:"varint,2,opt,name=code_id,json=codeId,proto3" json:"code_id,omitempty"`
	// Msg is the JSON-encoded instantiate message for the contract
	Msg wasm.RawContractMessage `protobuf:"bytes,3,opt,name=msg,proto3,casttype=github.com/CosmWasm/wasmd/x/wasm/types.RawContractMessage" json:"msg,omitempty"`
	// Funds are coins to be deposited to the contract on instantiattion
	Funds sdk.Coins `protobuf:"bytes,4,rep,name=funds,proto3,castrepeated=github.com/cosmos/cosmos-sdk/types.Coins" json:"funds"`
	// Salt is an arbinary value to be used in deriving the account address.
	// Max 64 bytes.
	Salt []byte `protobuf:"bytes,5,opt,name=salt,proto3" json:"salt,omitempty"`
}

func handleSend(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var data SendData
	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	res := sendSignAndBroadcast(data)

	response, err := json.Marshal(res)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(response)
}

func handleCreate(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var data CreateData
	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	res := createSignAndBroadcast(data)

	response, err := json.Marshal(res)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(response)
}

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/send", handleSend).Methods("POST")
	router.HandleFunc("/create", handleCreate).Methods("POST")

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{
			"Content-Type",
			"Authorization",
			"X-Requested-With",
			"Access-Control-Allow-Origin",
			"Access-Control-Allow-Headers",
			"Access-Control-Allow-Methods",
			"Access-Control-Allow-Credentials",
			"Access-Control-Max-Age",
		},
		ExposedHeaders: []string{
			"Content-Type",
			"Access-Control-Allow-Origin",
		},
		AllowCredentials: true,
		MaxAge: 86400,
		Debug: true,
	})

	handler := c.Handler(router)

	log.Println("Server listening on :8080...")
	log.Fatal(http.ListenAndServe(":8080", handler))
}

type Body struct {
	Messages                    []Message `json:"messages"`
	Memo                        string    `json:"memo"`
	TimeoutHeight               string    `json:"timeout_height"`
	ExtensionOptions            []string  `json:"extension_options"`
	NonCriticalExtensionOptions []string  `json:"non_critical_extension_options"`
}

type Message struct {
	Type        string       `json:"@type"`
	FromAddress string       `json:"from_address"`
	ToAddress   string       `json:"to_address"`
	Amount      []AmountData `json:"amount"`
}

type AmountData struct {
	Denom  string `json:"denom"`
	Amount string `json:"amount"`
}

type AuthInfo struct {
	SignerInfos []string `json:"signer_infos"`
	Fee         Fee      `json:"fee"`
	Tip         *string  `json:"tip"`
}

type Fee struct {
	Amount   []string `json:"amount"`
	GasLimit string   `json:"gas_limit"`
	Payer    string   `json:"payer"`
	Granter  string   `json:"granter"`
}

func sendSignAndBroadcast(data SendData) interface{} {
	encCfg := simapp.MakeEncodingConfig()

	dirname, err := os.UserHomeDir()
	if err != nil {
		panic(err)
	}

	keybase, err := keyring.New(sdk.KeyringServiceName(), keyringBackend, dirname+rootDir, os.Stdin, encCfg.Codec)
	if err != nil {
		panic(err)
	}

	conn, err := grpc.Dial(grpcURL, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		panic(err)
	}

	queryClient := authtypes.NewQueryClient(conn)

	txBz := getSendData(data)

	stdTx, err := encCfg.TxConfig.TxJSONDecoder()(txBz)
	if err != nil {
		panic(err)
	}

	signerAcc, err := getSingerOfTx(queryClient, stdTx)
	if err != nil {
		panic(err)
	}

	signerData := authsigning.SignerData{
		Address:       signerAcc.GetAddress().String(),
		ChainID:       chainID,
		AccountNumber: signerAcc.GetAccountNumber(),
		Sequence:      signerAcc.GetSequence(),
		PubKey:        signerAcc.GetPubKey(),
	}

	txBuilder, err := encCfg.TxConfig.WrapTxBuilder(stdTx)
	if err != nil {
		panic(err)
	}

	sigData := signing.SingleSignatureData{
		SignMode:  signMode,
		Signature: nil,
	}

	sig := signing.SignatureV2{
		PubKey:   signerAcc.GetPubKey(),
		Data:     &sigData,
		Sequence: signerAcc.GetSequence(),
	}

	if err := txBuilder.SetSignatures(sig); err != nil {
		panic(err)
	}

	signBytes, err := encCfg.TxConfig.SignModeHandler().GetSignBytes(signMode, signerData, txBuilder.GetTx())
	if err != nil {
		panic(err)
	}

	sigBytes, _, err := keybase.Sign(data.User, signBytes)
	if err != nil {
		panic(err)
	}

	sigData = signing.SingleSignatureData{
		SignMode:  signMode,
		Signature: sigBytes,
	}

	sig = signing.SignatureV2{
		PubKey:   signerAcc.GetPubKey(),
		Data:     &sigData,
		Sequence: signerAcc.GetSequence(),
	}

	if err := txBuilder.SetSignatures(sig); err != nil {
		panic(err)
	}

	txBytes, err := encCfg.TxConfig.TxEncoder()(txBuilder.GetTx())

	txClient := tx.NewServiceClient(conn)

	grpcRes, err := txClient.BroadcastTx(
		context.Background(),
		&tx.BroadcastTxRequest{
			Mode:    tx.BroadcastMode_BROADCAST_MODE_SYNC,
			TxBytes: txBytes, // Proto-binary of the signed transaction, see previous step.
		},
	)

	if err != nil {
		panic(err)
	}

	fmt.Printf("TxResponse %d\n", grpcRes.TxResponse.Code)
	fmt.Printf("TxHash %s\n", grpcRes.TxResponse.TxHash)

	if grpcRes.TxResponse.Code != 0 {
		return map[string]string{"result": "fail"}
	}

	return map[string]string{
		"result": "success",
		"txHash": grpcRes.TxResponse.TxHash,
	}
}

func getSendData(data SendData) []byte {
	message := Message{
		Type:        "/cosmos.bank.v1beta1.MsgSend",
		FromAddress: data.Sender,
		ToAddress:   data.Recipient,
		Amount:      []AmountData{{Denom: data.Denom, Amount: data.Amount}},
	}

	body := Body{
		Messages:                    []Message{message},
		Memo:                        "",
		TimeoutHeight:               "0",
		ExtensionOptions:            []string{},
		NonCriticalExtensionOptions: []string{},
	}

	authInfo := AuthInfo{
		SignerInfos: []string{},
		Fee: Fee{
			Amount:   []string{},
			GasLimit: "200000",
			Payer:    "",
			Granter:  "",
		},
		Tip: nil,
	}

	response := map[string]interface{}{
		"body":      body,
		"auth_info": authInfo,
	}

	// Convert response to JSON
	resJSON, err := json.Marshal(response)
	if err != nil {
		panic(err)
	}

	// Return response as []byte
	return resJSON
}

func getSingerOfTx(queryClient authtypes.QueryClient, stdTx sdk.Tx) (*types.AbstractAccount, error) {
	var signerAddr sdk.AccAddress = nil
	for i, msg := range stdTx.GetMsgs() {
		signers := msg.GetSigners()
		if len(signers) != 1 {
			return nil, fmt.Errorf("msg %d has more than one signers", i)
		}

		if signerAddr != nil && !signerAddr.Equals(signers[0]) {
			return nil, errors.New("tx has more than one signers")
		}

		signerAddr = signers[0]
	}

	req := &authtypes.QueryAccountRequest{
		Address: signerAddr.String(),
	}

	res, err := queryClient.Account(context.Background(), req)
	if err != nil {
		return nil, err
	}

	if res.Account.TypeUrl != typeURL((*types.AbstractAccount)(nil)) { // This is the part where the logic for signing AbstractAccount is different
		return nil, fmt.Errorf("signer %s is not an AbstractAccount", signerAddr.String())
	}

	var acc = &types.AbstractAccount{}
	if err = proto.Unmarshal(res.Account.Value, acc); err != nil {
		return nil, err
	}

	return acc, nil
}

func typeURL(x proto.Message) string {
	return "/" + proto.MessageName(x)
}

type CreateBody struct {
	Messages                    []MsgRegisterAccount `json:"messages"`
	Memo                        string               `json:"memo"`
	TimeoutHeight               string               `json:"timeout_height"`
	ExtensionOptions            []string             `json:"extension_options"`
	NonCriticalExtensionOptions []string             `json:"non_critical_extension_options"`
}

func getCreateData(data CreateData) []byte {
	amount, err := sdk.ParseCoinsNormalized(data.Funds)

	msg := &MsgRegisterAccount{
		Type:   "/abstractaccount.v1.MsgRegisterAccount",
		CodeID: data.CodeID,
		Funds:  amount,
		Msg:    []byte(data.Msg),
		Salt:   []byte(data.Salt),
		Sender: data.Sender,
	}

	body := CreateBody{
		Messages:                    []MsgRegisterAccount{*msg},
		Memo:                        "",
		TimeoutHeight:               "0",
		ExtensionOptions:            []string{},
		NonCriticalExtensionOptions: []string{},
	}

	authInfo := AuthInfo{
		SignerInfos: []string{},
		Fee: Fee{
			Amount:   []string{},
			GasLimit: "200000",
			Payer:    "",
			Granter:  "",
		},
		Tip: nil,
	}

	response := map[string]interface{}{
		"body":      body,
		"auth_info": authInfo,
	}

	// Convert response to JSON
	resJSON, err := json.Marshal(response)
	if err != nil {
		panic(err)
	}

	// Return response as []byte
	return resJSON
}

func DecodeBech32AccAddr(addr string) (sdk.AccAddress, error) {
	return sdk.GetFromBech32(addr, "cosmos")
}

func createSignAndBroadcast(data CreateData) interface{} {
	encCfg := simapp.MakeEncodingConfig()

	dirname, err := os.UserHomeDir()
	if err != nil {
		panic(err)
	}

	keybase, err := keyring.New(sdk.KeyringServiceName(), keyringBackend, dirname+rootDir, os.Stdin, encCfg.Codec)
	if err != nil {
		panic(err)
	}

	address, err := DecodeBech32AccAddr(data.Sender)
	if err != nil {
		return nil
	}

	pubKey, err := keybase.KeyByAddress(address)
	if err != nil {
		return nil
	}

	conn, err := grpc.Dial(grpcURL, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		panic(err)
	}

	queryClient := authtypes.NewQueryClient(conn)

	txBz := getCreateData(data)

	stdTx, err := encCfg.TxConfig.TxJSONDecoder()(txBz)
	if err != nil {
		panic(err)
	}

	signerAcc, err := getSingerOfTxDefault(queryClient, stdTx)
	if err != nil {
		panic(err)
	}

	pb, err := pubKey.GetPubKey()

	signerData := authsigning.SignerData{
		Address:       signerAcc.GetAddress().String(),
		ChainID:       chainID,
		AccountNumber: signerAcc.GetAccountNumber(),
		Sequence:      signerAcc.GetSequence(),
		PubKey:        pb,
	}

	txBuilder, err := encCfg.TxConfig.WrapTxBuilder(stdTx)
	if err != nil {
		panic(err)
	}

	sigData := signing.SingleSignatureData{
		SignMode:  signMode,
		Signature: nil,
	}

	sig := signing.SignatureV2{
		PubKey:   pb,
		Data:     &sigData,
		Sequence: signerAcc.GetSequence(),
	}

	if err := txBuilder.SetSignatures(sig); err != nil {
		panic(err)
	}

	signBytes, err := encCfg.TxConfig.SignModeHandler().GetSignBytes(signMode, signerData, txBuilder.GetTx())
	if err != nil {
		panic(err)
	}

	sigBytes, _, err := keybase.SignByAddress(address, signBytes)
	if err != nil {
		panic(err)
	}

	sigData = signing.SingleSignatureData{
		SignMode:  signMode,
		Signature: sigBytes,
	}

	sig = signing.SignatureV2{
		PubKey:   pb,
		Data:     &sigData,
		Sequence: signerAcc.GetSequence(),
	}

	if err := txBuilder.SetSignatures(sig); err != nil {
		panic(err)
	}

	txBytes, err := encCfg.TxConfig.TxEncoder()(txBuilder.GetTx())

	txClient := tx.NewServiceClient(conn)

	grpcRes, err := txClient.BroadcastTx(
		context.Background(),
		&tx.BroadcastTxRequest{
			Mode:    tx.BroadcastMode_BROADCAST_MODE_SYNC,
			TxBytes: txBytes, // Proto-binary of the signed transaction, see previous step.
		},
	)

	if err != nil {
		panic(err)
	}

	fmt.Printf("TxResponse %d\n", grpcRes.TxResponse.Code)
	fmt.Printf("TxHash %s\n", grpcRes.TxResponse.TxHash)

	if grpcRes.TxResponse.Code != 0 {
		return map[string]string{"result": "fail"}
	}

	request := &tx.GetTxRequest{
		Hash: grpcRes.TxResponse.TxHash,
	}

	// refactor waiting for block
	time.Sleep(5 * time.Second)

	txByHashResponse, err := txClient.GetTx(context.Background(), request)

	events := []string{}
	for _, event := range txByHashResponse.TxResponse.Events {
		events = append(events, event.Type)
	}

	return map[string]interface{}{
		"result": "success",
		"txHash": grpcRes.TxResponse.TxHash,
		"events": txByHashResponse.TxResponse.Events,
	}
}

func getSingerOfTxDefault(queryClient authtypes.QueryClient, stdTx sdk.Tx) (*authtypes.BaseAccount, error) {
	var signerAddr sdk.AccAddress = nil
	for i, msg := range stdTx.GetMsgs() {
		signers := msg.GetSigners()
		if len(signers) != 1 {
			return nil, fmt.Errorf("msg %d has more than one signers", i)
		}

		if signerAddr != nil && !signerAddr.Equals(signers[0]) {
			return nil, errors.New("tx has more than one signers")
		}

		signerAddr = signers[0]
	}

	req := &authtypes.QueryAccountRequest{
		Address: signerAddr.String(),
	}

	res, err := queryClient.Account(context.Background(), req)
	if err != nil {
		return nil, err
	}

	if res.Account.TypeUrl != typeURL((*authtypes.BaseAccount)(nil)) { // This is the part where the logic for signing AbstractAccount is different
		return nil, fmt.Errorf("signer %s is not an AbstractAccount", signerAddr.String())
	}

	var acc = &authtypes.BaseAccount{}
	if err = proto.Unmarshal(res.Account.Value, acc); err != nil {
		return nil, err
	}

	return acc, nil
}
