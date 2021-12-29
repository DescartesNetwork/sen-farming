import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { Tabs } from 'antd'
import NewFarm from '../newFarm'
import ListFarmings from './listFarming'
import SentreFarms from './sentreFarms'
import StakedFarm, { StakedFarms } from './stakedFarm'
import YourFarms from './yourFamrs'

import { AppState } from 'app/model'
import configs from 'app/configs'
import { useWallet } from 'senhub/providers'

const {
  sol: { senOwner, farming },
} = configs

const FarmingDetails = () => {
  const { farms } = useSelector((state: AppState) => state)
  const { debts } = useSelector((state: AppState) => state)
  const locationSearch = useLocation().search
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const [tabActive, setTabActive] = useState('sentre-farm')
  const [isStakedFarms, setIsStakedFarms] = useState<StakedFarms>()

  const listFarmAddress = useMemo(() => Object.keys(farms), [farms])

  const query = useMemo(
    () => new URLSearchParams(locationSearch),
    [locationSearch],
  )

  const getStakedFarms = useCallback(async () => {
    const filterFarms: StakedFarms = {}

    for (const farmAddress of listFarmAddress) {
      if (!farmAddress) continue
      const debtAddress = await farming.deriveDebtAddress(
        walletAddress,
        farmAddress,
      )
      const debtData = debts[debtAddress]
      if (debtData?.shares > global.BigInt(0)) {
        filterFarms[farmAddress] = true
      }
    }
    setIsStakedFarms(filterFarms)
  }, [debts, listFarmAddress, walletAddress])

  useEffect(() => {
    getStakedFarms()
  }, [getStakedFarms])

  // check tab activeKey with farmSelected
  useEffect(() => {
    const farmSelected = query.get('farmAddress')
    if (!farmSelected) return
    const farmOwner = farms[farmSelected]?.owner
    if (farmOwner === walletAddress) return setTabActive('your-farms')
    if (isStakedFarms?.[farmSelected]) return setTabActive('staked-farms')
    if (senOwner.includes(farmOwner)) return setTabActive('sen-farms')
    return setTabActive('all-farms')
  }, [farms, isStakedFarms, query, walletAddress])

  return (
    <Tabs
      activeKey={tabActive}
      onChange={setTabActive}
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
      <Tabs.TabPane tab="All" key="all-farms">
        <ListFarmings />
      </Tabs.TabPane>
    </Tabs>
  )
}

export default FarmingDetails
