import { Col, Row, Typography } from 'antd'
import LazyLoad from '@senswap/react-lazyload'
import AccountCard from './accountCard'
import SearchAccount from './searchAccount'

import { useMintSelection } from 'app/hooks/useMintSelection'

const MintSelection = ({
  onChange,
  onHideInputTokenModal = () => {},
}: {
  onChange: (value: string) => void
  onHideInputTokenModal?: (visible: boolean) => void
}) => {
  const { searchedAccount, accountAddresses, onSearch } = useMintSelection()

  const onClick = (mintAddress: string) => {
    onHideInputTokenModal(false)
    return onChange(mintAddress)
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Typography.Title level={4}>Select token type</Typography.Title>
      </Col>
      <Col span={24}>
        <SearchAccount onChange={onSearch} />
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]} style={{ height: 300, overflow: 'auto' }}>
          {(searchedAccount || accountAddresses).map((accountAddress, i) => (
            <Col span={24} key={accountAddress + i}>
              <LazyLoad height={72} overflow>
                <AccountCard
                  accountAddress={accountAddress}
                  onClick={onClick}
                />
              </LazyLoad>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default MintSelection
