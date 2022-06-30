import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import configs from 'configs'
import { AppState } from 'model'
import { FarmState } from 'model/farms.controller'

const {
  sol: { senOwners: senOwner },
} = configs

export const useSentreFarms = () => {
  const farms = useSelector((state: AppState) => state.farms)
  const [sentreFarms, setSentreFarms] = useState<FarmState>({})

  const checkSentreFarm = useCallback(
    (farmAddress: string) => {
      const farm = farms[farmAddress]
      return senOwner.includes(farm.owner)
    },
    [farms],
  )

  const filterSentreFarms = useCallback(
    (farms: FarmState) => {
      const newSentreFarm: FarmState = {}
      for (const addr in farms) {
        if (!checkSentreFarm(addr)) continue
        newSentreFarm[addr] = farms[addr]
      }
      setSentreFarms(newSentreFarm)
    },
    [checkSentreFarm],
  )

  useEffect(() => {
    filterSentreFarms(farms)
  }, [farms, filterSentreFarms])

  return { sentreFarms, filterSentreFarms, checkSentreFarm }
}
