import { Fragment, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { utils } from '@senswap/sen-js'
import CopyToClipboard from 'react-copy-to-clipboard'

import {
  Modal,
  Row,
  Col,
  Space,
  Typography,
  Card,
  Tabs,
  Button,
  Tooltip,
} from 'antd'
import IonIcon from 'shared/antd/ionicon'
import { MintAvatar, MintSymbol } from 'app/shared/components/mint'
import Seed from './seed'
import Unseed from './unseed'
import FreezeOrThaw from './freezeOrThaw'
import Close from './close'

import { asyncWait, explorer, shortenAddress } from 'shared/util'
import { AppState } from 'app/model'
import { useBudget } from 'app/hooks/useBudget'
import useMintDecimals from 'app/shared/hooks/useMintDecimals'

const ExtraTypography = ({
  label = '',
  title = '',
}: {
  label?: string
  title?: string
}) => {
  return (
    <Row gutter={[16, 16]}>
      <Col flex="auto">
        <Typography.Text type="secondary">{label}</Typography.Text>
      </Col>
      <Col>
        <Typography.Text>{title}</Typography.Text>
      </Col>
    </Row>
  )
}

const Management = ({ farmAddress }: { farmAddress: string }) => {
  const farmData = useSelector((state: AppState) => state.farms?.[farmAddress])
  const [visible, setVisible] = useState(false)
  const [visibleTooltip, setVisibleTooltip] = useState(false)
  const { budget, symbol } = useBudget(farmAddress)
  const { mint_stake: mintFarmAddress, period, reward } = farmData || {}
  const farmDecimal = useMintDecimals(mintFarmAddress)

  const onCopy = async () => {
    setVisibleTooltip(true)
    await asyncWait(1500)
    setVisibleTooltip(false)
  }

  const farmReward = useMemo(() => {
    if (farmDecimal === 0) return 0
    return utils.undecimalize(reward, farmDecimal)
  }, [farmDecimal, reward])

  const formatPeriod = useMemo(() => {
    const numPeriod = Number(period)
    let time = numPeriod / 86400
    let formatTime = 'days'
    if (time > 29) {
      time = time / 30
      formatTime = time > 1 ? 'months' : 'month'
    }
    if (time < 2) {
      time = time * 24
      formatTime = time > 1 ? 'hours' : 'hour'
    }
    return `${farmReward} ${symbol} / ${Math.floor(time)} ${formatTime}`
  }, [farmReward, period, symbol])

  return (
    <Fragment>
      <Button onClick={() => setVisible(true)}>Manage</Button>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        closeIcon={<IonIcon name="close" />}
        footer={null}
        destroyOnClose
        centered
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Space style={{ lineHeight: 1 }}>
              <IonIcon name="leaf" />
              <Typography.Title level={5} style={{ margin: 0 }}>
                Farm Management
              </Typography.Title>
            </Space>
          </Col>
          <Col span={24}>
            <Card
              style={{ borderRadius: 8 }}
              bodyStyle={{ padding: 16 }}
              bordered={false}
            >
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Row gutter={[0, 0]}>
                    <Col flex="auto">
                      <Space size={4} style={{ fontWeight: 600 }}>
                        <MintAvatar mintAddress={mintFarmAddress} size={32} />
                        <MintSymbol mintAddress={mintFarmAddress} />
                      </Space>
                    </Col>
                    <Col>
                      <Space size={2}>
                        <Typography.Text
                          type="secondary"
                          style={{ fontSize: 12 }}
                        >
                          {shortenAddress(farmAddress)}
                        </Typography.Text>
                        <Tooltip visible={visibleTooltip} title="Copied">
                          <CopyToClipboard text={farmAddress}>
                            <Button
                              type="text"
                              size="small"
                              onClick={onCopy}
                              icon={<IonIcon name="copy-outline" />}
                            />
                          </CopyToClipboard>
                        </Tooltip>
                        <Button
                          type="text"
                          size="small"
                          onClick={() =>
                            window.open(explorer(farmAddress), '_blank')
                          }
                          icon={<IonIcon name="open-outline" />}
                        />
                      </Space>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <ExtraTypography
                    label="Budget"
                    title={`${budget} ${symbol}`}
                  />
                </Col>
                <Col span={24}>
                  <ExtraTypography label="Reward" title={formatPeriod} />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={24}>
            <Tabs>
              <Tabs.TabPane key="seed" tab="Seed">
                <Seed
                  farmAddress={farmAddress}
                  onChange={() => setVisible(false)}
                />
              </Tabs.TabPane>
              <Tabs.TabPane key="unseed" tab="Unseed">
                <Unseed
                  farmAddress={farmAddress}
                  onChange={() => setVisible(false)}
                />
              </Tabs.TabPane>
              <Tabs.TabPane key="freeze-thaw" tab="Freeze/Thaw">
                <FreezeOrThaw
                  farmAddress={farmAddress}
                  onChange={() => setVisible(false)}
                />
              </Tabs.TabPane>
              <Tabs.TabPane key="ownership" tab="Ownership" disabled>
                TBD
              </Tabs.TabPane>
              <Tabs.TabPane key="close" tab="Close">
                <Close
                  farmAddress={farmAddress}
                  onChange={() => setVisible(false)}
                />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default Management
