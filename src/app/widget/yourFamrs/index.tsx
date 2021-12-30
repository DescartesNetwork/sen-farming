import LazyLoad from '@senswap/react-lazyload'

import { Col, Row } from 'antd'
import FarmCard from '../farmCard'

import { useSearchFarm } from 'app/hooks/useSearchFarm'
import { useYourFarms } from 'app/hooks/listFarm/useYourFarms'

const YourFarms = () => {
  const { yourFarms } = useYourFarms()
  const farms = useSearchFarm(yourFarms)

  return (
    <Row gutter={[16, 16]}>
      {Object.keys(farms).map((farmAddress) => {
        return (
          <Col span={24} key={farmAddress}>
            <LazyLoad height={84}>
              <FarmCard farmAddress={farmAddress} />
            </LazyLoad>
          </Col>
        )
      })}
      <Col />
    </Row>
  )
}

export default YourFarms
