import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { utils } from '@senswap/sen-js'
import { useAccount, useWallet } from '@senhub/providers'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import NumericInput from 'shared/antd/numericInput'

import { numeric } from 'shared/util'
import { AppState } from 'app/model'
import configs from 'app/configs'
import { notifyError, notifySuccess } from 'app/helper'
import useMintDecimals from 'shared/hooks/useMintDecimals'

const {
  sol: { senAddress, farming },
} = configs

const Seed = ({
  farmAddress,
  onChange = () => {},
}: {
  farmAddress: string
  onChange?: (txId: string) => void
}) => {
  const { accounts } = useAccount()
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const farms = useSelector((state: AppState) => state.farms)
  const [value, setValue] = useState('')
  const [balance, setBalance] = useState('0')
  const [loading, setLoading] = useState(false)

  const { mint_reward } = farms?.[farmAddress] || {}
  const decimal = useMintDecimals(mint_reward)

  useEffect(() => {
    ;(async () => {
      if (!decimal) return
      try {
        const { splt } = window.sentre
        const srcAddress = await splt.deriveAssociatedAddress(
          walletAddress,
          mint_reward,
        )
        const { amount } = accounts[srcAddress] || {}
        if (!amount) return setBalance('0')
        return setBalance(utils.undecimalize(amount, decimal))
      } catch (er) {
        setBalance('0')
      }
    })()
  }, [walletAddress, accounts, mint_reward, decimal])

  const seed = async () => {
    setLoading(true)
    const { wallet, splt } = window.sentre
    if (!wallet) return
    const srcAddress = await splt.deriveAssociatedAddress(
      walletAddress,
      senAddress,
    )
    const amount = utils.decimalize(value, 9)
    try {
      const { txId } = await farming.seed(
        amount,
        farmAddress,
        srcAddress,
        wallet,
      )
      onChange(txId)
      return notifySuccess('Seed', txId)
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
                    <Typography.Text type="secondary">SNTR</Typography.Text>
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
          icon={<IonIcon name="add-outline" />}
          onClick={seed}
          block
          disabled={!value}
          loading={loading}
        >
          Seed
        </Button>
      </Col>
    </Row>
  )
}

export default Seed
