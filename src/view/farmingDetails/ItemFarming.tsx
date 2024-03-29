import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { utils } from '@senswap/sen-js'
import { useWalletAddress, useWidth, util, splt } from '@sentre/senhub'
import IonIcon from '@sentre/antd-ionicon'

import {
  Button,
  Card,
  Col,
  Collapse,
  Modal,
  Row,
  Space,
  Tabs,
  Tooltip,
  Typography,
} from 'antd'
import Content from './content'
import Unstake from './stakeAndUnstake/unstake'
import Stake from './stakeAndUnstake/stake'
import FarmInfo from './farmInfo'
import Management from './management'
import Exit from './stakeAndUnstake/exit'

import { HarvestValidator } from 'helper/validateHarvest'
import { useDebt } from 'hooks/useDebt'
import { useReward } from 'hooks/useReward'
import { useFarmLiquidity } from 'hooks/useFarmLiquidity'
import { useFarmRoi } from 'hooks/useFarmRoi'
import { AppState } from 'model'
import { notifyError, notifySuccess } from 'helper'
import { MintAvatar, MintSymbol } from 'components/mint'
import configs from 'configs'
import { useFarmPool } from 'hooks/useCorrespondingPool'
import { FarmStatus } from 'constants/farms'
import { useBudget } from 'hooks/useBudget'
import useMintDecimals from 'shared/hooks/useMintDecimals'

const {
  sol: { senAddress, farming },
} = configs

const LOW_BUDGET =
  'The budget of reward is very low. Please unstake your tokens for safety.'

