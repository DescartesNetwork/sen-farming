import { Button, Col, Input, Row, Space } from 'antd'
import { useState } from 'react'
import IonIcon from 'shared/antd/ionicon'
import ItemFarming from './ItemFarming'

const ListFarmings = () => {
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
      {['1', '2', '3', '4'].map((farmAddress: string, idx) => (
        <Col span={24} key={idx}>
          <ItemFarming farmAddress={farmAddress} />
        </Col>
      ))}
    </Row>
  )
}

export default ListFarmings
