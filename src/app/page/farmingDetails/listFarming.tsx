import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Col, Input, Row } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import ItemFarming from './ItemFarming'

import { getFarms } from '../../model/farms.controller'
import { AppState } from 'app/model'
import { Farming } from '@senswap/sen-js'

const ListFarmings = () => {
  const dispatch = useDispatch()
  const { farms } = useSelector((state: AppState) => state)
  console.log(farms, 'sksksksksk')
  const [search, setSearch] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        await dispatch(getFarms())
      } catch (er) {
        //do nothong
      }
    })()
  }, [])

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row>
          <Col flex="auto">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              prefix={<IonIcon name="search-outline" />}
              bordered
              style={{ maxWidth: 300 }}
            />
          </Col>
          <Col>
            <Button>New farm</Button>
          </Col>
        </Row>
      </Col>
      {Object.keys(farms).map((farmAddress, idx) => (
        <Col span={24} key={idx}>
          <ItemFarming farmAddress={farmAddress} />
        </Col>
      ))}
    </Row>
  )
}

export default ListFarmings
