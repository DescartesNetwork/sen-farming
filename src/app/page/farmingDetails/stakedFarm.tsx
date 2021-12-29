import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import LazyLoad from '@senswap/react-lazyload'

import { Col, Row } from 'antd'
import ItemFarming from './ItemFarming'

import { AppState } from 'app/model'
import { useWallet } from 'senhub/providers'
import configs from 'app/configs'

const {
  sol: { farming },
} = configs

export type StakedFarms = {
  [x: string]: boolean
}

const StakedFarm = () => {
  const { farms, debts } = useSelector((state: AppState) => state)
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const [isStakedFarms, setIsStakedFarms] = useState<StakedFarms>()

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

  return (
    <Row gutter={[16, 16]}>
      {Object.keys(farms).map((farmAddress, i) => {
        if (!isStakedFarms?.[farmAddress]) return null
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

export default StakedFarm
