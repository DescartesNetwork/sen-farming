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

  const checkYourFarm = useCallback(
    (address: string) => {
      const farm = farms[address]
      return farm.owner === walletAddress
    },
    [farms, walletAddress],
  )

  const filterYourFarms = useCallback(
    (farms: State) => {
      const newSentreFarm: State = {}
      for (const addr in farms) {
        const isYourFarm = checkYourFarm(addr)
        if (!isYourFarm) continue
        newSentreFarm[addr] = farms[addr]
      }
      setYourFarms(newSentreFarm)
    },
    [checkYourFarm],
  )

  useEffect(() => {
    filterYourFarms(farms)
  }, [farms, filterYourFarms])

  return { yourFarms, filterYourFarms, checkYourFarm }
}
