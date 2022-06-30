import { useCallback, useEffect, useState } from 'react'

import { useMintUsd } from './../useMintUsd'
import { useSentreFarms } from './useSentreFarms'

export const useSentreFarmsTvl = () => {
  const [tvl, setTvl] = useState(0)
  const { sentreFarms } = useSentreFarms()
  const { getTotalValue } = useMintUsd()

  const calcTvl = useCallback(async () => {
    let farmsTvl = 0
    await Promise.all(
      Object.values(sentreFarms).map(async (farm) => {
        const { total_shares, mint_stake } = farm
        const farmTvl = await getTotalValue({
          mintAddress: mint_stake,
          amount: total_shares,
        })
        farmsTvl += farmTvl
      }),
    )
    setTvl(farmsTvl)
  }, [sentreFarms, getTotalValue])

  useEffect(() => {
    calcTvl()
  }, [calcTvl])

  return tvl
}
