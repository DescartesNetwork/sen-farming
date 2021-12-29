import { Fragment, useState } from 'react'

import { Button, Tabs } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import SearchBar from './searchBar'
import StakedFarms from './stakedFarms'
import YourFarms from './yourFamrs'
import FarmWatcher from 'app/components/watcher'

const Widget = () => {
  const [toggle, setToggle] = useState(true)

  return (
    <Fragment>
      <Button
        className="button-search"
        type="text"
        icon={<IonIcon name={toggle ? 'search-outline' : 'close-outline'} />}
        onClick={() => setToggle(!toggle)}
      />

      <SearchBar isHidden={toggle} />
      <FarmWatcher style={{ height: 336 }}>
        <Tabs className={toggle ? '' : 'hidden-tab'}>
          <Tabs.TabPane tab="Staked farms" key="staked-farm">
            <StakedFarms />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Your farms" key="your-farm">
            <YourFarms />
          </Tabs.TabPane>
        </Tabs>
      </FarmWatcher>
    </Fragment>
  )
}

export default Widget
