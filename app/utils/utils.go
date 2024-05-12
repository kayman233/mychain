package utils

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
)

const (
	AuraExponent = 6
	BaseCoinUnit = "uabs"
)

// RegisterDenoms registers token denoms.
func RegisterDenoms() {
	err := sdk.RegisterDenom(BaseCoinUnit, sdk.NewDecWithPrec(1, AuraExponent))
	if err != nil {
		panic(err)
	}
}
