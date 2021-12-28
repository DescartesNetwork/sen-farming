import { Button, Card, Col, Row, Space, Typography } from 'antd'
import { MintAvatar } from 'app/shared/components/mint'
import IonIcon from 'shared/antd/ionicon'
import { explorer } from 'shared/util'

const AccountCard = ({
  accountAddress,
  onClick = () => {},
}: {
  accountAddress: string
  onClick?: () => void
}) => {
  return (
    <Card
      onClick={onClick}
      style={{ boxShadow: 'unset', borderRadius: 8, background: '#fff' }}
      bodyStyle={{ padding: 12 }}
      bordered={false}
    >
      <Row gutter={[8, 8]} wrap={false} align="middle">
        <Col flex="auto">
          <Space direction="vertical" size={0}>
            <MintAvatar mintAddress={''} />
            <Space>
              <Space size={4}>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  Account Address:
                </Typography.Text>
                <Typography.Text>asax...</Typography.Text>
              </Space>
              <Button
                type="text"
                size="small"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation()
                  explorer(accountAddress)
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
