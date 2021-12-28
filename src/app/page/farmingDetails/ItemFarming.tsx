import {
  Button,
  Card,
  Col,
  Collapse,
  Row,
  Space,
  Tooltip,
  Typography,
} from 'antd'
import { MintAvatar, MintSymbol } from 'app/shared/components/mint'
import { Fragment, useState } from 'react'
import IonIcon from 'shared/antd/ionicon'

const Content = ({
  label = '',
  tooltip,
  value = '',
  symbol,
  avatarAddress,
}: {
  label?: string
  tooltip?: string
  value?: string
  symbol?: string
  avatarAddress?: string
}) => {
  return (
    <Space direction="vertical" size={4}>
      <Space size={4}>
        <Space size={4}>
          {avatarAddress && <MintAvatar mintAddress={avatarAddress} />}
          <Typography.Text type="secondary">{label}</Typography.Text>
        </Space>
        {tooltip && (
          <Tooltip title={tooltip}>
            <Button
              type="text"
              shape="circle"
              size="small"
              icon={<IonIcon name="alert-circle-outline" />}
            />
          </Tooltip>
        )}
      </Space>
      <Space>
        <Typography.Title level={5}>{value}</Typography.Title>
        {symbol && <Typography.Title level={5}>{symbol}</Typography.Title>}
      </Space>
    </Space>
  )
}

const ItemFarming = ({ farmAddress }: { farmAddress: string }) => {
  const [activeKey, setActiveKey] = useState<string>()
  const onActive = () => {
    if (!activeKey) return setActiveKey('extra-card-item')
    return setActiveKey(undefined)
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
                  <MintAvatar
                    mintAddress={'FLbvKzAs89FoWsrEyis2N2D9QhujF6cKnakqqTah6Bek'}
                    size={24}
                  />
                  <MintSymbol
                    mintAddress={'FLbvKzAs89FoWsrEyis2N2D9QhujF6cKnakqqTah6Bek'}
                  />
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
                <Content label="Liquidity" value="$1,231" />
              </Col>
              <Col span={5}>
                <Content label="Your staked LPT" value="20" />
              </Col>
              <Col span={5}>
                <Content
                  avatarAddress={'2adP8T26nMuXbxKUf79C2YR5ZPwK8vuWeu6Up6pzsmTC'}
                  label="Reward"
                  value="0"
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
