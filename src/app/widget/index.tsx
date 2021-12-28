import { Button, Tabs } from 'antd'
import { Fragment, useState } from 'react'
import IonIcon from 'shared/antd/ionicon'
import SearchBar from './searchBar'
import Stacked from './stacked'

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
      <Tabs className={toggle ? '' : 'hidden-tab'} defaultActiveKey="1">
        <Tabs.TabPane tab="Stacked farms" key="stacked-farm">
          <Stacked />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Your farms" key="your-farm">
          Content of Tab Pane 2
        </Tabs.TabPane>
      </Tabs>
    </Fragment>
  )
}

export default Widget
