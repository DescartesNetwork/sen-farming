import LazyLoad from '@senswap/react-lazyload'

import { Col, Row } from 'antd'
import ItemFarming from './ItemFarming'

import { useFarmList } from 'app/hooks/useFarmList'

const ListFarmings = () => {
  const farms = useFarmList()
  return (
    <Row gutter={[16, 16]}>
      {farms.map((farm) => (
        <Col span={24} key={farm.address}>
          <LazyLoad height={84}>
            <ItemFarming farmAddress={farm.address} />
          </LazyLoad>
        </Col>
      ))}
    </Row>
  )
}

export default ListFarmings
