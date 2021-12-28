import { useState } from 'react'

import { Row, Col, Input } from 'antd'
import Banner from './banner'
import FarmingDetails from './farmingDetails'
import FarmWatcher from 'app/components/watcher'
import IonIcon from 'shared/antd/ionicon'

const Page = () => {
  const [search, setSearch] = useState<string>()

  return (
    <Row gutter={[24, 24]} style={{ paddingBottom: 12 }} justify="center">
      <Col xs={24} lg={18}>
        <Banner />
      </Col>
      <Col xs={24} lg={18}>
        <Row gutter={[8, 8]}>
          <Col xs={24} lg={8}>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              prefix={<IonIcon name="search-outline" />}
              bordered
            />
          </Col>
          <Col span={24}>
            <FarmWatcher>
              <FarmingDetails />
            </FarmWatcher>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Page
