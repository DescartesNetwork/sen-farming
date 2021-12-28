import { Button, Card, Col, Divider, Row, Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from 'app/shared/components/mint'
import IonIcon from 'shared/antd/ionicon'

const FarmCard = () => {
  return (
    <Card bordered={false} className="farm-card">
      <Row>
        <Col span={24}>
          <Row align="middle" gutter={[12, 12]}>
            <Col flex="auto">
              <Space>
                <MintAvatar mintAddress="4v8wWTshnDk7zvEnGxj4XAX4rpJortx6BwuYbeSk5STY" />
                <MintSymbol mintAddress="4v8wWTshnDk7zvEnGxj4XAX4rpJortx6BwuYbeSk5STY" />
              </Space>
            </Col>

            <Col>
              <Button type="text" icon={<IonIcon name="open-outline" />} />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Divider style={{ margin: '12px 0' }} />
        </Col>
        <Col span={24}>
          <Row gutter={[6, 6]}>
            <Col flex="auto">
              <Space>
                <MintAvatar mintAddress="" />
                <Typography.Text type="secondary">Reward</Typography.Text>
              </Space>
            </Col>
            <Col>
              <Space>
                <Typography.Text>0 SEN</Typography.Text>
              </Space>
            </Col>
            <Col span={24}>
              <Row>
                <Col flex="auto">
                  <Typography.Text type="secondary">APR</Typography.Text>
                </Col>
                <Col>
                  <Space>
                    <Typography.Text>0 SEN</Typography.Text>
                  </Space>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row>
                <Col flex="auto">
                  <Typography.Text type="secondary">
                    Your stacked LPT
                  </Typography.Text>
                </Col>
                <Col>
                  <Space>
                    <Typography.Text>0 SEN</Typography.Text>
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default FarmCard
