import { CopyToClipboard } from 'react-copy-to-clipboard'
import { account } from '@senswap/sen-js'
import IonIcon from '@sentre/antd-ionicon'

import { Row, Col, Typography, Tooltip, Button } from 'antd'
import Title from './title'

const Address = ({
  address,
  onCopy,
  copieAddress,
  description = false,
  title,
}: {
  address: string
  onCopy: (address: string) => void
  copieAddress: string
  description?: boolean
  title: string
}) => {
  return (
    <Row gutter={[0, 8]}>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 10 }}
        md={{ span: 10 }}
        lg={{ span: 10 }}
        flex="auto"
      >
        <Title title={title} />
      </Col>
      <Col
        xs={{ span: 22 }}
        sm={{ span: 14 }}
        md={{ span: 14 }}
        lg={{ span: 14 }}
        flex="auto"
      >
        {account.isAddress(address) && (
          <Typography.Text>{address}</Typography.Text>
        )}
      </Col>
      <Col>
        <Tooltip title="Copied" visible={address === copieAddress}>
          <CopyToClipboard text={address} onCopy={(address) => onCopy(address)}>
            <Button
              type="text"
              size="small"
              style={{ marginRight: -7 }}
              icon={<IonIcon name="copy-outline" />}
            />
          </CopyToClipboard>
        </Tooltip>
      </Col>
      {description ? (
        <Col span={24}>
          <Typography.Paragraph type="secondary" style={{ fontSize: 12 }}>
            Tips: You can use this address for searching the pool coresponding
            to the farm in Sen LP.
          </Typography.Paragraph>
        </Col>
      ) : null}
    </Row>
  )
}

export default Address
