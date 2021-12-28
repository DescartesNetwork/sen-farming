import { useSelector } from 'react-redux'

import { Col, Row } from 'antd'
import FarmCard from '../farmCard'

import { AppState } from 'app/model'
import LazyLoad from '@senswap/react-lazyload'

const Stacked = () => {
  const { farms } = useSelector((state: AppState) => state)
  return (
    <Row gutter={[12, 12]}>
      {Object.keys(farms).map((farmAddress, idx) => (
        <Col span={24} key={idx}>
          <LazyLoad height={185} overflow>
            <FarmCard farmAddress={farmAddress} />
          </LazyLoad>
        </Col>
      ))}
    </Row>
  )
}

export default Stacked
