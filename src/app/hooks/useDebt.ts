import { useDispatch } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { account, DebtData } from '@senswap/sen-js'

import { useWallet } from 'senhub/providers'

import configs from 'app/configs'
import { AppDispatch } from 'app/model'
import { getDebt } from 'app/model/debts.controller'

const {
  sol: { farming },
} = configs

export const useDebt = (farmAddress: string) => {
  const { wallet } = useWallet()
  const dispatch = useDispatch<AppDispatch>()
  const [debtData, setDebtData] = useState<DebtData>()

  const fetchDebtData = useCallback(async () => {
    if (!account.isAddress(farmAddress)) return
    const debtAddr = await farming.deriveDebtAddress(
      wallet.address,
      farmAddress,
    )
    const debtData = await dispatch(getDebt({ address: debtAddr })).unwrap()
    setDebtData(debtData[debtAddr])
  }, [dispatch, farmAddress, wallet.address])

  useEffect(() => {
    fetchDebtData()
  }, [fetchDebtData])

  return debtData
}
