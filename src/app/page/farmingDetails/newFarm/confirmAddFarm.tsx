import { useState } from 'react'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from 'app/shared/components/mint'
import NumericInput from 'shared/antd/numericInput'

const ConfirmAddFarm = ({
  mintAddress,
  onClose = () => {},
  onNext = () => {},
}: {
  mintAddress: string
  onClose?: () => void
  onNext?: (next: number) => void
}) => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card bodyStyle={{ padding: 16 }} bordered={false}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Typography.Title type="secondary" level={5}>
                Input token type
              </Typography.Title>
              <Space onClick={() => onNext(3)}>
                <MintAvatar mintAddress={mintAddress} />
                <MintSymbol mintAddress={mintAddress} />
              </Space>
            </Col>
            <Col span={12}>
              <Typography.Title type="secondary" level={5}>
                Output token type
              </Typography.Title>
              <Space>
                <MintAvatar mintAddress={''} />
                <MintSymbol mintAddress={''} />
              </Space>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Row gutter={[0, 0]}>
          <Col flex="auto">
            <Typography.Text
              type="secondary"
              style={{ marginLeft: 12, fontSize: 12 }}
            >
              Budget
            </Typography.Text>
          </Col>
          <Col>
            <Space>
              <Typography.Text type="secondary" className="caption">
                Available:
              </Typography.Text>
              <Typography.Text type="secondary" className="caption">
                1000 SNTR
              </Typography.Text>
            </Space>
          </Col>
          <Col span={24}>
            <NumericInput
              placeholder="0"
              value={value}
              onValue={setValue}
              size="large"
              prefix={<Typography.Text>SNTR</Typography.Text>}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[0, 0]}>
          <Col span={24}>
            <Typography.Text
              type="secondary"
              style={{ marginLeft: 12, fontSize: 12 }}
            >
              Reward
            </Typography.Text>
          </Col>
          <Col span={24}>
            <NumericInput
              size="large"
              placeholder="0"
              value={value}
              onValue={setValue}
              prefix={<Typography.Text>SNTR</Typography.Text>}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[0, 0]}>
          <Col span={24}>
            <Typography.Text style={{ marginLeft: 12, fontSize: 12 }}>
              Number of days
            </Typography.Text>
          </Col>
          <Col span={24}>
            <NumericInput
              size="large"
              placeholder="0"
              value={value}
              onValue={setValue}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Button
          type="primary"
          onClick={() => setLoading(false)}
          disabled={!value}
          block
          loading={loading}
        >
          Confirm
        </Button>
      </Col>
    </Row>
  )
}

export default ConfirmAddFarm
