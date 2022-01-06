import { Button, Space, Tooltip, Typography } from 'antd'
import { MintAvatar, MintSymbol } from 'app/shared/components/mint'
import { ReactNode } from 'react'
import IonIcon from 'shared/antd/ionicon'

const Content = ({
  label = '',
  tooltip,
  value = '',
  mintAddress,
}: {
  label?: string
  tooltip?: ReactNode
  value?: string
  mintAddress?: string
}) => {
  return (
    <Space direction="vertical" size={4}>
      <Space size={4}>
        <Space size={4}>
          {mintAddress && <MintAvatar mintAddress={mintAddress} />}
          <Typography.Text type="secondary">{label}</Typography.Text>
        </Space>
        {tooltip && (
          <Tooltip title={tooltip}>
            <Button
              type="text"
              shape="circle"
              size="small"
              icon={<IonIcon name="information-circle-outline" />}
            />
          </Tooltip>
        )}
      </Space>
      <Space>
        <Typography.Title level={5}>{value}</Typography.Title>
        {mintAddress && <MintSymbol mintAddress={mintAddress} />}
      </Space>
    </Space>
  )
}

export default Content
