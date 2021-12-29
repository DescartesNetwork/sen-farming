import { useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { FarmData } from '@senswap/sen-js'

import { AppState } from 'app/model'

export const useFarmList = (): { address: string; data: FarmData }[] => {
  const farms = useSelector((state: AppState) => state.farms)
  const [farmList, setFarmList] = useState<
    { address: string; data: FarmData }[]
  >([])

  const getFarmList = useCallback(() => {
    if (farmList.length) return
    const newFarmList = []
    for (const address in farms) {
      newFarmList.push({ address, data: farms[address] })
    }
    setFarmList(newFarmList)
  }, [farmList.length, farms])

  useEffect(() => {
    getFarmList()
  }, [getFarmList])

  return farmList
}
