import { useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { account, DebtData } from '@senswap/sen-js'

import { useWallet } from 'senhub/providers'

import configs from 'app/configs'
import { AppState } from 'app/model'

const {
  sol: { farming },
} = configs

export const useDebt = (
  farmAddress: string,
): { address: string; data: DebtData } => {
  const { wallet } = useWallet()
  const [debtAddress, setDebtAddress] = useState('')
  const debtData: DebtData = useSelector(
    (state: AppState) => state.debts[debtAddress],
  )

  const fetchDebtAddress = useCallback(async () => {
    if (!account.isAddress(farmAddress)) return
    const debtAddr = await farming.deriveDebtAddress(
      wallet.address,
      farmAddress,
    )
    setDebtAddress(debtAddr)
  }, [farmAddress, wallet.address])

  useEffect(() => {
    fetchDebtAddress()
  }, [fetchDebtAddress])

  return { address: debtAddress, data: debtData }
}
