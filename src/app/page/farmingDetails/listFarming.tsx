import { useCallback, useEffect, useMemo, useState } from 'react'
import LazyLoad from '@senswap/react-lazyload'
import { useSelector } from 'react-redux'

import { Col, Empty, Row } from 'antd'
import ItemFarming from './ItemFarming'

import { useSearchFarm } from 'app/hooks/useSearchFarm'
import { AppState } from 'app/model'
import { useStakedFarms } from 'app/hooks/listFarm/useStakedFarms'
import { useYourFarms } from 'app/hooks/listFarm/useYourFarms'
import { useSentreFarms } from 'app/hooks/listFarm/useSentreFarms'

const ListFarmings = () => {
  const allFarms = useSelector((state: AppState) => state.farms)
  const farms = useSearchFarm(allFarms)
  const [farmList, setFarmList] = useState<string[]>([])
  const { stakedFarms } = useStakedFarms()
  const { checkYourFarm } = useYourFarms()
  const { checkSentreFarm } = useSentreFarms()

  const listStakedFarm = useMemo(() => Object.keys(stakedFarms), [stakedFarms])

  //** Filter farms not owner & sen */
  const filterFarms = useCallback(() => {
    const famrs: string[] = []
    Object.keys(farms).forEach((addrees) => {
      const yourFarm = checkYourFarm(addrees)
      const sentreFarm = checkSentreFarm(addrees)
      if (!yourFarm && !sentreFarm) famrs.push(addrees)
    })
    setFarmList(famrs)
  }, [checkSentreFarm, checkYourFarm, farms])

  useEffect(() => {
    filterFarms()
  }, [filterFarms])

  /**Filter farms not staked */
  const communityFarms = useMemo(() => {
    return farmList.filter(
      (farmAddress) => !listStakedFarm.includes(farmAddress),
    )
  }, [farmList, listStakedFarm])

  if (!communityFarms.length) return <Empty />
  return (
    <Row gutter={[16, 16]}>
      {communityFarms.map((address) => {
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
