import { useMemo } from 'react'
import LazyLoad from '@senswap/react-lazyload'

import { Col, Empty, Row } from 'antd'
import ItemFarming from './ItemFarming'

import { useSearchFarm } from 'app/hooks/useSearchFarm'
import { useSelector } from 'react-redux'
import { AppState } from 'app/model'

const ListFarmings = () => {
  const { farms } = useSelector((state: AppState) => state)

  const searchedFarms = useSearchFarm(farms)
  const listFarmAddress = useMemo(
    () => Object.keys(searchedFarms),
    [searchedFarms],
  )

  if (!listFarmAddress.length) return <Empty />

  return (
    <Row gutter={[16, 16]}>
      {listFarmAddress.map((address) => {
        return (
          <Col span={24} key={address}>
            <LazyLoad height={84}>
              <ItemFarming farmAddress={address} />
            </LazyLoad>
          </Col>
        )
      })}
    </Row>
  )
}

export default ListFarmings
