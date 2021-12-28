import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { account } from '@senswap/sen-js'

import configs from 'app/configs'
import { useWallet } from 'senhub/providers'
import { getDebts, upsetDebt } from 'app/model/debts.controller'
import { AppDispatch } from 'app/model'
import { notifyError } from 'app/helper'

const {
  sol: { farming },
} = configs

// Watch id
let watchId = 0
let prevLamports: bigint = BigInt(0)

const DebtWatcher = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    wallet: { address: walletAddress, lamports },
  } = useWallet()

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
