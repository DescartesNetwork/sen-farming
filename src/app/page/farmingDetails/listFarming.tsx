import { Col, Row } from 'antd'
import ItemFarming from './ItemFarming'

const ListFarmings = () => {
  return (
    <Row gutter={[16, 16]}>
      {['1', '2', '3', '4'].map((farmAddress: string, idx) => (
        <Col span={24} key={idx}>
          <ItemFarming farmAddress={farmAddress} />
        </Col>
      ))}
    </Row>
  )
}

export default ListFarmings
