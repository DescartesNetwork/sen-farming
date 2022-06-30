import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import configs from 'configs'
import { AppState } from 'model'
import { FarmState } from 'model/farms.controller'

const {
  sol: { senOwners },
} = configs

export const useCommunityFarms = () => {
  const { farms } = useSelector((state: AppState) => state)
  const [communityFarms, setCommunityFarms] = useState<FarmState>({})

  const checkCommunityFarm = useCallback(
    (farmAddress: string) => !senOwners.includes(farms[farmAddress].owner),
    [farms],
  )

  const filterCommunityFarms = useCallback(
    (farms: FarmState) => {
      const newCommunityFarms: FarmState = {}
      for (const farmAddress in farms)
        if (checkCommunityFarm(farmAddress))
          newCommunityFarms[farmAddress] = farms[farmAddress]
      return setCommunityFarms(newCommunityFarms)
    },
    [checkCommunityFarm],
  )

  useEffect(() => {
    filterCommunityFarms(farms)
  }, [farms, filterCommunityFarms])

  return { communityFarms, filterCommunityFarms, checkCommunityFarm }
}
