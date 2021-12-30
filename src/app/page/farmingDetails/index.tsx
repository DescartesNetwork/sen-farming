import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { forceCheck } from '@senswap/react-lazyload'
import { account } from '@senswap/sen-js'

import { Tabs } from 'antd'
import NewFarm from './newFarm'
import ListFarmings from './listFarming'
import SentreFarms from './sentreFarms'
import StakedFarm from './stakedFarm'
import YourFarms from './yourFamrs'

import { AppState } from 'app/model'
import { useStakedFarms } from 'app/hooks/listFarm/useStakedFarms'
import { useYourFarms } from 'app/hooks/listFarm/useYourFarms'
import { useSentreFarms } from 'app/hooks/listFarm/useSentreFarms'

const FarmingDetails = () => {
  const farmSelected = useSelector((state: AppState) => state.main.search)
  const { checkStakedFarm } = useStakedFarms()
  const { checkYourFarm } = useYourFarms()
  const { checkSentreFarm } = useSentreFarms()

  const [tabActive, setTabActive] = useState('sen-farms')
  const [isLoaded, setIsLoaded] = useState(false)

  // check tab activeKey with farmSelected
  useEffect(() => {
    ;(async () => {
      /** isLoaded: just run only one time, avoid case select many times tab */
      if (!account.isAddress(farmSelected) || isLoaded) return

      const stakedFarm = await checkStakedFarm(farmSelected)
      const yourFarm = checkYourFarm(farmSelected)
      const sentreFarm = checkSentreFarm(farmSelected)

      setTabActive('community-farms')
      if (stakedFarm) setTabActive('staked-farms')
      if (sentreFarm) setTabActive('sen-farms')
      if (yourFarm) setTabActive('your-farms')

      return setIsLoaded(true)
    })()
  }, [checkSentreFarm, checkStakedFarm, checkYourFarm, farmSelected, isLoaded])

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
      <Tabs.TabPane tab="Sen Farms" key="sen-farms">
        <SentreFarms />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Staked Farms" key="staked-farms">
        <StakedFarm />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Your Farms" key="your-farms">
        <YourFarms />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Community Farns" key="community-farms">
        <ListFarmings />
      </Tabs.TabPane>
    </Tabs>
  )
}

export default FarmingDetails
