import LazyLoad from '@senswap/react-lazyload'

import { Col, Empty, Row } from 'antd'
import FarmCard from './farmCard'

import { useSearchFarm } from 'app/hooks/useSearchFarm'
import { useStakedFarms } from 'app/hooks/listFarm/useStakedFarms'

export type StakedFarms = {
  [x: string]: boolean
}

const StakedFarm = () => {
  const { stakedFarms } = useStakedFarms()
  const farms = useSearchFarm(stakedFarms)

  if (Object.keys(farms).length === 0) return <Empty />
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
    </Row>
  )
}

export default StakedFarm
