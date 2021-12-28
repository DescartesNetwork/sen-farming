import { Row, Col } from 'antd'
import Banner from './banner'
import FarmingDetails from './farmingDetails'
import FarmWatcher from 'app/components/watcher'

const Page = () => {
  return (
    <Row gutter={[24, 24]} style={{ paddingBottom: 12 }} justify="center">
      <Col xs={24} lg={18}>
        <Banner />
      </Col>
      <Col span={24}>
        <FarmWatcher>
          <FarmingDetails />
        </FarmWatcher>
      </Col>
    </Row>
  )
}

export default Page
