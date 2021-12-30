import { useMemo } from 'react'
import LazyLoad from '@senswap/react-lazyload'

import { Col, Row } from 'antd'
import ItemFarming from './ItemFarming'

import configs from 'app/configs'
import { useSearchFarm } from 'app/hooks/useSearchFarm'
import { useSentreFarms } from 'app/hooks/listFarm/useSentreFarms'

const {
  sol: { senOwner },
} = configs

const SentreFarms = () => {
  const { sentreFarms } = useSentreFarms()
  const farms = useSearchFarm(sentreFarms)
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
