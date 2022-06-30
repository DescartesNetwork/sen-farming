import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { utils } from '@senswap/sen-js'
import { useMint, usePool } from '@sentre/senhub'

import { Row, Col, Typography, Space } from 'antd'
import Title from './title'
import Address from './address'

import { util } from '@sentre/senhub'
import { AppState } from 'model'
import { useBudget } from 'hooks/useBudget'
import useMintDecimals from 'shared/hooks/useMintDecimals'

const DEFAULT_TOKEN_SYMBOL = 'TOKEN'

const FarmInfo = ({ farmAddress }: { farmAddress: string }) => {
  const { tokenProvider } = useMint()
  const { pools } = usePool()
  const { budget, budgetSymbol } = useBudget(farmAddress)
  const farms = useSelector((state: AppState) => state.farms)
  const [copieAddress, setCopieAddress] = useState('')

  const [mintSymbol, setMintSymbol] = useState('')

  const { mint_stake, period, reward, mint_reward } = farms[farmAddress] || {}

  const farmDecimal = useMintDecimals(mint_stake)

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
    await util.asyncWait(1500)
    await setCopieAddress('')
  }

  const farmReward = useMemo(() => {
    if (!farmDecimal) return 0
    return utils.undecimalize(reward, farmDecimal)
  }, [farmDecimal, reward])

  const formatPeriod = useMemo(() => {
    const numPeriod = Number(period)
    let time = numPeriod / 86400
    let formatTime = 'days'
    if (time > 29) {
      time = time / 30
      formatTime = time > 1 ? 'months' : 'month'
    }
    if (time < 2) {
      time = time * 24
      formatTime = time > 1 ? 'hours' : 'hour'
    }
    return `${farmReward} ${budgetSymbol} / ${Math.floor(time)} ${formatTime}`
  }, [farmReward, period, budgetSymbol])

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
          <Typography.Text style={{ wordBreak: 'break-all' }}>
            {formatPeriod}
          </Typography.Text>
        </Space>
      </Col>
      <Col span={24}>
        <Space align="baseline">
          <Title title="Budget:" />
          <Typography.Text style={{ wordBreak: 'break-all' }}>
            {util.numeric(budget).format('0,0.[00]')}
          </Typography.Text>
          <Typography.Text type="secondary">{mintSymbol}</Typography.Text>
        </Space>
      </Col>
    </Row>
  )
}

export default FarmInfo
