import { useState } from 'react'

import { Col, Input, Row } from 'antd'
import IonIcon from 'shared/antd/ionicon'

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
