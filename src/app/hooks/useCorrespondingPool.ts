import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { account, PoolData } from '@senswap/sen-js'

import { usePool } from 'senhub/providers'

import { AppState } from 'app/model'

export const useFarmPool = (
  farmAddress: string,
): { address: string; data: PoolData } | undefined => {
  const [farmPool, setFarmPool] =
    useState<{ address: string; data: PoolData }>()
  const {
    farms: { [farmAddress]: farmData },
  } = useSelector((state: AppState) => state)
  const { pools } = usePool()

  const findPoolData = useCallback(async () => {
    const mintStake = farmData?.mint_stake
    if (!mintStake) return setFarmPool(undefined)
    const poolAddr = Object.keys(pools).find((poolAddress) => {
      const { mint_lpt } = pools[poolAddress]
      return mint_lpt === mintStake
    })
    if (!account.isAddress(poolAddr)) return setFarmPool(undefined)
    const newPoolData = pools[poolAddr]
    return setFarmPool({ address: poolAddr, data: newPoolData })
  }, [farmData?.mint_stake, pools])

  useEffect(() => {
    findPoolData()
  }, [findPoolData])

  return farmPool
}
