import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IonIcon from '@sentre/antd-ionicon'

import { Button, Col, Row, Space, Typography } from 'antd'

import { AppState } from 'model'
import configs from 'configs'
import { notifyError, notifySuccess } from 'helper'
import { deleteFarm } from 'model/farms.controller'

const {
  sol: { farming },
} = configs

const Close = ({
  farmAddress,
  onChange = () => {},
}: {
  farmAddress: string
  onChange?: (txId: string) => void
}) => {
  const farms = useSelector((state: AppState) => state.farms)
  const [loading, setLoading] = useState(false)
  const { total_shares } = farms?.[farmAddress] || {}
  const dispatch = useDispatch()

  const close = async () => {
    const { wallet } = window.sentre
    if (!wallet) return
    setLoading(true)
    try {
      const { txId } = await farming.closeFarm(farmAddress, wallet)
      onChange(txId)
      dispatch(deleteFarm({ farmAddress }))
      return notifySuccess('Close the farm', txId)
    } catch (er) {
      return notifyError(er)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Space className="caption">
          <IonIcon name="information-circle-outline" />
          <Typography.Text type="secondary">
            The farm can be closed only all farmers unstaked their tokens!
          </Typography.Text>
        </Space>
      </Col>
      <Col span={24}>
        <Button
          type="primary"
          icon={<IonIcon name="trash-outline" />}
          onClick={close}
          block
          disabled={!!total_shares}
          loading={loading}
        >
          Close Farm
        </Button>
      </Col>
    </Row>
  )
}

export default Close
