import IonIcon from '@sentre/antd-ionicon'

import { Space, Typography } from 'antd'

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
