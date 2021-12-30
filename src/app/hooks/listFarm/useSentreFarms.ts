import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import configs from 'app/configs'
import { AppState } from 'app/model'
import { State } from 'app/model/farms.controller'

const {
  sol: { senOwner },
} = configs

export const useSentreFarms = () => {
  const farms = useSelector((state: AppState) => state.farms)
  const [sentreFarms, setSentreFarms] = useState<State>({})

  const filterSentreFarms = useCallback((farms: State) => {
    const newSentreFarm: State = {}
    for (const addr in farms) {
      const farm = farms[addr]
      if (!senOwner.includes(farm.owner)) continue
      newSentreFarm[addr] = farm
    }
    setSentreFarms(newSentreFarm)
  }, [])

  useEffect(() => {
    filterSentreFarms(farms)
  }, [farms, filterSentreFarms])

  return { sentreFarms, filterSentreFarms }
}
