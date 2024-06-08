// main.go

package main

import (
	"encoding/json"
	"net/http"

	"log"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"

	"context"
	"errors"
	"fmt"

	"os"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

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
	chainID = "mychain"
	// fileIn  = "./1-bank-send-unsigned.json"
	// fileOut = "./1-bank-send.json"
	grpcURL = "127.0.0.1:9090"
	// keyName        = "user1"
	keyringBackend = "test"
	rootDir        = "/Users/ivan/.mychain"
	signMode       = signing.SignMode_SIGN_MODE_DIRECT
)

type SignData struct {
	Sender    string `json:"sender"`
	Recipient string `json:"recipient"`
	Denom     string `json:"denom"`
	Amount    string `json:"amount"`
	User      string `json:"user"`
}

func handleSign(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var data SignData
	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	signResponse := sign(data)

	response, err := json.Marshal(signResponse)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.WriteHeader(http.StatusOK)
	w.Write(response)
}

func main() {
	// mux := http.NewServeMux()
	// mux.HandleFunc("/sign", handleSign)

	// c := cors.AllowAll()
	// handler := c.Handler(mux)
	// // http.HandleFunc("/sign", handleSign)

	// log.Println("Server listening on :8080...")
	// http.ListenAndServe(":8000", handler)

	cors := handlers.CORS(
		handlers.AllowedHeaders([]string{"content-type"}),
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowCredentials(),
	)

	router := mux.NewRouter()
	router.HandleFunc("/sign", handleSign).Methods("POST", "OPTIONS")
	router.Use(cors)

	log.Println("Server listening on :8080...")
	log.Fatal(http.ListenAndServe(":8080", router))
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

func sign(data SignData) interface{} {
	encCfg := simapp.MakeEncodingConfig()

	keybase, err := keyring.New(sdk.KeyringServiceName(), keyringBackend, rootDir, os.Stdin, encCfg.Codec)
	if err != nil {
		panic(err)
	}

	conn, err := grpc.Dial(grpcURL, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		panic(err)
	}

	queryClient := authtypes.NewQueryClient(conn)

	txBz := getDataToSign(data)

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

	// rest := txBuilder.GetTx()

	// test, err := encCfg.TxConfig.TxEncoder()(txBuilder.GetTx())
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

	if grpcRes.TxResponse.Code != 0 {
		return map[string]string{"result": "fail"}
	}
	// fmt.Println(grpcRes.TxResponse.Code) // Should be `0` if the tx is successful

	// json, err := encCfg.TxConfig.TxJSONEncoder()(txBuilder.GetTx())
	// if err != nil {
	// 	panic(err)
	// }

	// fp, err := os.OpenFile(fileOut, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0o644)
	// if err != nil {
	// 	panic(err)
	// }

	// fp.Write(json)
	// fp.Close()

	// fmt.Println(string(json))
	// fmt.Printf("Signed tx written to %s\n", fileOut)

	return map[string]string{
		"result": "success",
	}
}

func getDataToSign(data SignData) []byte {
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

	// Write response to file
	// err = ioutil.WriteFile("res.json", resJSON, 0644)
	// if err != nil {
	// 	panic(err)
	// }

	// fmt.Println(string(resJSON))

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
