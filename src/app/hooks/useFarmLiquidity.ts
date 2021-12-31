import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'app/model'
import { useMintUsd } from './useMintUsd'

export const useFarmLiquidity = (farmAddress: string) => {
  const farmData = useSelector((state: AppState) => state.farms[farmAddress])
  const { getTotalValue } = useMintUsd()
  const [liquidity, setLiquidity] = useState(0)

  const calcLiquidity = useCallback(async () => {
    if (!farmData) return setLiquidity(0)
    const { total_shares, mint_stake } = farmData
    const totalValue = await getTotalValue({
      mintAddress: mint_stake,
      amount: total_shares,
    })
    return setLiquidity(totalValue)
  }, [farmData, getTotalValue])

  useEffect(() => {
    calcLiquidity()
  }, [calcLiquidity])

  return liquidity
}
