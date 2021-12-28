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
          <ConfirmAddFarm mintAddress={''} onNext={setStepNewFarm} />
        )}
        {stepNewFarm === 3 && (
          <MintSelection onChange={() => {}} onNext={setStepNewFarm} />
        )}
      </Modal>
    </Row>
  )
}

export default NewFarm
