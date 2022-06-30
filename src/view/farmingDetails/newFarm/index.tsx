import { useState } from 'react'

import { Button, Col, Modal, Row } from 'antd'
import ConfirmAddFarm from './confirmAddFarm'
import MintSelection from './mintSelection'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import IonIcon from '@sentre/antd-ionicon'

const NewFarm = ({ size = 'small' }: { size?: SizeType }) => {
  const [visible, setVisible] = useState(false)
  const [mintAddress, setMintAddress] = useState('')
  const [visibleInputTokenModal, setVisibleInputTokenModal] = useState(false)

  const onClose = () => {
    setVisible(false)
    setMintAddress('')
  }

  return (
    <Row>
      <Col span={24}>
        <Button
          style={{ background: 'transparent' }}
          onClick={() => setVisible(true)}
          size={size}
        >
          New Farm
        </Button>
      </Col>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={false}
        closeIcon={<IonIcon name="close-outline" />}
      >
        <ConfirmAddFarm
          mintAddress={mintAddress}
          onClose={onClose}
          setVisibleInputTokenModal={setVisibleInputTokenModal}
        />
      </Modal>
      <Modal
        visible={visibleInputTokenModal}
        onCancel={() => setVisibleInputTokenModal(false)}
        footer={false}
        closeIcon={<IonIcon name="close-outline" />}
      >
        <MintSelection
          onChange={(value: string) => {
            setMintAddress(value)
          }}
          onHideInputTokenModal={setVisibleInputTokenModal}
        />
      </Modal>
    </Row>
  )
}

export default NewFarm
