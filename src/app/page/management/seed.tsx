import { useState } from 'react'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import NumericInput from 'shared/antd/numericInput'

import { numeric } from 'shared/util'

const Seed = ({
  farmAddress,
  onChange = () => {},
}: {
  farmAddress: string
  onChange?: (txId: string) => void
}) => {
  const [value, setValue] = useState('')
  const [balance, setBalance] = useState('0')

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card
          style={{ boxShadow: 'unset', borderRadius: 8 }}
          bodyStyle={{ padding: 8 }}
        >
          <Row gutter={[0, 0]}>
            <Col span={24}>
              <Row
                gutter={[0, 0]}
                wrap={false}
                style={{ margin: `6px 12px 0px 12px`, fontSize: 12 }}
              >
                <Col flex="auto">
                  <Typography.Text type="secondary">Amount</Typography.Text>
                </Col>
                <Col>
                  <Space size={6}>
                    <Typography.Text type="secondary">
                      Available:
                    </Typography.Text>
                    <Typography.Text>
                      {numeric(balance).format('0,0.[00]')}
                    </Typography.Text>
                    <Typography.Text type="secondary">SNTR</Typography.Text>
                  </Space>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <NumericInput
                placeholder="0"
                value={value}
                onValue={setValue}
                suffix={
                  <Button
                    type="text"
                    onClick={() => setValue(balance)}
                    size="small"
                    style={{ marginRight: -7 }}
                  >
                    MAX
                  </Button>
                }
                bordered={false}
                max={balance}
              />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Button
          type="primary"
          icon={<IonIcon name="add-outline" />}
          onClick={() => setBalance}
          block
          disabled={!value}
        >
          Seed
        </Button>
      </Col>
    </Row>
  )
}

export default Seed
