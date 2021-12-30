import LazyLoad from '@senswap/react-lazyload'
import { useSelector } from 'react-redux'

import { Col, Empty, Row } from 'antd'
import ItemFarming from './ItemFarming'

import { useSearchFarm } from 'app/hooks/useSearchFarm'
import { AppState } from 'app/model'

const ListFarmings = () => {
  const allFarms = useSelector((state: AppState) => state.farms)
  const farms = useSearchFarm(allFarms)

  if (!Object.keys(farms).length) return <Empty />
  return (
    <Row gutter={[16, 16]}>
      {Object.keys(farms).map((address) => (
        <Col span={24} key={address}>
          <LazyLoad height={84}>
            <ItemFarming farmAddress={address} />
          </LazyLoad>
        </Col>
      ))}
    </Row>
  )
}

export default ListFarmings
