import { useCallback, useEffect, useState } from 'react'
import { useSentreFarms } from './listFarm/useSentreFarms'
import { useStakedFarms } from './listFarm/useStakedFarms'
import { useYourFarms } from './listFarm/useYourFarms'
import { useCommunityFarms } from './listFarm/useCommunityFarms'
import { useSearchFarm } from './useSearchFarm'

export const useCheckActiveTab = () => {
  const [activeTab, setActiveTab] = useState('')
  const { sentreFarms } = useSentreFarms()
  const { stakedFarms } = useStakedFarms()
  const { yourFarms } = useYourFarms()
  const { communityFarms } = useCommunityFarms()

  const searchedComFarms = useSearchFarm(communityFarms)
  const searchedSenFarms = useSearchFarm(sentreFarms)
  const searchedStakedFarms = useSearchFarm(stakedFarms)
  const searchedYourFarms = useSearchFarm(yourFarms)

  const checkTab = useCallback(async () => {
    if (!!Object.keys(searchedSenFarms).length) return setActiveTab('sen-farms')
    if (!!Object.keys(searchedYourFarms).length)
      return setActiveTab('your-farms')
    if (!!Object.keys(searchedStakedFarms).length)
      return setActiveTab('staked-farms')
    if (!!Object.keys(searchedComFarms).length)
      return setActiveTab('community-farms')
    return setActiveTab('sen-farms')
  }, [
    searchedComFarms,
    searchedSenFarms,
    searchedStakedFarms,
    searchedYourFarms,
  ])

  useEffect(() => {
    checkTab()
  }, [checkTab])

  return activeTab
}
