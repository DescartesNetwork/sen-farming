import { useSelector } from 'react-redux'

import { Button, Card, Col, Divider, Row, Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from 'app/shared/components/mint'
import IonIcon from 'shared/antd/ionicon'

import { AppState } from 'app/model'
import util from 'helpers/util'
import { useReward } from 'app/hooks/useReward'
import { useDebt } from 'app/hooks/useDebt'
import { utils } from '@senswap/sen-js'
import { LPT_DECIMALS } from 'app/configs/farmstat.config'

const FarmCard = ({ farmAddress }: { farmAddress: string }) => {
  const reward = useReward(farmAddress)
  const farmData = useSelector((state: AppState) => state.farms[farmAddress])
  const { data } = useDebt(farmAddress)

  let amountLptShared = '0'
  if (data) {
    amountLptShared = utils.undecimalize(data.shares, LPT_DECIMALS)
  }

  return (
    <Card bordered={false} className="farm-card">
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
              <Button type="text" icon={<IonIcon name="open-outline" />} />
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
                  {util.Numberic(reward).format('0,0.00[00]')}
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
                    <Typography.Text>0 SEN</Typography.Text>
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
                      {util.Numberic(amountLptShared).format('0,0.00[00]')}
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
