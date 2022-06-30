import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { account, DebtData } from '@senswap/sen-js'
import { useWallet } from '@senhub/providers'

import configs from 'configs'
import { AppState } from 'model'

const {
  sol: { farming },
} = configs

export const useDebt = (
  farmAddress: string,
): { address: string; data: DebtData } => {
  const [debtAddress, setDebtAddress] = useState('')
  const {
    debts: { [debtAddress]: debtData },
  } = useSelector((state: AppState) => state)
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const fetchDebtAddress = useCallback(async () => {
    if (!account.isAddress(farmAddress)) return setDebtAddress('')
    const debtAddr = await farming.deriveDebtAddress(walletAddress, farmAddress)
    return setDebtAddress(debtAddr)
  }, [farmAddress, walletAddress])

  useEffect(() => {
    fetchDebtAddress()
  }, [fetchDebtAddress])

  return { address: debtAddress, data: debtData }
}
