import { useState } from 'react'
import IonIcon from '@sentre/antd-ionicon'

import { Col, Input, Row } from 'antd'

const SearchFarm = () => {
  const [search, setSearch] = useState('')

  return (
    <Row>
      <Col xs={24} lg={8}>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          prefix={<IonIcon name="search-outline" />}
          bordered
        />
      </Col>
    </Row>
  )
}
export default SearchFarm
