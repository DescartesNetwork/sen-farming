import { Button, Card, Col, Row, Space, Typography } from 'antd'

import IonIcon from 'shared/antd/ionicon'
import NumericInput from 'shared/antd/numericInput'
import { useDebt } from 'app/hooks/useDebt'
import { useCallback, useState } from 'react'
import { utils } from '@senswap/sen-js'
import { useAccount, useWallet } from 'senhub/providers'
import configs from 'app/configs'
import { numeric } from 'shared/util'
import { notifyError, notifySuccess } from 'app/helper'
import { useAccountStake } from 'app/hooks/useAccountStake'

const {
  sol: { senAddress, farming },
} = configs

const Stake = ({ farmAddress }: { farmAddress: string }) => {
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const { accounts } = useAccount()
  const { data: debtData } = useDebt(farmAddress)
  const accountStake = useAccountStake(farmAddress)
  const [amount, setAmount] = useState()
  const [disable, setDisable] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleStake = async () => {
    setIsLoading(true)
    try {
      const { splt, wallet } = window.sentre
      if (!wallet) throw Error('Please connect wallet first')
      if (!amount || !accountStake) return

      const senWalletAddr = await splt.deriveAssociatedAddress(
        walletAddress,
        senAddress,
      )
      if (debtData?.shares === undefined)
        await farming.initializeAccounts(farmAddress, walletAddress, wallet)
      if (!accounts[senWalletAddr])
        await splt.initializeAccount(senAddress, walletAddress, wallet)

      // Validate farming seed balance
      //   const harvestValidator = new HarvestValidator()
      //   await harvestValidator.validate(farmAddress)

      const { txId } = await farming.stake(
        utils.decimalize(amount, 9),
        accountStake.address,
        senWalletAddr,
        farmAddress,
        wallet,
      )
      return notifySuccess('Staked', txId)
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

  const available = utils.undecimalize(
    BigInt(accountStake?.data.amount || 0),
    9,
  )
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Space align="start">
          <IonIcon name="alert-circle-outline" />
          <Typography.Text type="secondary">
            The pending reward will be automatically harvested when you stake
            more.
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
                    {numeric(available).format('0,0.[00]')}
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
                  style={{ marginRight: -15 }}
                  onClick={() => onAmount(available)}
                >
                  MAX
                </Button>
              }
              max={available}
            />
          </Space>
        </Card>
      </Col>
      <Col span={24}>
        <Button
          type="primary"
          onClick={handleStake}
          block
          disabled={disable}
          loading={isLoading}
        >
          Stake
        </Button>
      </Col>
    </Row>
  )
}

export default Stake
