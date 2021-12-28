import { Button, Card, Input } from 'antd'
import React from 'react'
import IonIcon from 'shared/antd/ionicon'

const SearchBar = ({ isHidden }: { isHidden: boolean }) => {
  return (
    <Card
      className={isHidden ? 'hidden-class' : ''}
      bodyStyle={{ padding: 8 }}
      bordered={false}
    >
      <Input
        placeholder="Search"
        size="small"
        bordered={false}
        prefix={
          <Button
            type="text"
            style={{ marginLeft: -7 }}
            size="small"
            icon={<IonIcon name="search-outline" />}
          />
        }
      />
    </Card>
  )
}

export default SearchBar
