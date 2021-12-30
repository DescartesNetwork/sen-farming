import { useState } from 'react'

import { Button, Col, Modal, Row } from 'antd'
import IonIcon from 'shared/antd/ionicon'
// import StepAddFarm from './stepAddFarm'
import ConfirmAddFarm from './confirmAddFarm'
import MintSelection from './mintSelection'

import { NewFarmStep } from 'app/constants/farms'
import { SizeType } from 'antd/lib/config-provider/SizeContext'

const NewFarm = ({ size = 'small' }: { size?: SizeType }) => {
  const [visible, setVisible] = useState(false)
  // const [stepNewFarm, setStepNewFarm] =
  useState<NewFarmStep>('POLICY_AGREEMENT')
  const [mintAddress, setMintAddress] = useState('')
  const [visibleInputTokenModal, setVisibleInputTokenModal] = useState(false)

  const onClose = () => {
    setVisible(false)
    // setStepNewFarm('POLICY_AGREEMENT')
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
        {/* {stepNewFarm === 'POLICY_AGREEMENT' && (
          <StepAddFarm setFarmCreatingStep={setStepNewFarm} />
        )}
        {stepNewFarm === 'FARM_CREATING_CONFIRMATION' && (
          <ConfirmAddFarm
            mintAddress={mintAddress}
            onClose={onClose}
            setVisibleInputTokenModal={setVisibleInputTokenModal}
          />
        )} */}
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
