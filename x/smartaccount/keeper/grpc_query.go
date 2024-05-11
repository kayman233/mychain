package keeper

import (
	"mychain/x/smartaccount/types"
)

var _ types.QueryServer = Keeper{}
