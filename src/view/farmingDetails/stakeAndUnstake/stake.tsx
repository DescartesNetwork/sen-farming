import { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { utils } from '@senswap/sen-js'
import { useAccounts, useWalletAddress, util, splt } from '@sentre/senhub'

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

const Stake = ({
  farmAddress,
  onClose,
}: {
  farmAddress: string
  onClose: (visible: boolean) => void
}) => {
  const farmData = useSelector((state: AppState) => state.farms?.[farmAddress])
  const walletAddress = useWalletAddress()
  const accounts = useAccounts()
  const { data: debtData } = useDebt(farmAddress)
  const accountStake = useAccountStake(farmAddress)
  const [amount, setAmount] = useState()
  const [disable, setDisable] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const lptDecimal = useMintDecimals(farmData.mint_stake)

  const handleStake = async () => {
    setIsLoading(true)
    try {
      const { solana } = window.sentre
      if (!solana) throw Error('Please connect wallet first')
      if (!amount || !accountStake || !lptDecimal) return

      const senWalletAddr = await splt.deriveAssociatedAddress(
        walletAddress,
        senAddress,
      )
      if (debtData?.shares === undefined)
        await farming.initializeAccounts(farmAddress, walletAddress, solana)
      if (!accounts[senWalletAddr])
        await splt.initializeAccount(senAddress, walletAddress, solana)

      // Validate farming seed balance
      const harvestValidator = new HarvestValidator()
      await harvestValidator.validate(farmAddress)

      const { txId } = await farming.stake(
        utils.decimalize(amount, lptDecimal),
        accountStake.address,
        senWalletAddr,
        farmAddress,
        solana,
      )
      onClose(false)
      return notifySuccess('Staked', txId)
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

  const available = useMemo(() => {
    if (!lptDecimal) return
    return utils.undecimalize(
      BigInt(accountStake?.data.amount || 0),
      lptDecimal,
    )
  }, [accountStake?.data.amount, lptDecimal])

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
                    {util.numeric(available).format('0,0.[00]')}
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
          icon={<IonIcon name="add-outline" />}
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
