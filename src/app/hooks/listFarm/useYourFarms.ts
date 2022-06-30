import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useWallet } from '@senhub/providers'

import { AppState } from 'app/model'
import { FarmState } from 'app/model/farms.controller'

export const useYourFarms = () => {
  const [yourFarms, setYourFarms] = useState<FarmState>({})
  const farms = useSelector((state: AppState) => state.farms)
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const checkYourFarm = useCallback(
    (address: string) => farms[address].owner === walletAddress,
    [farms, walletAddress],
  )

  const filterYourFarms = useCallback(
    (farms: FarmState) => {
      const newSentreFarm: FarmState = {}
      for (const farmAddress in farms) {
        if (checkYourFarm(farmAddress))
          newSentreFarm[farmAddress] = farms[farmAddress]
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
