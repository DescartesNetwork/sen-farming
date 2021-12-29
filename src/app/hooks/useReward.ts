import { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'app/model'
import { useDebt } from 'app/hooks/useDebt'
import calculateReward from 'helpers/calculateReward'

export const useReward = (farmAddress: string): number => {
  const farmData = useSelector((state: AppState) => state.farms[farmAddress])
  const { data } = useDebt(farmAddress)
  const [reward, setReward] = useState(0)

  const calcReward = useCallback(() => {
    if (!data || !farmData) return setReward(0)
    const pendingReward = calculateReward(data, farmData) || 0
    return setReward(pendingReward)
  }, [data, farmData])

  useEffect(() => {
    calcReward()
  }, [calcReward])

  return reward
}