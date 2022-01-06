import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { forceCheck } from '@senswap/react-lazyload'
import { account } from '@senswap/sen-js'

import { Tabs } from 'antd'
import NewFarm from './newFarm'
import CommunityFarms from './communityFarms'
import SentreFarms from './sentreFarms'
import StakedFarm from './stakedFarm'
import YourFarms from './yourFamrs'

import { AppState } from 'app/model'
import { useStakedFarms } from 'app/hooks/listFarm/useStakedFarms'
import { useYourFarms } from 'app/hooks/listFarm/useYourFarms'
import { useSentreFarms } from 'app/hooks/listFarm/useSentreFarms'
import { useCheckActiveTab } from 'app/hooks/useCheckActiveTab'

const FarmingDetails = () => {
  const farmSelected = useSelector((state: AppState) => state.main.search)
  const { checkStakedFarm } = useStakedFarms()
  const { checkYourFarm } = useYourFarms()
  const { checkSentreFarm } = useSentreFarms()
  const activeTab = useCheckActiveTab()

  const [tabActive, setTabActive] = useState('sen-farms')
  const [isLoaded, setIsLoaded] = useState(false)

  // check tab activeKey with farmSelected
  useEffect(() => {
    ;(async () => {
      /** isLoaded: just run only one time, avoid case select many times tab */
      if (!account.isAddress(farmSelected) || isLoaded) return
      try {
        const yourFarm = checkYourFarm(farmSelected)
        if (yourFarm) return setTabActive('your-farms')

        const sentreFarm = checkSentreFarm(farmSelected)
        if (sentreFarm) return setTabActive('sen-farms')

        const stakedFarm = await checkStakedFarm(farmSelected)
        if (stakedFarm) return setTabActive('staked-farms')

        return setTabActive('community-farms')
      } catch (error) {
      } finally {
        setIsLoaded(true)
      }
    })()
  }, [checkSentreFarm, checkStakedFarm, checkYourFarm, farmSelected, isLoaded])

  useEffect(() => {
    setTabActive(activeTab)
  }, [activeTab])

  const onChange = (key: string) => {
    setTimeout(() => {
      forceCheck()
    }, 500)
    setTabActive(key)
  }

  return (
    <Tabs
      activeKey={tabActive}
      onChange={onChange}
      tabBarExtraContent={<NewFarm />}
    >
      <Tabs.TabPane tab="Sentre Farms" key="sen-farms">
        <SentreFarms />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Staked Farms" key="staked-farms">
        <StakedFarm />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Your Farms" key="your-farms">
        <YourFarms />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Community Farms" key="community-farms">
        <CommunityFarms />
      </Tabs.TabPane>
    </Tabs>
  )
}

export default FarmingDetails
