import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'app/model'
import { FarmState } from 'app/model/farms.controller'
import { usePool, useMint } from 'senhub/providers'
import { forceCheck } from '@senswap/react-lazyload'

const KEY_SIZE = 3

export const useSearchFarm = (farms: FarmState) => {
  const { tokenProvider } = useMint()
  const { pools } = usePool()
  const { search: keyword } = useSelector((state: AppState) => state.main)
  const [farmFilter, setFarmFilter] = useState<FarmState>({})

  const findPool = useCallback(
    (mintLpt: string) =>
      Object.keys(pools).find((addr) => pools[addr].mint_lpt === mintLpt),
    [pools],
  )

  const search = useCallback(async () => {
    if (!keyword || !pools || !farms || keyword.length < KEY_SIZE)
      return setFarmFilter(farms)

    const newFarmFilter: FarmState = {}
    const listTokenInfo = await tokenProvider.find(keyword)
    const listTokenAddress = listTokenInfo.map((info) => info.address)

    const listFarmAddress = Object.keys(farms).filter((farmAddress) => {
      const farmData = farms[farmAddress]
      const { mint_stake } = farmData
      // Search with pool
      const poolAddress = findPool(mint_stake)
      if (poolAddress) {
        // Pool address
        if (poolAddress === keyword) return true
        // Pool Token
        const { mint_a, mint_b } = pools[poolAddress]
        if (
          listTokenAddress.includes(mint_a) ||
          listTokenAddress.includes(mint_b)
        )
          return true
      }
      // Search with farm
      if (farmAddress === keyword) return true
      return listTokenAddress.includes(mint_stake)
    })

    listFarmAddress.map((addr) => (newFarmFilter[addr] = farms[addr]))
    return setFarmFilter(newFarmFilter)
  }, [farms, findPool, keyword, pools, tokenProvider])

  useEffect(() => {
    search().then(() => {
      // fix lazyload
      setTimeout(() => {
        forceCheck()
      }, 300)
    })
  }, [search])

  return farmFilter
}
