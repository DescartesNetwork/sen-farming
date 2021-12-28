import LazyLoad from '@senswap/react-lazyload'

import { Col, Row, Typography } from 'antd'
import AccountCard from './accountCard'
import SearchAccount from './searchAccount'

const MintSelection = ({
  onChange,
  onNext = () => {},
}: {
  onChange: (value: string) => void
  onNext?: (step: number) => void
}) => {
  const onSearch = () => {
    console.log('onsearch')
  }
  return (
    <Row gutter={[16, 16]} style={{ height: 400, overflow: 'auto' }}>
      <Col span={24}>
        <Typography.Title level={4}>Select token type</Typography.Title>
      </Col>
      <Col span={24}>
        <SearchAccount onChange={onSearch} />
      </Col>
      {[1, 2, 3, 4].map((accountAddress, i) => (
        <Col span={24} key={accountAddress + i}>
          <LazyLoad height={84} overflow>
            <AccountCard
              accountAddress={'accountAddress'}
              onClick={() => onNext(2)}
            />
          </LazyLoad>
        </Col>
      ))}
    </Row>
  )
}

export default MintSelection
