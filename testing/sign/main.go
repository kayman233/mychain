package main

import (
	"context"
	"errors"
	"fmt"
	"os"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/tx/signing"
	authsigning "github.com/cosmos/cosmos-sdk/x/auth/signing"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	proto "github.com/cosmos/gogoproto/proto"

	simapp "github.com/larry0x/abstract-account/simapp"
	"github.com/larry0x/abstract-account/x/abstractaccount/types"
)

const (
	chainID        = "mychain"
	fileIn         = "./1-bank-send-unsigned.json"
	fileOut        = "./1-bank-send.json"
	grpcURL        = "127.0.0.1:9090"
	keyName        = "user1"
	keyringBackend = "test"
	rootDir        = "/Users/ivan/.mychain"
	signMode       = signing.SignMode_SIGN_MODE_DIRECT
)

func main() {
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

	txBz, err := os.ReadFile(fileIn)
	if err != nil {
		panic(err)
	}

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

	sigBytes, _, err := keybase.Sign(keyName, signBytes)
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

	json, err := encCfg.TxConfig.TxJSONEncoder()(txBuilder.GetTx())
	if err != nil {
		panic(err)
	}

	fp, err := os.OpenFile(fileOut, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0o644)
	if err != nil {
		panic(err)
	}

	fp.Write(json)
	fp.Close()

	fmt.Println(string(json))
	fmt.Printf("Signed tx written to %s\n", fileOut)
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
