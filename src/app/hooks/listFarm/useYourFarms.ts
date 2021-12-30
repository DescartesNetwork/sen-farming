import { useWallet } from 'senhub/providers'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'app/model'
import { State } from 'app/model/farms.controller'

export const useYourFarms = () => {
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const farms = useSelector((state: AppState) => state.farms)
  const [yourFarms, setYourFarms] = useState<State>({})

  const filterYourFarms = useCallback(
    (farms: State) => {
      const newSentreFarm: State = {}
      for (const addr in farms) {
        const farm = farms[addr]
        if (farm.owner !== walletAddress) continue
        newSentreFarm[addr] = farm
      }
      setYourFarms(newSentreFarm)
    },
    [walletAddress],
  )

  useEffect(() => {
    filterYourFarms(farms)
  }, [farms, filterYourFarms])

  return { yourFarms, filterSentreFarms: filterYourFarms }
}
