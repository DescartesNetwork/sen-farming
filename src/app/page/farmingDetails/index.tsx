import { Tabs } from 'antd'
import NewFarm from '../newFarm'
import ListFarmings from './listFarming'
import SentreFarms from './sentreFarms'
import StakedFarm from './stakedFarm'
import YourFarms from './yourFamrs'

const FarmingDetails = () => {
  return (
    <Tabs tabBarExtraContent={<NewFarm />}>
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
