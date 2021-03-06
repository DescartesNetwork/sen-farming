import { useEffect, useState } from 'react'

import { Button, Card, Input } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

const SearchAccount = ({
  onChange,
}: {
  onChange: (mintAddresses: string | undefined) => void
}) => {
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    return onChange(keyword)
  }, [keyword, onChange])

  return (
    <Card className="account-card" bodyStyle={{ padding: 6 }} bordered={false}>
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
