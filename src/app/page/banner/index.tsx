import { Card, Col, Divider, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'

const Banner = () => {
  return (
    <Card bodyStyle={{}} bordered={false} className="banner-farming">
      <Row gutter={[12, 33]}>
        <Col span={24}>
          <Typography.Title level={4} style={{ color: '#212433' }}>
            Sen Farming
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Row gutter={[24, 24]}>
            <Col>
              <Space direction="vertical">
                <Typography.Text style={{ color: '#212433' }}>
                  Total TVL all Farms
                </Typography.Text>
                <Typography.Title level={2} style={{ color: '#F9575E' }}>
                  $2,096,977,588
                </Typography.Title>
              </Space>
            </Col>
            <Col>
              <Divider type="vertical" style={{ height: '100%' }} />
            </Col>
            <Col>
              <Space direction="vertical">
                <Typography.Text style={{ color: '#212433' }}>
                  Positive Farms
                </Typography.Text>
                <Typography.Title level={2} style={{ color: '#F9575E' }}>
                  19
                </Typography.Title>
              </Space>
            </Col>
            <Col>
              <Divider type="vertical" style={{ height: '100%' }} />
            </Col>
            <Col>
              <Space direction="vertical" size={0}>
                <Typography.Title level={4} style={{ color: '#212433' }}>
                  1 SEN
                </Typography.Title>
                <IonIcon name="pause-outline" />
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
