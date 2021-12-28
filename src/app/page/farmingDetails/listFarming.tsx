import { useState } from 'react'
import { useSelector } from 'react-redux'
import LazyLoad from '@senswap/react-lazyload'

import { Button, Col, Input, Row } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import ItemFarming from './ItemFarming'

import { AppState } from 'app/model'

const ListFarmings = () => {
  const { farms } = useSelector((state: AppState) => state)
  const [search, setSearch] = useState('')

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
          <LazyLoad height={84}>
            <ItemFarming farmAddress={farmAddress} />
          </LazyLoad>
        </Col>
      ))}
    </Row>
  )
}

export default ListFarmings
