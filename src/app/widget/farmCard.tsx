import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { utils } from '@senswap/sen-js'

import { Button, Card, Col, Divider, Row, Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from 'app/shared/components/mint'
import IonIcon from 'shared/antd/ionicon'

import { AppState } from 'app/model'
import { useReward } from 'app/hooks/useReward'
import { useDebt } from 'app/hooks/useDebt'
import { useFarmRoi } from 'app/hooks/useFarmRoi'
import configs from 'app/configs'
import { numeric } from 'shared/util'
import useMintDecimals from 'app/shared/hooks/useMintDecimals'

const {
  manifest: { appId },
} = configs

const FarmCard = ({ farmAddress }: { farmAddress: string }) => {
  const reward = useReward(farmAddress)
  const farmData = useSelector((state: AppState) => state.farms[farmAddress])
  const history = useHistory()
  const locationSearch = useLocation().search
  const { data } = useDebt(farmAddress)
  const { apr } = useFarmRoi(farmAddress)
  const lptDecimal = useMintDecimals(farmData.mint_stake)

  const query = useMemo(
    () => new URLSearchParams(locationSearch),
    [locationSearch],
  )

  const handleDetail = useCallback(() => {
    query.set('farmAddress', farmAddress)
    history.push(`/app/${appId}?` + query.toString())
  }, [farmAddress, history, query])

  let amountLptShared = '0'
  if (data) {
    amountLptShared = utils.undecimalize(data.shares, lptDecimal)
  }

  return (
    <Card bordered={false} className="farm-card-widget">
      <Row>
        <Col span={24}>
          <Row align="middle" gutter={[12, 12]}>
            <Col flex="auto">
              <Space>
                <MintAvatar mintAddress={farmData.mint_stake} />
                <MintSymbol mintAddress={farmData.mint_stake} />
              </Space>
            </Col>

            <Col>
              <Button
                onClick={handleDetail}
                type="text"
                icon={<IonIcon name="open-outline" />}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Divider style={{ margin: '12px 0' }} />
        </Col>
        <Col span={24}>
          <Row gutter={[6, 6]}>
            <Col flex="auto">
              <Space>
                <MintAvatar mintAddress={farmData.mint_reward} />
                <Typography.Text type="secondary">Reward</Typography.Text>
              </Space>
            </Col>
            <Col>
              <Space>
                <Typography.Text>
                  {numeric(reward).format('0,0.00[00]')}
                </Typography.Text>
                <MintSymbol mintAddress={farmData.mint_reward} />
              </Space>
            </Col>
            <Col span={24}>
              <Row>
                <Col flex="auto">
                  <Typography.Text type="secondary">APR</Typography.Text>
                </Col>
                <Col>
                  <Space>
                    <Typography.Text>
                      {numeric(apr).format('0,0.[00]%')}
                    </Typography.Text>
                  </Space>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row>
                <Col flex="auto">
                  <Typography.Text type="secondary">
                    Your stacked LPT
                  </Typography.Text>
                </Col>
                <Col>
                  <Space>
                    <Typography.Text>
                      {numeric(amountLptShared).format('0,0.00[00]')}
                    </Typography.Text>
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default FarmCard
