import { useMemo } from 'react'
import LazyLoad from '@senswap/react-lazyload'

import { Col, Empty, Row } from 'antd'
import ItemFarming from './ItemFarming'

import { useSearchFarm } from 'app/hooks/useSearchFarm'
import { useCommunityFarms } from 'app/hooks/listFarm/useCommunityFarms'

const ListFarmings = () => {
  const { communityFarms } = useCommunityFarms()

  const farms = useSearchFarm(communityFarms)
  const listFarmAddress = useMemo(() => Object.keys(farms), [farms])

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
