import { Tabs } from 'antd'
import NewFarm from '../newFarm'
import ListFarmings from './listFarming'

const FarmingDetails = () => {
  return (
    <Tabs tabBarExtraContent={<NewFarm />}>
      <Tabs.TabPane tab="All" key="all-farms">
        <ListFarmings />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Sen Farms" key="sen-farms"></Tabs.TabPane>
      <Tabs.TabPane tab="Your Farms" key="your-farms"></Tabs.TabPane>
      <Tabs.TabPane tab="Staked Farms" key="staked-farms"></Tabs.TabPane>
      <Tabs.TabPane tab="Archived Farms" key="archived-farms"></Tabs.TabPane>
    </Tabs>
  )
}

export default FarmingDetails
