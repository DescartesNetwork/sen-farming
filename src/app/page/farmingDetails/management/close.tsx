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

  const close = async () => {
    const { wallet } = window.sentre
    if (!wallet) return
    setLoading(true)
    try {
      const { txId } = await farming.closeFarm(farmAddress, wallet)
      onChange(txId)
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
        <Card
          style={{ boxShadow: 'unset', borderRadius: 8 }}
          bodyStyle={{ padding: 16 }}
        >
          <Row gutter={[0, 0]}>
            <Col span={24}>
              <Space>
                <IonIcon name="information-circle-outline" />
                <Typography.Text>
                  The farm can be closed only all farmers unstaked their tokens!
                </Typography.Text>
              </Space>
            </Col>
          </Row>
        </Card>
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
