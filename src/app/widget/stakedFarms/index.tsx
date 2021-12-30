import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import LazyLoad from '@senswap/react-lazyload'

import { Col, Empty, Row } from 'antd'
import FarmCard from '../farmCard'

import { AppState } from 'app/model'
import { useWallet } from 'senhub/providers'
import { StakedFarms } from 'app/page/farmingDetails/stakedFarm'
import configs from 'app/configs'

const {
  sol: { farming },
} = configs

const Staked = () => {
  const { farms, debts } = useSelector((state: AppState) => state)
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const [isStakedFarms, setIsStakedFarms] = useState<StakedFarms>({})

  const listFarmAddress = useMemo(() => Object.keys(farms), [farms])

  const getStakedFarms = useCallback(async () => {
    const filterFarms: StakedFarms = {}

    for (const farmAddress of listFarmAddress) {
      if (!farmAddress) continue
      const debtAddress = await farming.deriveDebtAddress(
        walletAddress,
        farmAddress,
      )
      const debtData = debts[debtAddress]
      if (debtData?.shares > global.BigInt(0)) {
        filterFarms[farmAddress] = true
      }
    }
    setIsStakedFarms(filterFarms)
  }, [debts, listFarmAddress, walletAddress])

  useEffect(() => {
    getStakedFarms()
  }, [getStakedFarms])

  if (Object.keys(isStakedFarms).length === 0) return <Empty />

  return (
    <Row gutter={[12, 12]}>
      {Object.keys(farms).map((farmAddress, idx) => {
        if (!isStakedFarms?.[farmAddress]) return null
        return (
          <Col span={24} key={idx}>
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
