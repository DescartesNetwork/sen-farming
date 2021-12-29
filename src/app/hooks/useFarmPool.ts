import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import isEqual from 'react-fast-compare'
import { PoolData } from '@senswap/sen-js'

import { usePool } from 'senhub/providers'

import { AppState } from 'app/model'

export const useFarmPool = (
  farmAddress: string,
): { address: string; data: PoolData } | undefined => {
  const { pools } = usePool()
  const farmData = useSelector((state: AppState) => state.farms[farmAddress])
  const [farmPool, setFarmPool] =
    useState<{ address: string; data: PoolData }>()

  const findPoolData = useCallback(async () => {
    const mintStake = farmData?.mint_stake
    if (!mintStake) return setFarmPool(undefined)
    let address: string = ''
    for (const poolAddress in pools) {
      const poolData = pools[poolAddress]
      if (poolData.mint_lpt !== mintStake) continue
      address = poolAddress
      break
    }
    const newPoolData = pools[address]
    if (isEqual(newPoolData, farmPool?.data)) return
    return setFarmPool({ address, data: newPoolData })
  }, [farmData?.mint_stake, farmPool, pools])

  useEffect(() => {
    findPoolData()
  }, [findPoolData])

  return farmPool
}
