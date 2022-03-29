import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { utils } from '@senswap/sen-js'
import { useWallet } from '@senhub/providers'

import { Row, Col, Card, Typography, Space, Button } from 'antd'
import IonIcon from 'shared/antd/ionicon'

import NumericInput from 'shared/antd/numericInput'
import { numeric } from 'shared/util'
import { AppState } from 'app/model'
import configs from 'app/configs'
import { notifyError, notifySuccess } from 'app/helper'
import useMintCgk from 'app/shared/hooks/useMintCgk'
import useMintDecimals from 'shared/hooks/useMintDecimals'

const {
  sol: { farming },
} = configs

const Unseed = ({
  farmAddress,
  onChange = () => {},
}: {
  farmAddress: string
  onChange?: (txId: string) => void
}) => {
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const farms = useSelector((state: AppState) => state.farms)
  const [value, setValue] = useState('')
  const [balance, setBalance] = useState('0')
  const [loading, setLoading] = useState(false)
  const { treasury_reward, mint_reward } = farms[farmAddress] || {}
  const decimal = useMintDecimals(mint_reward)
  const { symbol } = useMintCgk(mint_reward)

  useEffect(() => {
    ;(async () => {
      if (!decimal) return
      try {
        const { splt } = window.sentre
        const { amount } = await splt.getAccountData(treasury_reward)
        if (!amount) return setBalance('0')
        return setBalance(utils.undecimalize(amount, decimal))
      } catch (er) {
        setBalance('0')
      }
    })()
  }, [decimal, treasury_reward])

  const unseed = async () => {
    setLoading(true)
    const { wallet, splt } = window.sentre
    if (!wallet || !decimal) return
    const dstAddress = await splt.deriveAssociatedAddress(
      walletAddress,
      mint_reward,
    )
    const amount = utils.decimalize(value, decimal)
    try {
      const { txId } = await farming.unseed(
        amount,
        farmAddress,
        dstAddress,
        wallet,
      )
      onChange(txId)
      return notifySuccess('Unseed', txId)
    } catch (er) {
      return notifyError(er)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card
          style={{ boxShadow: 'unset', borderRadius: 8 }}
          bodyStyle={{ padding: 8 }}
        >
          <Row gutter={[0, 0]}>
            <Col span={24}>
              <Row
                gutter={[0, 0]}
                wrap={false}
                style={{ margin: `6px 12px 0px 12px`, fontSize: 12 }}
              >
                <Col flex="auto">
                  <Typography.Text type="secondary">Amount</Typography.Text>
                </Col>
                <Col>
                  <Space size={6}>
                    <Typography.Text type="secondary">
                      Available:
                    </Typography.Text>
                    <Typography.Text>
                      {numeric(balance).format('0,0.[00]')}
                    </Typography.Text>
                    <Typography.Text type="secondary">{symbol}</Typography.Text>
                  </Space>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <NumericInput
                placeholder="0"
                value={value}
                onValue={setValue}
                suffix={
                  <Button
                    type="text"
                    onClick={() => setValue(balance)}
                    size="small"
                    style={{ marginRight: -7 }}
                  >
                    MAX
                  </Button>
                }
                bordered={false}
                max={balance}
              />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Button
          type="primary"
          icon={<IonIcon name="remove-outline" />}
          onClick={unseed}
          block
          disabled={!value}
          loading={loading}
        >
          Unseed
        </Button>
      </Col>
    </Row>
  )
}

export default Unseed
