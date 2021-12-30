import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FarmData } from '@senswap/sen-js'

import { AppState } from 'app/model'
import { State } from 'app/model/farms.controller'
import { usePool, useMint } from 'senhub/providers'

const KEY_SIZE = 3

export const useSearchFarm = (farms: State) => {
  const { tokenProvider } = useMint()
  const { pools } = usePool()
  const { search: keyword } = useSelector((state: AppState) => state.main)
  const [farmFilter, setFarmFilter] = useState<Record<string, FarmData>>({})

  const search = useCallback(async () => {
    if (!keyword || !pools || !farms || keyword.length < KEY_SIZE)
      return setFarmFilter(farms)

    const newFarmFilter: Record<string, FarmData> = {}
    for (const addr in farms) {
      const farm = farms[addr]
      const { mint_stake } = farm
      let check = false

      // farm address
      if (addr === keyword) check = true
      // token
      const mintStakeInfo = await tokenProvider.findByAddress(mint_stake)
      if (mintStakeInfo) {
        // token symbol
        const tokenName = mintStakeInfo.symbol + mintStakeInfo.name
        if (tokenName.toLowerCase().includes(keyword.toLowerCase()))
          check = true
        // token address
        if (mintStakeInfo.address === keyword) check = true
      }
      if (check) newFarmFilter[addr] = farm
    }

    setFarmFilter(newFarmFilter)
  }, [farms, keyword, pools, tokenProvider])

  useEffect(() => {
    search()
  }, [search])

  return farmFilter
}
