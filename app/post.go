package app

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/auth/posthandler"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/x/auth/ante"

	"mychain/x/abstractaccount"
	abstractaccountkeeper "mychain/x/abstractaccount/keeper"
)

type PostHandlerOptions struct {
	posthandler.HandlerOptions
	AccountKeeper         ante.AccountKeeper
	AbstractAccountKeeper abstractaccountkeeper.Keeper
}

func NewPostHandler(options PostHandlerOptions) (sdk.PostHandler, error) {
	if options.AccountKeeper == nil {
		return nil, sdkerrors.ErrLogic.Wrap("account keeper is required for AnteHandler")
	}

	postDecorators := []sdk.PostDecorator{
		abstractaccount.NewAfterTxDecorator(options.AbstractAccountKeeper),
	}

	return sdk.ChainPostDecorators(postDecorators...), nil
}
