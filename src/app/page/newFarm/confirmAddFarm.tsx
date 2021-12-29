import { useState } from 'react'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from 'app/shared/components/mint'
import NumericInput from 'shared/antd/numericInput'
import configs from 'app/configs'
import { notifyError, notifySuccess } from 'app/helper'

import { account, utils } from '@senswap/sen-js'
import { useWallet } from 'senhub/providers'

const FARM_DECIMAL = 9

const ConfirmAddFarm = ({
  mintAddress,
  onClose = () => {},
  onSelectInput = () => {},
}: {
  mintAddress: string
  onClose?: () => void
  onSelectInput?: (visibled: boolean) => void
}) => {
  const {
    sol: { senAddress, farming },
  } = configs
  const [value, setValue] = useState('')
  const [day, setDay] = useState('')
  const [loading, setLoading] = useState(false)
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const newFarm = async () => {
    if (!account.isAddress(mintAddress))
      return notifyError({
        message: `Invalid mint address: ${mintAddress}`,
      })
    setLoading(true)
    const { wallet } = window.sentre
    if (!wallet) return
    const reward = utils.decimalize(value, FARM_DECIMAL)
    const period = utils.decimalize(day, FARM_DECIMAL)
    try {
      const { txId } = await farming.initializeFarm(
        reward,
        period,
        walletAddress,
        mintAddress,
        senAddress,
        wallet,
      )
      onClose()
      return notifySuccess('Create a new farm', txId)
    } catch (er: any) {
      return notifyError({ message: er.message })
    } finally {
      return setLoading(false)
    }
  }

  const disabled = !value || !day || !account.isAddress(mintAddress)

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card bodyStyle={{ padding: 16 }} bordered={false}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Typography.Title type="secondary" level={5}>
                Input token type
              </Typography.Title>
              <Space onClick={() => onSelectInput(true)}>
                <MintAvatar mintAddress={mintAddress} />
                <MintSymbol mintAddress={mintAddress} />
              </Space>
            </Col>
            <Col span={12}>
              <Typography.Title type="secondary" level={5}>
                Output token type
              </Typography.Title>
              <Space>
                <MintAvatar mintAddress={senAddress} />
                <MintSymbol mintAddress={senAddress} />
              </Space>
            </Col>
          </Row>
        </Card>
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
              value={day}
              onValue={setDay}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Button
          type="primary"
          onClick={newFarm}
          disabled={disabled}
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
