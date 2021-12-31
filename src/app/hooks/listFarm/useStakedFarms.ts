import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { useWallet } from 'senhub/providers'
import configs from 'app/configs'
import { AppState } from 'app/model'
import { State } from 'app/model/farms.controller'

const {
  sol: { farming },
} = configs

export const useStakedFarms = () => {
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const { farms, debts } = useSelector((state: AppState) => state)
  const [stakedFarms, setStakedFarms] = useState<State>({})

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
    async (farms: State) => {
      const newSentreFarm: State = {}
      for (const farmAddress in farms) {
        const staked = await checkStakedFarm(farmAddress)
        if (!staked) continue
        newSentreFarm[farmAddress] = farms[farmAddress]
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
