import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useWallet } from '@senhub/providers'

import configs from 'app/configs'
import { AppState } from 'app/model'
import { FarmState } from 'app/model/farms.controller'

const {
  sol: { farming },
} = configs

export const useStakedFarms = () => {
  const [stakedFarms, setStakedFarms] = useState<FarmState>({})
  const { farms, debts } = useSelector((state: AppState) => state)
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const checkStakedFarm = useCallback(
    async (farmAddress: string) => {
      const debtAddress = await farming.deriveDebtAddress(
        walletAddress,
        farmAddress,
      )
      const debtData = debts[debtAddress]
      return debtData?.shares > BigInt(0)
    },
    [debts, walletAddress],
  )

  const filterStakedFarms = useCallback(
    async (farms: FarmState) => {
      const newSentreFarm: FarmState = {}
      for (const farmAddress in farms) {
        const staked = await checkStakedFarm(farmAddress)
        if (staked) newSentreFarm[farmAddress] = farms[farmAddress]
      }
      setStakedFarms(newSentreFarm)
    },
    [checkStakedFarm],
  )

  useEffect(() => {
    filterStakedFarms(farms)
  }, [farms, filterStakedFarms])

  return { stakedFarms, filterStakedFarms, checkStakedFarm }
}