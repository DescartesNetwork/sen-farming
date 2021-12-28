import { Button, Card, Col, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'

const Close = ({
  farmAddress,
  onChange = () => {},
}: {
  farmAddress: string
  onChange?: (txId: string) => void
}) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card
          style={{ boxShadow: 'unset', borderRadius: 8 }}
          bodyStyle={{ padding: 16 }}
        >
          <Row gutter={[0, 0]}>
            <Col span={24}>
              <Space>
                <IonIcon name="information-circle-outline" />
                <Typography.Text>
                  The farm can be closed only all farmers unstaked their tokens!
                </Typography.Text>
              </Space>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Button
          type="primary"
          icon={<IonIcon name="trash-outline" />}
          onClick={() => {}}
          block
        >
          Close Farm
        </Button>
      </Col>
    </Row>
  )
}

export default Close
