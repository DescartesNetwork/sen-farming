import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forceCheck } from '@senswap/react-lazyload'
import { account } from '@senswap/sen-js'
import { useLocation } from 'react-router-dom'

import { Tabs } from 'antd'
import NewFarm from './newFarm'
import AllFarmings from './allFarms'
import SentreFarms from './sentreFarms'
import StakedFarm from './stakedFarm'
import YourFarms from './yourFamrs'

import { AppDispatch, AppState } from 'app/model'
import { useStakedFarms } from 'app/hooks/listFarm/useStakedFarms'
import { useYourFarms } from 'app/hooks/listFarm/useYourFarms'
import { useSentreFarms } from 'app/hooks/listFarm/useSentreFarms'
import { setSearch } from 'app/model/main.controller'

enum FarmingTabs {
  YourFarms = 'YourFarms',
  SenFarm = 'SenFarm',
  StakedFarm = 'StakedFarm',
  AllFarms = 'AllFarms',
}

const FarmingDetails = () => {
  const locationSearch = useLocation().search
  const farmSelected = useSelector((state: AppState) => state.main.search)
  const { checkStakedFarm } = useStakedFarms()
  const { checkYourFarm } = useYourFarms()
  const { checkSentreFarm } = useSentreFarms()
  const dispatch = useDispatch<AppDispatch>()

  const [tabActive, setTabActive] = useState<FarmingTabs>(FarmingTabs.SenFarm)
  const [isLoaded, setIsLoaded] = useState(false)

  // check tab activeKey with farmSelected
  useEffect(() => {
    ;(async () => {
      /** isLoaded: just run only one time, avoid case select many times tab */
      if (!account.isAddress(farmSelected) || isLoaded) return
      try {
        const yourFarm = checkYourFarm(farmSelected)
        if (yourFarm) return setTabActive(FarmingTabs.YourFarms)

        const sentreFarm = checkSentreFarm(farmSelected)
        if (sentreFarm) return setTabActive(FarmingTabs.SenFarm)

        const stakedFarm = await checkStakedFarm(farmSelected)
        if (stakedFarm) return setTabActive(FarmingTabs.StakedFarm)

        return setTabActive(FarmingTabs.AllFarms)
      } catch (error) {
      } finally {
        setIsLoaded(true)
      }
    })()
  }, [checkSentreFarm, checkStakedFarm, checkYourFarm, farmSelected, isLoaded])

  useEffect(() => {
    const searchParams = new URLSearchParams(locationSearch).get('search')
    if (!searchParams) return
    dispatch(setSearch({ search: searchParams }))
    setTabActive(FarmingTabs.AllFarms)
    return () => {
      dispatch(setSearch({ search: '' }))
    }
  }, [dispatch, locationSearch])

  const onChange = (key: string) => {
    setTabActive(key as FarmingTabs)
    setTimeout(() => {
      forceCheck()
    }, 500)
  }

  return (
    <Tabs
      activeKey={tabActive}
      onChange={onChange}
      tabBarExtraContent={<NewFarm />}
    >
      <Tabs.TabPane tab="Sentre Farms" key={FarmingTabs.SenFarm}>
        <SentreFarms />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Staked Farms" key={FarmingTabs.StakedFarm}>
        <StakedFarm />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Your Farms" key={FarmingTabs.YourFarms}>
        <YourFarms />
      </Tabs.TabPane>
      <Tabs.TabPane tab="All Farms" key={FarmingTabs.AllFarms}>
        <AllFarmings />
      </Tabs.TabPane>
    </Tabs>
  )
}

export default FarmingDetails
