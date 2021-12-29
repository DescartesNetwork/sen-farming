import { useDispatch, useSelector } from 'react-redux'

import { Button, Card, Input } from 'antd'
import { AppDispatch, AppState } from 'app/model'
import { setSearch } from 'app/model/main.controller'
import IonIcon from 'shared/antd/ionicon'

const SearchBar = ({ isHidden }: { isHidden: boolean }) => {
  const { search } = useSelector((state: AppState) => state.main)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <Card
      className={isHidden ? 'hidden-class' : ''}
      bodyStyle={{ padding: 8 }}
      bordered={false}
    >
      <Input
        value={search}
        onChange={(e) => dispatch(setSearch({ search: e.target.value }))}
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
