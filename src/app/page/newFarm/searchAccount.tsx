import { useEffect, useState } from 'react'

import { Button, Card, Input } from 'antd'
import IonIcon from 'shared/antd/ionicon'

const SearchAccount = ({
  onChange,
}: {
  onChange: (mintAddresses: string[] | undefined) => void
}) => {
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    if (!keyword) return
    const search = [keyword]
    return onChange(search)
  }, [keyword, onChange])

  return (
    <Card
      style={{ boxShadow: 'unset', borderRadius: 8, background: '#fff' }}
      bodyStyle={{ padding: 6 }}
      bordered={false}
    >
      <Input
        placeholder="Search"
        value={keyword}
        size="small"
        bordered={false}
        prefix={
          <Button
            type="text"
            style={{ marginLeft: -7 }}
            size="small"
            onClick={keyword ? () => setKeyword('') : () => {}}
            icon={
              <IonIcon name={keyword ? 'close-outline' : 'search-outline'} />
            }
          />
        }
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setKeyword(e.target.value)
        }
      />
    </Card>
  )
}

export default SearchAccount