const ItemFarming = ({ farmAddress }: { farmAddress: string }) => {
  const farmData = useSelector((state: AppState) => state.farms?.[farmAddress])
  const { data } = useDebt(farmAddress)
  const userReward = useReward(farmAddress)
  const farmPool = useFarmPool(farmAddress)
  const liquidity = useFarmLiquidity(farmAddress)
  const { apr } = useFarmRoi(farmAddress)
  const width = useWidth()
  const walletAddress = useWalletAddress()
  const history = useHistory()
  const [activeKey, setActiveKey] = useState<string>()
  const [visible, setVisible] = useState(false)
  const [visibleInfo, setVisibleInfo] = useState(false)
  const [loading, setLoading] = useState(false)
  const [warning, setWarning] = useState('')
  const { owner, state, reward } = farmData || {}
  const isOwner = owner === walletAddress
  const farmSelected = useSelector((state: AppState) => state.main.search)
  const farmFrozen = state === FarmStatus.isFreeze
  const lptDecimal = useMintDecimals(farmData?.mint_stake)
  const farmDecimal = useMintDecimals(farmData?.mint_stake)
  const { budget } = useBudget(farmAddress)

  const farmReward = useMemo(() => {
    if (farmDecimal === 0 || !farmDecimal) return 0
    return utils.undecimalize(reward, farmDecimal)
  }, [farmDecimal, reward])

  const onActive = () => {
    if (activeKey) return setActiveKey(undefined)
    return setActiveKey(farmAddress)
  }

  const handleHarvest = async () => {
    setLoading(true)
    const { solana } = window.sentre
    const senWallet = await splt.deriveAssociatedAddress(
      walletAddress,
      senAddress,
    )
    try {
      if (!solana) throw new Error('please connect wallet first!')
      const harvestValidator = new HarvestValidator()
      await harvestValidator.validate(farmAddress)
      const { txId } = await farming.harvest(farmAddress, senWallet, solana)
      return notifySuccess('Harvest', txId)
    } catch (er) {
      return notifyError(er)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!farmSelected || farmSelected !== farmAddress) return
    if (budget < Number(farmReward) * 3) return setWarning(LOW_BUDGET)
    setActiveKey(farmSelected)
  }, [budget, farmAddress, farmReward, farmSelected])

  const TooltipApr = () => (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Space size={4}>
          <Typography.Title style={{ color: '#fff' }} level={5}>
            APR
          </Typography.Title>
          <Typography.Text type="secondary">
            (Annual Percentage Rate)
          </Typography.Text>
        </Space>
      </Col>
      <Col>
        <Typography.Text style={{ color: '#E9E9EB' }}>
          Refers to the simple interest accured from a particular inverstment
          over a 1 year period.
        </Typography.Text>
      </Col>
    </Row>
  )

  let amountLptShared = '0'
  if (data && lptDecimal) {
    amountLptShared = utils.undecimalize(data.shares, lptDecimal)
  }
  const desktop = width > 768
  const icoDesktopCollapse = activeKey
    ? 'chevron-down-outline'
    : 'chevron-forward-outline'
  const icoMobileCollapse = activeKey
    ? 'chevron-up-outline'
    : 'chevron-down-outline'

  const icon = !desktop ? icoMobileCollapse : icoDesktopCollapse
  const freezeStyle = farmFrozen ? { opacity: 0.6 } : {}

  return (
    <Row style={{ ...freezeStyle }}>
      <Col span={24}>
        <Card
          bordered={false}
          className="farming-card"
          bodyStyle={{ padding: 16 }}
          style={{
            boxShadow: 'unset',
            borderRadius: 8,
            position: 'relative',
            zIndex: 1,
          }}
          hoverable
          onClick={onActive}
        >
          <Row gutter={[16, 16]} justify="center" align="middle">
            <Col flex="auto">
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24} md={5}>
                  <Space>
                    <MintAvatar mintAddress={farmData?.mint_stake} size={24} />
                    <MintSymbol mintAddress={farmAddress} />
                    <Button
                      type="text"
                      shape="circle"
                      size="small"
                      icon={<IonIcon name="information-circle-outline" />}
                      onClick={(e) => {
                        e.stopPropagation()
                        setVisibleInfo(true)
                      }}
                    />
                  </Space>
                </Col>
                <Col xs={12} md={4}>
                  <Content
                    label="APR"
                    tooltip={<TooltipApr />}
                    value={util.numeric(apr).format('0,0.[00]a%')}
                  />
                </Col>
                <Col xs={12} md={5}>
                  <Content
                    label="Liquidity"
                    value={util.numeric(liquidity).format('0,0.00[00]a$')}
                  />
                </Col>
                <Col xs={12} md={5}>
                  <Content
                    label="Your staked LPT"
                    value={util.numeric(amountLptShared).format('0,0.00[00]')}
                  />
                </Col>
                <Col xs={12} md={5}>
                  <Content
                    mintAddress={farmData?.mint_reward}
                    label="Reward"
                    value={util.numeric(userReward).format('0,0.00[00]')}
                  />
                </Col>
              </Row>
            </Col>
            <Col>
              <Space>
                {farmFrozen && <IonIcon name="snow-outline" />}
                {warning && (
                  <Tooltip title={LOW_BUDGET}>
                    <IonIcon
                      name="alert-circle-outline"
                      style={{ color: '#D72311' }}
                    />
                  </Tooltip>
                )}
                <Button
                  type="text"
                  icon={<IonIcon name={icon} />}
                  disabled={!isOwner && farmFrozen}
                  onClick={onActive}
                />
              </Space>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Collapse activeKey={activeKey} className="expand-farm-card">
          <Collapse.Panel header={null} key={farmAddress} showArrow={false}>
            <Row gutter={[16, 16]}>
              <Col xs={{ order: 2 }} md={{ order: 1 }} flex="auto">
                {farmPool && (
                  <Button
                    type="text"
                    style={{ padding: 0, background: 'transparent' }}
                    onClick={() => {
                      history.push(
                        `/app/sen_lp/details?poolAddress=${farmPool.address}`,
                      )
                    }}
                  >
                    To the pool
                    <IonIcon name="chevron-forward-outline" />
                  </Button>
                )}
              </Col>
              <Col xs={{ order: 1 }} md={{ order: 2 }}>
                <Space>
                  {isOwner && <Management farmAddress={farmAddress} />}
                  <Button
                    onClick={() => setVisible(true)}
                    disabled={farmFrozen}
                  >
                    Stake / Unstake
                  </Button>
                  <Button
                    type="primary"
                    icon={<IonIcon name="leaf-outline" />}
                    loading={loading}
                    onClick={handleHarvest}
                    disabled={farmFrozen || userReward === 0}
                  >
                    Harvest
                  </Button>
                </Space>
              </Col>
            </Row>
          </Collapse.Panel>
        </Collapse>
      </Col>
      <Modal
        onCancel={() => setVisible(false)}
        closeIcon={<IonIcon name="close" />}
        footer={null}
        title={null}
        visible={visible}
      >
        <Tabs defaultActiveKey={farmFrozen ? 'exit' : 'stake'}>
          <Tabs.TabPane tab="Stake" key="stake" disabled={farmFrozen}>
            <Stake farmAddress={farmAddress} onClose={setVisible} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Unstake" key="unstake" disabled={farmFrozen}>
            <Unstake farmAddress={farmAddress} onClose={setVisible} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Exit" key="exit">
            <Exit farmAddress={farmAddress} onClose={setVisible} />
          </Tabs.TabPane>
        </Tabs>
      </Modal>
      <Modal
        visible={visibleInfo}
        onCancel={() => setVisibleInfo(false)}
        closeIcon={<IonIcon name="close" />}
        title="Farm Info"
        footer={null}
        destroyOnClose
        centered
      >
        <FarmInfo farmAddress={farmAddress} />
      </Modal>
    </Row>
  )
}
export default ItemFarming
