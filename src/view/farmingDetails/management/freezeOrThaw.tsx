import { useState } from 'react'
import { useSelector } from 'react-redux'
import IonIcon from '@sentre/antd-ionicon'

import { Button, Col, Row, Space, Typography } from 'antd'
import { AppState } from 'model'

import configs from 'configs'
import { notifyError, notifySuccess } from 'helper'
import { FarmStatus } from 'constants/farms'

const {
  sol: { farming },
} = configs

const FreezeOrThaw = ({
  farmAddress,
  onChange = () => {},
}: {
  farmAddress: string
  onChange?: (txId: string) => void
}) => {
  const farms = useSelector((state: AppState) => state.farms)
  const [loading, setLoading] = useState(false)

  const { state } = farms?.[farmAddress] || {}

  const freeze = async () => {
    const { solana } = window.sentre
    if (!solana) return
    setLoading(true)
    try {
      const { txId } = await farming.freeze(farmAddress, solana)
      onChange(txId)
      return notifySuccess('Freeze the farm', txId)
    } catch (er) {
      return notifyError(er)
    } finally {
      setLoading(false)
    }
  }

  const thaw = async () => {
    const { solana } = window.sentre
    if (!solana) return
    setLoading(true)
    try {
      const { txId } = await farming.thaw(farmAddress, solana)
      onChange(txId)
      return notifySuccess('Thaw the farm', txId)
    } catch (er) {
      return notifyError(er)
    } finally {
      setLoading(false)
    }
  }

  const isActiveFarm = state === FarmStatus.isActive
  const btnStyle = isActiveFarm
    ? { backgroundColor: '#40A9FF', color: '#fff' }
    : {}
  const iconName = isActiveFarm ? 'snow-outline' : 'sunny-outline'
  const btnName = isActiveFarm ? 'Freeze' : 'Thaw'

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Space className="caption" align="start">
          <IonIcon name="information-circle-outline" />
          <Typography.Text type="secondary">
            Freezing a farm will prevent all actions, but "seed" and "unseed",
            until the farm has been thawed.
          </Typography.Text>
        </Space>
      </Col>
      <Col span={24}>
        <Button
          type="primary"
          style={{ ...btnStyle, border: 'unset' }}
          icon={<IonIcon name={iconName} />}
          onClick={isActiveFarm ? freeze : thaw}
          block
          disabled={!state}
          loading={loading}
        >
          {btnName}
        </Button>
      </Col>
    </Row>
  )
}

export default FreezeOrThaw
