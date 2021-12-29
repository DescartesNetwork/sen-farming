import LazyLoad from '@senswap/react-lazyload'

import { Col, Row, Typography } from 'antd'

import { useMintSelection } from 'app/hooks/useMintSelection'
import AccountCard from './accountCard'
import SearchAccount from './searchAccount'

const MintSelection = ({
  onChange,
  onHideInputModal = () => {},
}: {
  onChange: (value: string) => void
  onHideInputModal?: (visible: boolean) => void
}) => {
  const { searchedResult, accountAddresses, onSearch } = useMintSelection()
  const onClick = (mintAddress: string) => {
    onHideInputModal(false)
    return onChange(mintAddress)
  }

  return (
    <Row gutter={[16, 16]} style={{ height: 400, overflow: 'auto' }}>
      <Col span={24}>
        <Typography.Title level={4}>Select token type</Typography.Title>
      </Col>
      <Col span={24}>
        <SearchAccount onChange={onSearch} />
      </Col>
      {(searchedResult || accountAddresses).map((accountAddress, i) => (
        <Col span={24} key={accountAddress + i}>
          <LazyLoad height={84} overflow>
            <AccountCard accountAddress={accountAddress} onClick={onClick} />
          </LazyLoad>
        </Col>
      ))}
    </Row>
  )
}

export default MintSelection
