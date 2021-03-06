import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { useFarmLiquidity } from 'hooks/useFarmLiquidity'
import { AppState } from 'model'
import { useMintUsd } from './useMintUsd'

export const useFarmRoi = (farmAddress: string) => {
  const farmData = useSelector((state: AppState) => state.farms[farmAddress])
  const liquidity = useFarmLiquidity(farmAddress)
  const { getTotalValue } = useMintUsd()
  const [roi, setRoi] = useState(0)

  const calcLiquidity = useCallback(async () => {
    if (!liquidity) return setRoi(0)
    const { mint_reward, reward, period } = farmData
    const rewardPerDay = (reward * BigInt(86400)) / period
    const totalReward = await getTotalValue({
      mintAddress: mint_reward,
      amount: rewardPerDay,
    })
    const roi = totalReward / liquidity
    return setRoi(roi)
  }, [farmData, getTotalValue, liquidity])

  useEffect(() => {
    calcLiquidity()
  }, [calcLiquidity])

  return { roi, apr: 365 * roi }
}
