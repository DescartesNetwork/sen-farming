import { Card, Col, Divider, Row, Space, Typography } from 'antd'
import { useUI } from 'senhub/providers'
import IonIcon from 'shared/antd/ionicon'

const Banner = () => {
  const {
    ui: { width },
  } = useUI()

  const desktop = width > 768
  const xsSpan = !desktop ? 24 : undefined
  const rowSpacing = desktop ? 32 : 16
  const spaceSize = desktop ? 8 : 4
  const spaceDirection = desktop ? 'vertical' : 'horizontal'
  const iconName = desktop ? 'pause-outline' : 'reorder-two-outline'

  return (
    <Card
      bordered={false}
      className={`${desktop ? '' : 'banner-farming-mobile '}banner-farming`}
    >
      <Row gutter={[12, rowSpacing]}>
        <Col span={24}>
          <Typography.Title level={4} style={{ color: '#212433' }}>
            Sen Farming
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Row gutter={[12, 12]}>
            <Col span={xsSpan}>
              <Space direction="vertical" size={spaceSize}>
                <Typography.Text style={{ color: '#212433' }}>
                  Total TVL all Farms
                </Typography.Text>
                <Typography.Title level={2} style={{ color: '#F9575E' }}>
                  $2,096,977,588
                </Typography.Title>
              </Space>
            </Col>
            {desktop && (
              <Col>
                <Divider type="vertical" style={{ height: '100%' }} />
              </Col>
            )}
            <Col span={xsSpan}>
              <Space direction="vertical" size={spaceSize}>
                <Typography.Text style={{ color: '#212433' }}>
                  Positive Farms
                </Typography.Text>
                <Typography.Title level={2} style={{ color: '#F9575E' }}>
                  19
                </Typography.Title>
              </Space>
            </Col>
            {desktop && (
              <Col>
                <Divider type="vertical" style={{ height: '100%' }} />
              </Col>
            )}
            <Col span={xsSpan}>
              <Space direction={spaceDirection} size={0} align="center">
                <Typography.Title level={4} style={{ color: '#212433' }}>
                  1 SEN
                </Typography.Title>
                <IonIcon style={{ color: '#212433' }} name={iconName} />
                <Typography.Title level={4} style={{ color: '#F9575E' }}>
                  $1.8924
                </Typography.Title>
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default Banner
