import { Button, Space, Tooltip, Typography } from 'antd'
import { MintAvatar } from 'app/shared/components/mint'
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

export default Content
