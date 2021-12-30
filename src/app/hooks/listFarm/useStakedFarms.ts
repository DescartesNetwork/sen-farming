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

  const filterStakedFarms = useCallback(
    async (farms: State) => {
      const newSentreFarm: State = {}
      for (const farmAddress in farms) {
        const farm = farms[farmAddress]
        const debtAddress = await farming.deriveDebtAddress(
          walletAddress,
          farmAddress,
        )
        const debtData = debts[debtAddress]
        if (!debtData?.shares) continue
        newSentreFarm[farmAddress] = farm
      }
      setStakedFarms(newSentreFarm)
    },
    [debts, walletAddress],
  )

  useEffect(() => {
    filterStakedFarms(farms)
  }, [farms, filterStakedFarms])

  return { stakedFarms, filterStakedFarms }
}
