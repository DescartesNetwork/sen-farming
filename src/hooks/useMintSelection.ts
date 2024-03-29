import { useCallback, useMemo, useState } from 'react'
import { useAccounts, tokenProvider } from '@sentre/senhub'

const KEYSIZE = 3

export const useMintSelection = () => {
  const [searchedAccount, setSearchedAccount] = useState<string[]>()
  const accounts = useAccounts()

  const accountAddresses = useMemo(() => Object.keys(accounts), [accounts])
  const onSearch = useCallback(
    async (keyword: string | undefined) => {
      if (!keyword || keyword.length < KEYSIZE)
        return setSearchedAccount(undefined)
      const raw = await tokenProvider.find(keyword)
      const searchedTokenAddress = raw.map(({ address }) => address)
      let searchedAccount: string[] = []
      // Filter Tokens
      accountAddresses.forEach((accAddr) => {
        if (!searchedTokenAddress.includes(accounts[accAddr]?.mint)) return
        return searchedAccount.push(accAddr)
      })
      return setSearchedAccount(searchedAccount)
    },
    [accountAddresses, accounts],
  )

  return {
    searchedAccount,
    accountAddresses,
    onSearch,
  }
}
