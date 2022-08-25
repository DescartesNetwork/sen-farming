import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { account } from '@senswap/sen-js'
import { useWalletAddress, useWalletBalance } from '@sentre/senhub'

import configs from 'configs'
import { getDebts, upsetDebt } from 'model/debts.controller'
import { AppDispatch } from 'model'
import { notifyError } from 'helper'

const {
  sol: { farming },
} = configs

// Watch id
let watchId = 0
let prevLamports: bigint = BigInt(0)

const DebtWatcher = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch<AppDispatch>()
  const walletAddress = useWalletAddress()
  const lamports = useWalletBalance()

  // First-time fetching
  const fetchData = useCallback(async () => {
    try {
      if (!account.isAddress(walletAddress)) return
      await dispatch(getDebts({ owner: walletAddress })).unwrap()
    } catch (er) {
      await notifyError(er)
    }
  }, [dispatch, walletAddress])

  // Watch account changes
  const watchData = useCallback(async () => {
    if (!account.isAddress(walletAddress))
      return console.warn('Wallet is not connected')
    if (watchId) return console.warn('Already watched')
    const filters = [
      { dataSize: 89 },
      { memcmp: { bytes: walletAddress, offset: 32 } },
    ]
    watchId = farming.watch((er, re: any) => {
      if (er) return console.error(er)
      const { type, address, data } = re
      if (type === 'debt') return dispatch(upsetDebt({ address, data }))
    }, filters)
  }, [dispatch, walletAddress])

  // When we close debts, there a high chance
  // that the next balance will be greater than the current balance
  // We use this trick to reload relevant list
  useEffect(() => {
    if (prevLamports && lamports > prevLamports) {
      dispatch(getDebts({ owner: walletAddress }))
    }
    prevLamports = lamports
  }, [dispatch, walletAddress, lamports])

  useEffect(() => {
    fetchData()
    watchData()
    // Unwatch (cancel socket)
    return () => {
      ;(async () => {
        try {
          await farming.unwatch(watchId)
        } catch (er) {}
      })()
      watchId = 0
    }
  }, [fetchData, watchData])

  return children
}

export default DebtWatcher
