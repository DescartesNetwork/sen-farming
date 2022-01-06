import { useState } from 'react'
import { account, utils } from '@senswap/sen-js'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from 'app/shared/components/mint'
import NumericInput from 'shared/antd/numericInput'

import { useWallet } from 'senhub/providers'
import configs from 'app/configs'
import { notifyError, notifySuccess } from 'app/helper'
import useMintDecimals from 'shared/hooks/useMintDecimals'

const PERIODS: Record<string, bigint> = {
  Hour: BigInt(60 * 60),
  Day: BigInt(24 * 60 * 60),
  Month: BigInt(30 * 24 * 60 * 60),
  Year: BigInt(365 * 24 * 60 * 60),
}

const ConfirmAddFarm = ({
  mintAddress,
  onClose = () => {},
  setVisibleInputTokenModal = () => {},
}: {
  mintAddress: string
  onClose?: () => void
  setVisibleInputTokenModal?: (visibled: boolean) => void
}) => {
  const {
    sol: { senAddress, farming },
  } = configs

  const [value, setValue] = useState('')
  const [duration, setDuration] = useState('')
  const [period, setPeriod] = useState('Hour')
  const [loading, setLoading] = useState(false)
  const rewardDecimal = useMintDecimals(senAddress)
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
    if (!wallet || !period || !duration || !rewardDecimal) return
    const reward = utils.decimalize(value, rewardDecimal)
    const calculatePeriod = Number(PERIODS?.[period]) * Number(duration)
    try {
      const { txId } = await farming.initializeFarm(
        reward,
        BigInt(calculatePeriod),
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

  const onPeriod = () => {
    const keys = Object.keys(PERIODS)
    const prevIndex = keys.findIndex((key) => key === period)
    const nextIndex = (prevIndex + 1) % keys.length
    return setPeriod(keys[nextIndex])
  }

  const disabled = !value || !duration || !account.isAddress(mintAddress)

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Typography.Title level={4}>New farm</Typography.Title>
      </Col>
      <Col span={24}>
        <Card bodyStyle={{ padding: 16 }} bordered={false}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Space direction="vertical">
                <Typography.Text type="secondary">Input</Typography.Text>
                <Space
                  size={12}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setVisibleInputTokenModal(true)}
                >
                  <MintAvatar mintAddress={mintAddress} />
                  {account.isAddress(mintAddress) ? (
                    <MintSymbol mintAddress={mintAddress} />
                  ) : (
                    <Typography.Text type="secondary">
                      Select token type
                    </Typography.Text>
                  )}
                </Space>
              </Space>
            </Col>
            <Col span={12}>
              <Space direction="vertical">
                <Typography.Text type="secondary">Output</Typography.Text>
                <Space size={12} style={{ cursor: 'pointer' }}>
                  <MintAvatar mintAddress={senAddress} />
                  <MintSymbol mintAddress={senAddress} />
                </Space>
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
              Number of {period}
            </Typography.Text>
          </Col>
          <Col span={24}>
            <NumericInput
              size="large"
              placeholder="0"
              value={duration}
              onValue={setDuration}
              suffix={
                <Button type="text" size="small" onClick={onPeriod}>
                  {period}
                </Button>
              }
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
