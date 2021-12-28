import { useCallback, useState } from 'react'
import { utils } from '@senswap/sen-js'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import NumericInput from 'shared/antd/numericInput'

import { useDebt } from 'app/hooks/useDebt'
import { useWallet } from 'senhub/providers'
import { numeric } from 'shared/util'
import { notifyError, notifySuccess } from 'app/helper'
import { useAccountStake } from 'app/hooks/useAccountStake'
import configs from 'app/configs'

const {
  sol: { senAddress, farming },
} = configs

const Unstake = ({
  farmAddress,
  onHandleModal,
}: {
  farmAddress: string
  onHandleModal: (visible: boolean) => void
}) => {
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const { data: debtData } = useDebt(farmAddress)
  const accountStake = useAccountStake(farmAddress)
  const [amount, setAmount] = useState()
  const [disable, setDisable] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleUnstake = async () => {
    setIsLoading(true)
    try {
      const { splt, wallet } = window.sentre
      if (!wallet) throw Error('Please connect wallet first')
      if (!amount || !accountStake) return
      const ammount = utils.decimalize(amount, 9)
      const senWallet = await splt.deriveAssociatedAddress(
        walletAddress,
        senAddress,
      )

      // Validate farming seed balance
      // const harvestValidator = new HarvestValidator()
      //  await harvestValidator.validate(farmAddress)
      const { txId } = await farming.unstake(
        ammount,
        accountStake.address,
        senWallet,
        farmAddress,
        wallet,
      )
      onHandleModal(false)
      return notifySuccess('Unstaked', txId)
    } catch (er) {
      return notifyError(er)
    } finally {
      setIsLoading(false)
    }
  }

  const onAmount = useCallback(async (val) => {
    await setAmount(val)
    if (!val || Math.sign(val) < 1) return await setDisable(true)
    return await setDisable(false)
  }, [])

  const stakedValue = utils.undecimalize(debtData?.shares, 9)
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Space align="start">
          <IonIcon name="alert-circle-outline" />
          <Typography.Text type="secondary">
            The pending reward will be automatically harvested when you unstake.
          </Typography.Text>
        </Space>
      </Col>
      <Col span={24}>
        <Card bodyStyle={{ padding: 12 }} style={{ boxShadow: 'none' }}>
          <Space style={{ width: '100%' }} direction="vertical">
            <Row>
              <Col flex="auto">
                <Typography.Text type="secondary">Amount</Typography.Text>
              </Col>
              <Col>
                <Space size={6}>
                  <Typography.Text type="secondary">Available:</Typography.Text>
                  <Typography.Text>
                    {numeric(stakedValue).format('0,0.[00]')}
                  </Typography.Text>
                  <Typography.Text type="secondary">LPT</Typography.Text>
                </Space>
              </Col>
            </Row>
            <NumericInput
              placeholder={'0'}
              value={amount}
              onValue={onAmount}
              bordered={false}
              size="large"
              style={{ padding: 0 }}
              suffix={
                <Button
                  type="text"
                  style={{ marginRight: -7 }}
                  onClick={() => onAmount(stakedValue)}
                >
                  MAX
                </Button>
              }
              max={stakedValue}
            />
          </Space>
        </Card>
      </Col>
      <Col span={24}>
        <Button
          type="primary"
          icon={<IonIcon name="remove-outline" />}
          onClick={handleUnstake}
          block
          disabled={disable}
          loading={isLoading}
        >
          Unstake
        </Button>
      </Col>
    </Row>
  )
}

export default Unstake
