import { Button, Card, Col, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import NumericInput from 'shared/antd/numericInput'

const Unstake = () => (
  <Row gutter={[16, 16]}>
    <Col span={24}>
      <Space align="start">
        <IonIcon name="alert-circle-outline" />
        <Typography.Text type="secondary">
          The pending reward will be automatically harvested when you unstake.
        </Typography.Text>
      </Space>
    </Col>
    <Col span={24}>
      <Card bodyStyle={{ padding: 12 }} style={{ boxShadow: 'none' }}>
        <Space style={{ width: '100%' }} direction="vertical">
          <Row>
            <Col flex="auto">
              <Typography.Text type="secondary">Amount</Typography.Text>
            </Col>
            <Col>
              <Typography.Text type="secondary">
                Available: 10 LPT
              </Typography.Text>
            </Col>
          </Row>
          <NumericInput
            placeholder={'0'}
            //   value={amount}
            //  onValue={onAmount}
            bordered={false}
            size="large"
            style={{ padding: 0 }}
            suffix={
              <Button
                type="text"
                style={{ marginRight: -7 }}
                // onClick={() => onAmount(balance)}
              >
                MAX
              </Button>
            }
            max={100}
          />
        </Space>
      </Card>
    </Col>
  </Row>
)

export default Unstake
