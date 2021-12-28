import { Row, Col } from 'antd'
import Banner from './banner'
import FarmingDetails from './farmingDetails'
import SearchFarm from './searchFarm'

const Page = () => {
  return (
    <Row gutter={[24, 24]} style={{ paddingBottom: 12 }} justify="center">
      <Col xs={24} lg={18}>
        <Banner />
      </Col>
      <Col xs={24} lg={18}>
        <SearchFarm />
      </Col>
      <Col xs={24} lg={18}>
        <FarmingDetails />
      </Col>
    </Row>
  )
}

export default Page
