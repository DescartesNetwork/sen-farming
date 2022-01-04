import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { utils } from '@senswap/sen-js'

import { AppState } from 'app/model'
import useMintDecimals from 'app/shared/hooks/useMintDecimals'
import useMintCgk from 'app/shared/hooks/useMintCgk'

export const useBudget = (
  farmAddress: string,
): { budget: number | string; symbol: string } => {
  const [budget, setBudget] = useState('0')
  const farmData = useSelector((state: AppState) => state.farms?.[farmAddress])
  const { treasury_stake, treasury_reward, mint_reward, total_shares } =
    farmData || {}
  const decimal = useMintDecimals(mint_reward)
  const { symbol } = useMintCgk(mint_reward)

  useEffect(() => {
    ;(async () => {
      try {
        const { splt } = window.sentre
        let { amount } = await splt.getAccountData(treasury_reward)
        if (treasury_reward === treasury_stake) amount = amount - total_shares
        const budget = utils.undecimalize(amount, decimal)
        setBudget(budget)
      } catch (er) {
        setBudget('0')
      }
    })()
  }, [decimal, total_shares, treasury_reward, treasury_stake])

  return { budget, symbol }
}
