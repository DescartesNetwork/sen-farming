import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { forceCheck } from '@senswap/react-lazyload'

import { Tabs } from 'antd'
import NewFarm from './newFarm'
import ListFarmings from './listFarming'
import SentreFarms from './sentreFarms'
import StakedFarm from './stakedFarm'
import YourFarms from './yourFamrs'

import { AppState } from 'app/model'
import configs from 'app/configs'
import { useWallet } from 'senhub/providers'

const {
  sol: { senOwner, farming },
} = configs

const FarmingDetails = () => {
  const { farms, debts } = useSelector((state: AppState) => state)
  const locationSearch = useLocation().search
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const [tabActive, setTabActive] = useState('sen-farms')
  const [firstLoading, setFirstLoading] = useState(true)

  const query = useMemo(
    () => new URLSearchParams(locationSearch),
    [locationSearch],
  )

  // check tab activeKey with farmSelected
  useEffect(() => {
    ;(async () => {
      const farmSelected = query.get('farmAddress')
      if (!farmSelected || !firstLoading) return

      const farmOwner = farms[farmSelected]?.owner
      const debtAddress = await farming.deriveDebtAddress(
        walletAddress,
        farmSelected,
      )
      if (!farmOwner || !debtAddress) return

      const debtData = debts[debtAddress]

      setTabActive('all-farms')
      if (farmOwner === walletAddress) setTabActive('your-farms')
      if (debtData?.shares > BigInt(0)) setTabActive('staked-farms')
      if (senOwner.includes(farmOwner)) setTabActive('sen-farms')
      return setFirstLoading(false)
    })()
  }, [debts, farms, firstLoading, query, walletAddress])

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
      <Tabs.TabPane tab="All" key="all-farms">
        <ListFarmings />
      </Tabs.TabPane>
    </Tabs>
  )
}

export default FarmingDetails
