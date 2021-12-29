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
    let newFarmList = []
    for (const address in farms) {
      newFarmList.push({ address, data: farms[address] })
    }
    //sort
    newFarmList = newFarmList.sort((a, b) =>
      a.data.total_shares < b.data.total_shares ? 1 : -1,
    )
    setFarmList(newFarmList)
  }, [farmList.length, farms])

  useEffect(() => {
    getFarmList()
  }, [getFarmList])

  return farmList
}
