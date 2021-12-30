import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import LazyLoad from '@senswap/react-lazyload'

import { Col, Empty, Row } from 'antd'
import FarmCard from '../farmCard'

import { AppState } from 'app/model'
import { useWallet } from 'senhub/providers'

const YourFarms = () => {
  const { farms } = useSelector((state: AppState) => state)
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const listFarmAddress = useMemo(() => Object.keys(farms), [farms])

  const filterFarm = useMemo(() => {
    return listFarmAddress.filter((addr) => walletAddress === farms[addr].owner)
  }, [farms, listFarmAddress, walletAddress])

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
              <FarmCard farmAddress={farmAddress} />
            </LazyLoad>
          </Col>
        )
      })}
      <Col />
    </Row>
  )
}

export default YourFarms
