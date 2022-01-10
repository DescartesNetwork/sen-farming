import { useMemo } from 'react'
import LazyLoad from '@senswap/react-lazyload'

import { Col, Empty, Row } from 'antd'
import FarmCard from './farmCard'

import { useSearchFarm } from 'app/hooks/useSearchFarm'
import { useSelector } from 'react-redux'
import { AppState } from 'app/model'

const AllFarms = () => {
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
              <FarmCard farmAddress={address} />
            </LazyLoad>
          </Col>
        )
      })}
    </Row>
  )
}

export default AllFarms
