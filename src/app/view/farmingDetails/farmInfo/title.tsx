import { Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'

const Title = ({ title }: { title: string }) => {
  return (
    <Space>
      <IonIcon style={{ fontSize: 18 }} name="alert-circle-outline" />
      <Typography.Text type="secondary" ellipsis>
        {title}
      </Typography.Text>
    </Space>
  )
}
export default Title
