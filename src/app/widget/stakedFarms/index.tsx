import LazyLoad from '@senswap/react-lazyload'

import { Col, Empty, Row } from 'antd'
import FarmCard from '../farmCard'

import { useSearchFarm } from 'app/hooks/useSearchFarm'
import { useStakedFarms } from 'app/hooks/listFarm/useStakedFarms'

const Staked = () => {
  const { stakedFarms } = useStakedFarms()
  const farms = useSearchFarm(stakedFarms)

  if (Object.keys(farms).length === 0) return <Empty />
  return (
    <Row gutter={[12, 12]}>
      {Object.keys(farms).map((farmAddress) => {
        return (
          <Col span={24} key={farmAddress}>
            <LazyLoad height={185} overflow>
              <FarmCard farmAddress={farmAddress} />
            </LazyLoad>
          </Col>
        )
      })}
      <Col />
    </Row>
  )
}

export default Staked
