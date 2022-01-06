import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { utils } from '@senswap/sen-js'

import { AppState } from 'app/model'
import useMintCgk from 'app/shared/hooks/useMintCgk'
import useMintDecimals from 'shared/hooks/useMintDecimals'

export const useBudget = (
  farmAddress: string,
): { budget: number; budgetSymbol: string } => {
  const [budget, setBudget] = useState(0)
  const {
    farms: { [farmAddress]: farmData },
  } = useSelector((state: AppState) => state)
  const { treasury_stake, treasury_reward, mint_reward, total_shares } =
    farmData || {}
  const decimal = useMintDecimals(mint_reward) || 0
  const { symbol: budgetSymbol } = useMintCgk(mint_reward)

  useEffect(() => {
    ;(async () => {
      try {
        const { splt } = window.sentre
        let { amount } = await splt.getAccountData(treasury_reward)
        if (treasury_reward === treasury_stake) amount = amount - total_shares
        const budget = Number(utils.undecimalize(amount, decimal))
        setBudget(budget)
      } catch (er) {
        setBudget(0)
      }
    })()
  }, [decimal, total_shares, treasury_reward, treasury_stake])

  return { budget, budgetSymbol }
}
