import { useState } from 'react'
import { useSelector } from 'react-redux'
import { account, utils } from '@senswap/sen-js'
import { useWallet } from '@senhub/providers'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import NumericInput from 'shared/antd/numericInput'

import configs from 'app/configs'
import { notifyError, notifySuccess } from 'app/helper'
import { useDebt } from 'app/hooks/useDebt'
import { AppState } from 'app/model'
import IonIcon from '@sentre/antd-ionicon'

const {
  sol: { senAddress, farming },
} = configs

const Exit = ({
  farmAddress,
  onClose,
}: {
  farmAddress: string
  onClose: (visible: boolean) => void
}) => {
  const farmData = useSelector((state: AppState) => state.farms?.[farmAddress])
  const { data: debtData } = useDebt(farmAddress)
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const [isLoading, setIsLoading] = useState(false)

  const handleExit = async () => {
    setIsLoading(true)
    const { splt, wallet } = window.sentre
    const { mint_stake } = farmData
    if (!wallet || !account.isAddress(mint_stake)) return
    const senWallet = await splt.deriveAssociatedAddress(
      walletAddress,
      senAddress,
    )
    const lptWalletAddress = await splt.deriveAssociatedAddress(
      walletAddress,
      mint_stake,
    )

    try {
      const { txId } = await farming.rid(
        lptWalletAddress,
        senWallet,
        farmAddress,
        wallet,
      )
      onClose(false)
      return notifySuccess('Exit', txId)
    } catch (er) {
      return notifyError(er)
    } finally {
      setIsLoading(false)
    }
  }

  //Calculate Data for Render
  const stakedValue = utils.undecimalize(debtData?.shares, 9)

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Space align="start">
          <IonIcon name="alert-circle-outline" />
          <Typography.Text>
            When the reward budget is too low, you may be not able to unstake.
            Exiting the farm means you give up on rewards and merely get back
            your tokens.
          </Typography.Text>
        </Space>
      </Col>
      <Col span={24}>
        <Card
          style={{ borderRadius: 8, boxShadow: 'unset' }}
          bodyStyle={{ padding: 12 }}
        >
          <Row gutter={[0, 0]}>
            <Col span={24}>
              <Typography.Text className="caption" type="secondary">
                Amount
              </Typography.Text>
            </Col>
            <Col span={24}>
              <NumericInput
                placeholder="0"
                value={stakedValue}
                size="small"
                bordered={false}
              />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Button
          type="primary"
          icon={<IonIcon name="remove" />}
          onClick={handleExit}
          block
          disabled={!stakedValue}
          loading={isLoading}
        >
          Exit
        </Button>
      </Col>
    </Row>
  )
}

export default Exit
