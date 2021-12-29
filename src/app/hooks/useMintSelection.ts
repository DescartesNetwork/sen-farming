import { useCallback, useMemo, useState } from 'react'

import { useAccount } from 'senhub/providers'

export const useMintSelection = () => {
  const [searchedResult, setSearchedResult] = useState<string[]>()
  const { accounts } = useAccount()

  const accountAddresses = useMemo(() => Object.keys(accounts), [accounts])
  const onSearch = useCallback(
    (mintAddresses: string[] | undefined) => {
      if (!mintAddresses) return setSearchedResult(undefined)
      let searchedAccountAddresses = accountAddresses.filter(
        (accountAddress) => {
          const { mint } = accounts[accountAddress]
          return mintAddresses.includes(mint)
        },
      )
      return setSearchedResult(searchedAccountAddresses)
    },
    [accountAddresses, accounts],
  )

  return {
    searchedResult,
    accountAddresses,
    onSearch,
  }
}
