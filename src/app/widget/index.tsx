import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forceCheck } from '@senswap/react-lazyload'

import { Button, Tabs } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import SearchBar from './searchBar'
import StakedFarms from './stakedFarms'
import YourFarms from './yourFamrs'
import FarmWatcher from 'app/components/watcher'

import { AppDispatch, AppState } from 'app/model'
import { setSearch } from 'app/model/main.controller'

const Widget = () => {
  const [isOpenSearch, setIsOpenSearch] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { search } = useSelector((state: AppState) => state.main)

  const onToggle = () => {
    if (isOpenSearch) dispatch(setSearch({ search: '' }))
    setIsOpenSearch(!isOpenSearch)
  }

  return (
    <Fragment>
      <Button
        className="button-search"
        type="text"
        icon={
          <IonIcon name={isOpenSearch ? 'close-outline' : 'search-outline'} />
        }
        onClick={onToggle}
      />
      <SearchBar isHidden={!search && !isOpenSearch} />
      <FarmWatcher style={{ height: 336 }}>
        <Tabs
          className={!isOpenSearch ? '' : 'hidden-tab'}
          onChange={() =>
            setTimeout(() => {
              forceCheck()
            }, 500)
          }
        >
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
