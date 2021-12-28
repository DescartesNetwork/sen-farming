import { Fragment, useState } from 'react'

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
import { MintAvatar, MintName } from 'app/shared/components/mint'
import Seed from './seed'
import Unseed from './unseed'
import FreezeOrThaw from './freezeOrThaw'
import Close from './close'

import { asyncWait, explorer } from 'shared/util'
import CopyToClipboard from 'react-copy-to-clipboard'

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

const Management = () => {
  const [visible, setVisible] = useState(false)
  const [visibleTooltip, setVisibleTooltip] = useState(false)

  const onCopy = async () => {
    setVisibleTooltip(true)
    await asyncWait(1500)
    setVisibleTooltip(false)
  }

  return (
    <Fragment>
      <Button onClick={() => setVisible(true)}>Manage</Button>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        closeIcon={<IonIcon name="close" />}
        footer={null}
        destroyOnClose={true}
        centered={true}
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
                      <Space size={0} style={{ fontWeight: 600 }}>
                        <MintAvatar mintAddress={''} size={32} />
                        <MintName mintAddress={''} />
                      </Space>
                    </Col>
                    <Col>
                      <Space size={2}>
                        <Typography.Text
                          type="secondary"
                          style={{ fontSize: 12 }}
                        >
                          addr..
                        </Typography.Text>
                        <Tooltip visible={visibleTooltip} title="Copied">
                          <CopyToClipboard text="copy">
                            <Button
                              type="text"
                              size="small"
                              onClick={onCopy}
                              icon={<IonIcon name="copy" />}
                            />
                          </CopyToClipboard>
                        </Tooltip>
                        <Button
                          type="text"
                          size="small"
                          onClick={() => explorer('farmAddress')}
                          icon={<IonIcon name="open" />}
                        />
                      </Space>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <ExtraTypography label="Liquidity" title="$319.693" />
                </Col>
                <Col span={24}>
                  <ExtraTypography label="Budget" title="200 SNTR" />
                </Col>
                <Col span={24}>
                  <ExtraTypography label="Reward" title="1 SNTR/3 day" />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={24}>
            <Tabs>
              <Tabs.TabPane key="seed" tab="Seed">
                <Seed farmAddress={''} onChange={() => setVisible(false)} />
              </Tabs.TabPane>
              <Tabs.TabPane key="unseed" tab="Unseed">
                <Unseed farmAddress={''} onChange={() => setVisible(false)} />
              </Tabs.TabPane>
              <Tabs.TabPane key="freeze-thaw" tab="Freeze/Thaw">
                <FreezeOrThaw
                  farmAddress={''}
                  onChange={() => setVisible(false)}
                />
              </Tabs.TabPane>
              <Tabs.TabPane key="ownership" tab="Ownership" disabled>
                TBD
              </Tabs.TabPane>
              <Tabs.TabPane key="close" tab="Close">
                <Close farmAddress={''} onChange={() => setVisible(false)} />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default Management
