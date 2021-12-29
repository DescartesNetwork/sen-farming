import { useState } from 'react'

import { Button, Col, Modal, Row } from 'antd'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import IonIcon from 'shared/antd/ionicon'
import StepAddFarm from './stepAddFarm'
import ConfirmAddFarm from './confirmAddFarm'
import MintSelection from './mintSelection'

const NewFarm = ({ size = 'small' }: { size?: SizeType }) => {
  const [visible, setVisible] = useState(false)
  const [stepNewFarm, setStepNewFarm] = useState(1)
  const [mintAddress, setMintAddress] = useState('')
  const [visibleInputModal, setVisibleInputModal] = useState(false)

  const onClose = () => {
    setVisible(false)
    setStepNewFarm(1)
    setMintAddress('')
  }

  return (
    <Row>
      <Col span={24}>
        <Button onClick={() => setVisible(true)} size={size}>
          New farm
        </Button>
      </Col>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={false}
        closeIcon={<IonIcon name="close-outline" />}
      >
        {stepNewFarm === 1 && <StepAddFarm onNext={setStepNewFarm} />}
        {stepNewFarm === 2 && (
          <ConfirmAddFarm
            mintAddress={mintAddress}
            onClose={onClose}
            onNext={setStepNewFarm}
            onSelectInput={setVisibleInputModal}
          />
        )}
      </Modal>
      <Modal
        visible={visibleInputModal}
        onCancel={() => setVisibleInputModal(false)}
        footer={false}
        closeIcon={<IonIcon name="close-outline" />}
      >
        <MintSelection
          onChange={(value: string) => {
            setMintAddress(value)
          }}
          onNext={setVisibleInputModal}
        />
      </Modal>
    </Row>
  )
}

export default NewFarm
