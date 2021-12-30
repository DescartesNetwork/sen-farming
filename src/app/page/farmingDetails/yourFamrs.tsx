import LazyLoad from '@senswap/react-lazyload'

import { Col, Empty, Row } from 'antd'
import ItemFarming from './ItemFarming'

import { useSearchFarm } from 'app/hooks/useSearchFarm'
import { useYourFarms } from 'app/hooks/listFarm/useYourFarms'

const YourFarms = () => {
  const { yourFarms } = useYourFarms()
  const farms = useSearchFarm(yourFarms)

  if (!Object.keys(farms).length) return <Empty />
  return (
    <Row gutter={[16, 16]}>
      {Object.keys(farms).map((farmAddress) => {
        return (
          <Col span={24} key={farmAddress}>
            <LazyLoad height={84}>
              <ItemFarming farmAddress={farmAddress} />
            </LazyLoad>
          </Col>
        )
      })}
    </Row>
  )
}

export default YourFarms
