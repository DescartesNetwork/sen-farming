import { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { utils } from '@senswap/sen-js'
import { Button, Card, Col, Collapse, Row, Space, Tooltip } from 'antd'
import Content from './content'
import IonIcon from 'shared/antd/ionicon'

import { MintAvatar, MintSymbol } from 'app/shared/components/mint'
import { AppState } from 'app/model'

import { LPT_DECIMALS } from 'app/configs/farmstat.config'
import util from 'helpers/util'
import { useDebt } from 'app/hooks/useDebt'
import { useReward } from 'app/hooks/useReward'

const ItemFarming = ({ farmAddress }: { farmAddress: string }) => {
  const farmData = useSelector((state: AppState) => state.farms[farmAddress])
  const { data } = useDebt(farmAddress)
  const reward = useReward(farmAddress)
  const [activeKey, setActiveKey] = useState<string>()

  const onActive = () => {
    if (!activeKey) return setActiveKey('extra-card-item')
    return setActiveKey(undefined)
  }

  let ttl = 0
  if (farmData) {
    ttl = Number(utils.undecimalize(farmData.total_shares, LPT_DECIMALS))
  }

  let amountLptShared = '0'
  if (data) {
    amountLptShared = utils.undecimalize(data.shares, LPT_DECIMALS)
  }

  const iconCardCollapse = activeKey
    ? 'chevron-down-outline'
    : 'chevron-forward-outline'

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
        <Row gutter={[16, 16]} align="middle">
          <Col flex="auto">
            <Row align="middle">
              <Col span={5}>
                <Space size={4}>
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
              <Col span={4}>
                <Content label="APR" tooltip={farmAddress} value="19%" />
              </Col>
              <Col span={5}>
                <Content label="Liquidity" value={ttl.toString()} />
              </Col>
              <Col span={5}>
                <Content
                  label="Your staked LPT"
                  value={util.Numberic(amountLptShared).format('0,0.00[00]')}
                />
              </Col>
              <Col span={5}>
                <Content
                  avatarAddress={farmData.mint_stake}
                  label="Reward"
                  value={util.Numberic(reward).format('0,0.00[00]')}
                  symbol="SEN"
                />
              </Col>
            </Row>
          </Col>
          <Col>
            <Button
              type="text"
              icon={<IonIcon name={iconCardCollapse} />}
              onClick={onActive}
            />
          </Col>
        </Row>
      </Card>
      <Row>
        <Col span={24}>
          <Collapse activeKey={activeKey} className="expand-card">
            <Collapse.Panel
              header={null}
              key="extra-card-item"
              showArrow={false}
            >
              <Row gutter={[16, 16]}>
                <Col flex="auto">
                  <Button
                    type="text"
                    style={{ padding: 0, background: 'transparent' }}
                  >
                    Go pool
                    <IonIcon name="chevron-forward-outline" />
                  </Button>
                </Col>
                <Col>
                  <Space>
                    <Button icon={<IonIcon name="add-outline" />}>Stake</Button>
                    <Button
                      type="primary"
                      icon={<IonIcon name="leaf-outline" />}
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
    </Fragment>
  )
}
export default ItemFarming
