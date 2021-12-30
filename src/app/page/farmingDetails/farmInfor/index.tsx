import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { utils } from '@senswap/sen-js'

import { Row, Col, Typography, Space } from 'antd'
import Title from './title'
import Address from './address'

import { asyncWait, numeric } from 'shared/util'
import { AppState } from 'app/model'
import { LPT_DECIMALS } from 'app/configs/farmstat.config'
import { useMint, usePool } from 'senhub/providers'
import { useBudget } from 'app/hooks/useBudget'

const DEFAULT_TOKEN_SYMBOL = 'TOKEN'

const FarmInfor = ({ farmAddress }: { farmAddress: string }) => {
  const { tokenProvider } = useMint()
  const { pools } = usePool()
  const { budget } = useBudget(farmAddress)
  const farms = useSelector((state: AppState) => state.farms)
  const [copieAddress, setCopieAddress] = useState('')

  const [mintSymbol, setMintSymbol] = useState('')

  const { mint_stake, period, reward, mint_reward } = farms[farmAddress] || {}

  useEffect(() => {
    ;(async () => {
      const { symbol } = (await tokenProvider.findByAddress(mint_reward)) || {}
      setMintSymbol(symbol || DEFAULT_TOKEN_SYMBOL)
    })()
  }, [mint_reward, tokenProvider])

  const poolAddress = Object.keys(pools).find((poolAddress) => {
    const { mint_lpt } = pools[poolAddress]
    return mint_lpt === mint_stake
  })

  const onCopy = async (copieAddress: string | undefined) => {
    if (!copieAddress) return
    await setCopieAddress(copieAddress)
    await asyncWait(1500)
    await setCopieAddress('')
  }

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Address
          title="Farming address:"
          address={farmAddress}
          onCopy={(address) => onCopy(address)}
          copieAddress={copieAddress}
        />
      </Col>
      <Col span={24}>
        <Address
          title={poolAddress ? 'Pool address:' : 'Stake mint address:'}
          address={poolAddress || mint_stake}
          onCopy={(address) => onCopy(address)}
          copieAddress={copieAddress}
          description
        />
      </Col>
      <Col span={24}>
        <Space align="baseline">
          <Title title="Rewarding:" />
          <Typography.Text>
            {numeric(utils.undecimalize(reward, LPT_DECIMALS)).format(
              '0,0.[00]',
            )}
          </Typography.Text>
          <Typography.Text type="secondary">{mintSymbol}</Typography.Text>
          <Typography.Text type="secondary">per</Typography.Text>
          <Typography.Text style={{ wordBreak: 'break-all' }}>
            {numeric(Number(period) / (60 * 60)).format('0.[0000]')} hours
          </Typography.Text>
        </Space>
      </Col>
      <Col span={24}>
        <Space align="baseline">
          <Title title="Budget:" />
          <Typography.Text style={{ wordBreak: 'break-all' }}>
            {numeric(budget).format('0,0.[00]')}
          </Typography.Text>
          <Typography.Text type="secondary">{mintSymbol}</Typography.Text>
        </Space>
      </Col>
    </Row>
  )
}

export default FarmInfor
