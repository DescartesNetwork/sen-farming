import { useCallback } from 'react'
import { Swap, utils } from '@senswap/sen-js'

import { useMint, usePool } from 'senhub/providers'
import { fetchCGK } from 'shared/util'

export const useMintUsd = () => {
  const { tokenProvider, getMint } = useMint()
  const { pools } = usePool()

  const getMintUSD = useCallback(
    async (mintAddress: string, amount: bigint) => {
      try {
        const tokenInfo = await tokenProvider.findByAddress(mintAddress)
        if (!tokenInfo) return 0
        const ticket = tokenInfo.extensions?.coingeckoId
        if (!ticket) return 0
        const cgkData = await fetchCGK(ticket)
        return (
          Number(utils.undecimalize(amount, tokenInfo.decimals)) * cgkData.price
        )
      } catch (error) {
        return 0
      }
    },
    [tokenProvider],
  )

  const getMintLptUSD = useCallback(
    async (lptAddress: string, amount: bigint) => {
      const poolData = Object.values(pools).find(
        (pool) => pool.mint_lpt === lptAddress,
      )
      if (!poolData) return 0
      const { reserve_a, reserve_b, mint_a, mint_b } = poolData
      if (reserve_a * reserve_b === BigInt(0)) return 0
      const {
        [lptAddress]: { supply },
      } = await getMint({ address: lptAddress })
      const { deltaA, deltaB } = Swap.oracle.withdraw(
        amount,
        supply,
        reserve_a,
        reserve_b,
      )
      const balanceA: number = await getMintUSD(mint_a, deltaA)
      const balanceB: number = await getMintUSD(mint_b, deltaB)
      return balanceA + balanceB
    },
    [getMint, getMintUSD, pools],
  )

  const getTotalValue = useCallback(
    async ({
      mintAddress,
      amount,
    }: {
      mintAddress: string
      amount: bigint
    }) => {
      const tokenInfo = await tokenProvider.findByAddress(mintAddress)
      if (!tokenInfo) return getMintLptUSD(mintAddress, amount)
      return getMintUSD(mintAddress, amount)
    },
    [getMintLptUSD, getMintUSD, tokenProvider],
  )
  return { getTotalValue }
}
