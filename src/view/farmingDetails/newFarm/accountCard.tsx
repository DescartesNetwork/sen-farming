import { useMemo } from 'react'
import { useAccount, util } from '@sentre/senhub'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import { MintAvatar, MintName } from 'components/mint'

import IonIcon from '@sentre/antd-ionicon'

const AccountCard = ({
  accountAddress,
  onClick = () => {},
}: {
  accountAddress: string
  onClick: (mintAddress: string) => void
}) => {
  const {
    accounts: {
      [accountAddress]: { mint: mintAddress },
    },
  } = useAccount()

  const shortenAddress = useMemo(() => {
    const size = 4
    const prefix = accountAddress.substring(0, size)
    const suffix = accountAddress.substring(
      accountAddress.length - size,
      accountAddress.length,
    )
    return prefix + ' ... ' + suffix
  }, [accountAddress])

  return (
    <Card
      onClick={() => onClick(mintAddress)}
      className="account-card"
      bodyStyle={{ padding: 12, cursor: 'pointer' }}
      bordered={false}
    >
      <Row gutter={[8, 8]} wrap={false} align="middle">
        <Col flex="auto">
          <Space direction="vertical" size={0}>
            <Space>
              <MintAvatar mintAddress={mintAddress} />
              <MintName mintAddress={mintAddress} />
            </Space>
            <Space>
              <Space size={4}>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  Account Address:
                </Typography.Text>
                <Typography.Text>{shortenAddress}</Typography.Text>
              </Space>
              <Button
                type="text"
                size="small"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation()
                  util.openNewTab(util.explorer(accountAddress))
                }}
                icon={<IonIcon name="open-outline" />}
              />
            </Space>
          </Space>
        </Col>
        <Col>
          <Button type="text" icon={<IonIcon name="arrow-forward-outline" />} />
        </Col>
      </Row>
    </Card>
  )
}

export default AccountCard
