import { useCallback, useEffect, useState } from 'react'
import configs from 'app/configs'
import { State } from 'app/model/farms.controller'
import { useSelector } from 'react-redux'
import { AppState } from 'app/model'

const {
  sol: { senOwner },
} = configs

export const useSentreFarms = () => {
  const farms = useSelector((state: AppState) => state.farms)
  const [sentreFarms, setSentreFarms] = useState<State>({})

  const filterFarms = useCallback((farms: State) => {
    const newSentreFarm: State = {}
    for (const addr in farms) {
      const farm = farms[addr]
      if (!senOwner.includes(farm.owner)) continue
      newSentreFarm[addr] = farm
    }
    setSentreFarms(newSentreFarm)
  }, [])

  useEffect(() => {
    filterFarms(farms)
  }, [farms, filterFarms])

  return { sentreFarms, filterFarms }
}
