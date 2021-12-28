import { Button, Card, Col, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'

const FreezeOrThaw = ({
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
          <Space align="start">
            <IonIcon name="information-circle-outline" />
            <Typography.Text>
              Freezing a farm will prevent all actions, but "seed" and "unseed",
              until the farm has been thawed.
            </Typography.Text>
          </Space>
        </Card>
      </Col>
      <Col span={24}>
        <Button
          type="primary"
          icon={<IonIcon name="snow-outline" />}
          onClick={() => {}}
          block
          disabled={true}
        >
          Freezee
        </Button>
      </Col>
    </Row>
  )
}

export default FreezeOrThaw
