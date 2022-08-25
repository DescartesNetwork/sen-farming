import { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { utils } from '@senswap/sen-js'
import { useWalletAddress, util } from '@sentre/senhub'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import NumericInput from 'shared/antd/numericInput'
import IonIcon from '@sentre/antd-ionicon'

import { useDebt } from 'hooks/useDebt'
import { notifyError, notifySuccess } from 'helper'
import { useAccountStake } from 'hooks/useAccountStake'
import configs from 'configs'
import { HarvestValidator } from 'helper/validateHarvest'
import { AppState } from 'model'
import useMintDecimals from 'shared/hooks/useMintDecimals'

const {
  sol: { senAddress, farming },
} = configs

const Unstake = ({
  farmAddress,
  onClose,
}: {
  farmAddress: string
  onClose: (visible: boolean) => void
}) => {
  const farmData = useSelector((state: AppState) => state.farms?.[farmAddress])
  const walletAddress = useWalletAddress()
  const { data: debtData } = useDebt(farmAddress)
  const accountStake = useAccountStake(farmAddress)
  const [amount, setAmount] = useState()
  const [disable, setDisable] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const lptDecimal = useMintDecimals(farmData.mint_stake)

  const handleUnstake = async () => {
    setIsLoading(true)
    try {
      const { splt, wallet } = window.sentre
      if (!wallet) throw Error('Please connect wallet first')
      if (!amount || !accountStake || !lptDecimal) return
      const ammount = utils.decimalize(amount, lptDecimal)
      const senWallet = await splt.deriveAssociatedAddress(
        walletAddress,
        senAddress,
      )

      // Validate farming seed balance
      const harvestValidator = new HarvestValidator()
      await harvestValidator.validate(farmAddress)
      const { txId } = await farming.unstake(
        ammount,
        accountStake.address,
        senWallet,
        farmAddress,
        wallet,
      )
      onClose(false)
      return notifySuccess('Unstaked', txId)
    } catch (er) {
      return notifyError(er)
    } finally {
      setIsLoading(false)
    }
  }

  const onAmount = useCallback(async (val) => {
    await setAmount(val)
    if (!val) return await setDisable(true)
    return await setDisable(false)
  }, [])

  const stakedValue = useMemo(() => {
    if (!lptDecimal) return
    return utils.undecimalize(debtData?.shares, lptDecimal)
  }, [debtData?.shares, lptDecimal])

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
        <Card
          bodyStyle={{ padding: 12 }}
          style={{ boxShadow: 'none', borderRadius: 8 }}
        >
          <Space style={{ width: '100%' }} direction="vertical">
            <Row>
              <Col flex="auto">
                <Typography.Text type="secondary">Amount</Typography.Text>
              </Col>
              <Col>
                <Space size={6}>
                  <Typography.Text type="secondary">Available:</Typography.Text>
                  <Typography.Text>
                    {util.numeric(stakedValue).format('0,0.[00]')}
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
