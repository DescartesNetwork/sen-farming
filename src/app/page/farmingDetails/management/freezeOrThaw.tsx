import { useState } from 'react'
import { useSelector } from 'react-redux'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import { AppState } from 'app/model'
import IonIcon from 'shared/antd/ionicon'

import configs from 'app/configs'
import { notifyError, notifySuccess } from 'app/helper'

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
    const { wallet } = window.sentre
    if (!wallet) return
    setLoading(true)
    try {
      const { txId } = await farming.freeze(farmAddress, wallet)
      onChange(txId)
      return notifySuccess('Freeze the farm', txId)
    } catch (er) {
      return notifyError(er)
    } finally {
      setLoading(false)
    }
  }

  const thaw = async () => {
    const { wallet } = window.sentre
    if (!wallet) return
    setLoading(true)
    try {
      const { txId } = await farming.thaw(farmAddress, wallet)
      onChange(txId)
      return notifySuccess('Thaw the farm', txId)
    } catch (er) {
      return notifyError(er)
    } finally {
      setLoading(false)
    }
  }

  const isFreeze = state === 1
  const btnStyle = isFreeze ? { backgroundColor: '#40A9FF', color: '#fff' } : {}
  const iconName = isFreeze ? 'snow-outline' : 'sunny-outline'
  const btnName = isFreeze ? 'Freeze' : 'Thaw'

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card
          style={{ boxShadow: 'unset', borderRadius: 8 }}
          bodyStyle={{ padding: 16 }}
        >
          <Space align="start">
            <IonIcon name="information-circle-outline" />
            <Typography.Text>
              Freezing a farm will prevent all actions, but "seed" and "unseed",
              until the farm has been thawed.
            </Typography.Text>
          </Space>
        </Card>
      </Col>
      <Col span={24}>
        <Button
          type="primary"
          style={{ ...btnStyle, border: 'unset' }}
          icon={<IonIcon name={iconName} />}
          onClick={isFreeze ? freeze : thaw}
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
