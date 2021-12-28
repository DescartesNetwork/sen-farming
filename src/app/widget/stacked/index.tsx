import { Col, Row } from 'antd'
import FarmCard from '../farmCard'

const Stacked = () => {
  return (
    <Row gutter={[12, 12]}>
      {[1, 2, 3].map((item) => (
        <Col span={24} key={item}>
          <FarmCard />
        </Col>
      ))}
    </Row>
  )
}

export default Stacked
