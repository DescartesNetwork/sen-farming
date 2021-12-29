import { ReactNode, useState } from 'react'

import { Col, Row, Space, Typography, Checkbox, Button } from 'antd'

import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { NewFarmStep } from 'app/constants/farms'

const Step = ({
  title = '',
  description,
  checked = false,
  onChange = () => {},
}: {
  title?: string
  description?: ReactNode
  checked?: boolean
  onChange?: (checked: CheckboxChangeEvent) => void
}) => {
  return (
    <Space direction="vertical">
      <Checkbox checked={checked} onChange={onChange}>
        <Typography.Title level={5}>{title}</Typography.Title>
      </Checkbox>
      <Typography.Text>{description}</Typography.Text>
    </Space>
  )
}

const Description = () => {
  return (
    <Space direction="vertical" size={6}>
      <Typography.Text>
        The Sentre team will try to respond within a week:
      </Typography.Text>
      <Space direction="vertical" size={6} className="list-type-items">
        <Typography.Text>
          Community Farm qualifiers will be asked to provide the address of the
          wallet which you’ll use for bidding SEN in the auction.
        </Typography.Text>
        <Typography.Text>
          Core Farm/Pool qualifiers will receive directions separately.
        </Typography.Text>
      </Space>
    </Space>
  )
}

const StepAddFarm = ({
  setFarmCreatingStep = () => {},
}: {
  setFarmCreatingStep?: (farmStep: NewFarmStep) => void
}) => {
  const [stepOne, setStepOne] = useState(false)
  const [stepTwo, setStepTwo] = useState(false)
  const [stepThree, setStepThree] = useState(false)

  const disabled = !stepOne || !stepTwo || !stepThree

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Typography.Title level={4}>New farm</Typography.Title>
      </Col>
      <Col span={24}>
        <Row gutter={[24, 24]} justify="center">
          <Col span={24}>
            <Step
              title="Step1: Submit application"
              description={
                <Typography.Text>
                  Project can submit an application to sponsor a yield farm and
                  pool on Sentre via Application Form
                </Typography.Text>
              }
              checked={stepOne}
              onChange={(e) => setStepOne(e.target.checked)}
            />
          </Col>
          <Col span={24}>
            <Step
              title="Step2: Await whitelisting"
              description={<Description />}
              checked={stepTwo}
              onChange={(e) => setStepTwo(e.target.checked)}
            />
          </Col>
          <Col span={24}>
            <Step
              title="Step3: During the auction"
              description="During the auction period, if you connect your project’s whitelisted wallet to the Auction page, you’ll see a “Place Bid” button during when is live.
            You can then commit SEN to bid during the auction, completing against other project for one of the available farms."
              checked={stepThree}
              onChange={(e) => setStepThree(e.target.checked)}
            />
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => setFarmCreatingStep('FARM_CREATING_CONFIRMATION')}
              disabled={disabled}
            >
              Next
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default StepAddFarm
