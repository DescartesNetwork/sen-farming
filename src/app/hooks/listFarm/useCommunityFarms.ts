import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import configs from 'app/configs'
import { AppState } from 'app/model'
import { State } from 'app/model/farms.controller'

const {
  sol: { senOwner },
} = configs

export const useComunityFarms = () => {
  const farms = useSelector((state: AppState) => state.farms)
  const [communityFarms, setCommunityFarms] = useState<State>({})

  const isCommunityFarm = useCallback(
    (farmAddress: string) => {
      const farm = farms[farmAddress]
      return !senOwner.includes(farm.owner)
    },
    [farms],
  )

  const filterCommunityFarms = useCallback(
    (farms: State) => {
      const newSentreFarm: State = {}
      for (const addr in farms) {
        if (!isCommunityFarm(addr)) continue
        newSentreFarm[addr] = farms[addr]
      }
      setCommunityFarms(newSentreFarm)
    },
    [isCommunityFarm],
  )

  useEffect(() => {
    filterCommunityFarms(farms)
  }, [farms, filterCommunityFarms])

  return { communityFarms, filterCommunityFarms, isCommunityFarm }
}
