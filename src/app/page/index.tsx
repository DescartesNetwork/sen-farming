import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Input } from 'antd'
import Banner from './banner'
import FarmingDetails from './farmingDetails'
import FarmWatcher from 'app/components/watcher'
import IonIcon from 'shared/antd/ionicon'

import { AppDispatch, AppState } from 'app/model'
import { setSearch } from 'app/model/main.controller'

const Page = () => {
  const { search } = useSelector((state: AppState) => state.main)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <FarmWatcher>
      <Row gutter={[24, 24]} style={{ paddingBottom: 12 }} justify="center">
        <Col xs={24} lg={18}>
          <Banner />
        </Col>
        <Col xs={24} lg={18}>
          <Row gutter={[8, 8]}>
            <Col xs={24} lg={8}>
              <Input
                value={search}
                onChange={(e) =>
                  dispatch(setSearch({ search: e.target.value }))
                }
                prefix={<IonIcon name="search-outline" />}
                bordered
              />
            </Col>
            <Col span={24}>
              <FarmingDetails />
            </Col>
          </Row>
        </Col>
      </Row>
    </FarmWatcher>
  )
}

export default Page
