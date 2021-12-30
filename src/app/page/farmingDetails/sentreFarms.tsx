import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import LazyLoad from '@senswap/react-lazyload'

import { Col, Empty, Row } from 'antd'
import ItemFarming from './ItemFarming'

import { AppState } from 'app/model'
import configs from 'app/configs'

const {
  sol: { senOwner },
} = configs

const SentreFarms = () => {
  const { farms } = useSelector((state: AppState) => state)

  const listFarmAddress = useMemo(() => Object.keys(farms), [farms])

  const filterFarm = useMemo(() => {
    return listFarmAddress.filter((addr) =>
      senOwner.includes(farms[addr].owner),
    )
  }, [farms, listFarmAddress])

  const sortedFarm = useMemo(() => {
    const listFarms = filterFarm.sort((fistFarm, secondFarm) => {
      const totalFistFarm = farms[fistFarm].total_shares
      const totalSecondFarm = farms[secondFarm].total_shares
      return totalFistFarm < totalSecondFarm ? 1 : -1
    })
    return listFarms
  }, [farms, filterFarm])

  if (sortedFarm.length === 0) return <Empty />

  return (
    <Row gutter={[16, 16]}>
      {sortedFarm.map((farmAddress, i) => {
        return (
          <Col span={24} key={farmAddress + i}>
            <LazyLoad height={84}>
              <ItemFarming farmAddress={farmAddress} />
            </LazyLoad>
          </Col>
        )
      })}
    </Row>
  )
}

export default SentreFarms
