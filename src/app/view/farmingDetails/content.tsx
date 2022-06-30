import { ReactNode } from 'react'

import { Button, Space, Tooltip, Typography } from 'antd'
import { MintAvatar, MintSymbol } from 'app/shared/components/mint'
import IonIcon from '@sentre/antd-ionicon'

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
              icon={
                <Typography.Text type="secondary">
                  <IonIcon name="information-circle-outline" />
                </Typography.Text>
              }
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
