import { useSelector } from 'react-redux'
import LazyLoad from '@senswap/react-lazyload'

import { Col, Row } from 'antd'
import ItemFarming from './ItemFarming'

import { AppState } from 'app/model'

const ListFarmings = () => {
  const { farms } = useSelector((state: AppState) => state)

  return (
    <Row gutter={[16, 16]}>
      {Object.keys(farms).map((farmAddress, idx) => (
        <Col span={24} key={idx}>
          <LazyLoad height={84}>
            <ItemFarming farmAddress={farmAddress} />
          </LazyLoad>
        </Col>
      ))}
    </Row>
  )
}

export default ListFarmings
