import { Fragment, useEffect, useMemo, useState } from 'react'
import { utils } from '@senswap/sen-js'
import { useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'

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
} from 'antd'
import Content from './content'
import IonIcon from 'shared/antd/ionicon'
import Unstake from './stakeAndUnstake/unstake'
import Stake from './stakeAndUnstake/stake'
import Management from '../management'

import { useDebt } from 'app/hooks/useDebt'
import { useReward } from 'app/hooks/useReward'
import { useFarmLiquidity } from 'app/hooks/useFarmLiquidity'
import { useFarmRoi } from 'app/hooks/useFarmRoi'
import { AppState } from 'app/model'
import util from 'helpers/util'
import { LPT_DECIMALS } from 'app/configs/farmstat.config'
import { useUI, useWallet } from 'senhub/providers'
import configs from 'app/configs'
import { HarvestValidator } from 'helpers/validateHarvest'
import { notifyError, notifySuccess } from 'app/helper'
import { MintAvatar, MintSymbol } from 'app/shared/components/mint'

const {
  sol: { senAddress, farming },
  manifest: { appId },
} = configs

const ItemFarming = ({ farmAddress }: { farmAddress: string }) => {
  const farmData = useSelector((state: AppState) => state.farms[farmAddress])
  const { data } = useDebt(farmAddress)
  const reward = useReward(farmAddress)
  const liquidity = useFarmLiquidity(farmAddress)
  const { apr } = useFarmRoi(farmAddress)
  const {
    ui: { width },
  } = useUI()
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const locationSearch = useLocation().search
  const history = useHistory()
  const [activeKey, setActiveKey] = useState<string>()
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const query = useMemo(
    () => new URLSearchParams(locationSearch),
    [locationSearch],
  )

  const onActive = () => {
    if (!activeKey) {
      query.set('farmAddress', farmAddress)
      history.push(`/app/${appId}?` + query.toString())
      return setActiveKey(farmAddress)
    }
    return setActiveKey(undefined)
  }

  const handleHarvest = async () => {
    setLoading(true)
    const { splt, wallet } = window.sentre
    const senWallet = await splt.deriveAssociatedAddress(
      walletAddress,
      senAddress,
    )
    try {
      if (!wallet) throw new Error('please connect wallet first!')
      const harvestValidator = new HarvestValidator()
      await harvestValidator.validate(farmAddress)
      const { txId } = await farming.harvest(farmAddress, senWallet, wallet)
      return notifySuccess('Harvest', txId)
    } catch (er) {
      return notifyError(er)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const farmSelected = query.get('farmAddress')
    if (!farmSelected || farmSelected !== farmAddress) return
    setActiveKey(farmSelected)
  }, [farmAddress, query])

  let amountLptShared = '0'
  if (data) {
    amountLptShared = utils.undecimalize(data.shares, LPT_DECIMALS)
  }
  const desktop = width > 768
  const icoDesktopCollapse = activeKey
    ? 'chevron-down-outline'
    : 'chevron-forward-outline'
  const icoMobileCollapse = activeKey
    ? 'chevron-up-outline'
    : 'chevron-down-outline'

  const icon = !desktop ? icoMobileCollapse : icoDesktopCollapse

  return (
    <Fragment>
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
      >
        <Row gutter={[16, 16]} justify="center" align="middle">
          <Col flex="auto">
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} md={5}>
                <Space>
                  <MintAvatar mintAddress={farmData.mint_stake} size={24} />
                  <MintSymbol mintAddress={farmAddress} />
                  <Tooltip title={farmAddress}>
                    <Button
                      type="text"
                      shape="circle"
                      size="small"
                      icon={<IonIcon name="alert-circle-outline" />}
                    />
                  </Tooltip>
                </Space>
              </Col>
              <Col xs={12} md={4}>
                <Content
                  label="APR"
                  tooltip={farmAddress}
                  value={util.Numberic(apr).format('0,0.[00]a%')}
                />
              </Col>
              <Col xs={12} md={5}>
                <Content
                  label="Liquidity"
                  value={util.Numberic(liquidity).format('0,0.00[00]a$')}
                />
              </Col>
              <Col xs={12} md={5}>
                <Content
                  label="Your staked LPT"
                  value={util.Numberic(amountLptShared).format('0,0.00[00]')}
                />
              </Col>
              <Col xs={12} md={5}>
                <Content
                  mintAddress={farmData.mint_reward}
                  label="Reward"
                  value={util.Numberic(reward).format('0,0.00[00]')}
                />
              </Col>
            </Row>
          </Col>
          <Col>
            <Button
              type="text"
              icon={<IonIcon name={icon} />}
              onClick={onActive}
            />
          </Col>
        </Row>
      </Card>
      <Row>
        <Col span={24}>
          <Collapse activeKey={activeKey} className="expand-card">
            <Collapse.Panel header={null} key={farmAddress} showArrow={false}>
              <Row gutter={[16, 16]}>
                <Col xs={{ order: 2 }} md={{ order: 1 }} flex="auto">
                  <Button
                    type="text"
                    style={{ padding: 0, background: 'transparent' }}
                  >
                    Go pool
                    <IonIcon name="chevron-forward-outline" />
                  </Button>
                </Col>
                <Col xs={{ order: 1 }} md={{ order: 2 }}>
                  <Space>
                    <Management />
                    <Button
                      onClick={() => setVisible(true)}
                      icon={<IonIcon name="add-outline" />}
                    >
                      Stake
                    </Button>
                    <Button
                      type="primary"
                      icon={<IonIcon name="leaf-outline" />}
                      loading={loading}
                      onClick={handleHarvest}
                      disabled={reward === 0}
                    >
                      Harvest
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Collapse.Panel>
          </Collapse>
        </Col>
      </Row>
      <Modal
        onCancel={() => setVisible(false)}
        footer={null}
        title={null}
        visible={visible}
      >
        <Tabs>
          <Tabs.TabPane tab="Stake" key="stake">
            <Stake farmAddress={farmAddress} onClose={setVisible} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Unstake" key="unstake">
            <Unstake farmAddress={farmAddress} onClose={setVisible} />
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    </Fragment>
  )
}
export default ItemFarming
