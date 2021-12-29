import { useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import isEqual from 'react-fast-compare'
import { AccountData } from '@senswap/sen-js'

import { useAccount, useWallet } from 'senhub/providers'

import { AppState } from 'app/model'

export const useAccountStake = (
  farmAddress: string,
): { address: string; data: AccountData } | undefined => {
  const { accounts } = useAccount()
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const farmData = useSelector((state: AppState) => state.farms[farmAddress])
  const [accountStake, setAccountStake] =
    useState<{ address: string; data: AccountData }>()

  const findAccountStake = useCallback(async () => {
    const mintStake = farmData?.mint_stake
    if (!mintStake) return setAccountStake(undefined)
    const { splt } = window.sentre
    let accountAddr = await splt.deriveAssociatedAddress(
      walletAddress,
      farmData.mint_stake,
    )
    const newAccountData = accounts[accountAddr]
    if (isEqual(newAccountData, accountStake?.data)) return
    return setAccountStake({ address: accountAddr, data: newAccountData })
  }, [accountStake?.data, accounts, farmData.mint_stake, walletAddress])

  useEffect(() => {
    findAccountStake()
  }, [findAccountStake])

  return accountStake
}