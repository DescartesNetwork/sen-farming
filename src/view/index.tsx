import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { useAppRoute } from '@sentre/senhub'

import { Row, Col, Button, Card, Input, Alert, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import Banner from './banner'
import FarmingDetails from './farmingDetails'
import Watcher from 'components/watcher'

import configs from 'configs'
import { AppDispatch, AppState } from 'model'
import { setSearch } from 'model/main.controller'

const {
  route: { farmRoute },
} = configs

const View = () => {
  const { search: locationSearch, pathname } = useLocation()
  const { search } = useSelector((state: AppState) => state.main)
  const dispatch = useDispatch<AppDispatch>()
  const history = useHistory()
  const { to } = useAppRoute()

  const handleOnChange = (e: any) => {
    const searchParams = new URLSearchParams(locationSearch).get('search')
    if (searchParams) history.push(pathname)
    return dispatch(setSearch({ search: e.target.value }))
  }

  const clearSearch = () => {
    dispatch(setSearch({ search: '' }))
    return history.push(farmRoute)
  }

  return (
    <Watcher>
      <Row gutter={[24, 24]} style={{ paddingBottom: 12 }} justify="center">
        <Col xs={24} lg={18}>
          <Alert
            type="info"
            message={
              <Typography.Title level={5}>
                Sen Farming V2 is launched ✅ Explorer Now ✨
              </Typography.Title>
            }
            description={
              <Typography.Text type="secondary">
                Sentre's farms now are active on the{' '}
                <strong>Sen Farming v2</strong> with more advantages and juicy
                APY. <strong>Click here to jump to Sen Farming V2!</strong>
              </Typography.Text>
            }
            onClick={() =>
              to('/app/sen_farming_v2?autoInstall=true', {
                absolutePath: true,
                newWindow: true,
              })
            }
            style={{ cursor: 'pointer' }}
            showIcon
          />
        </Col>
        <Col xs={24} lg={18}>
          <Banner />
        </Col>
        <Col xs={24} lg={18}>
          <Row gutter={[8, 8]}>
            <Col xs={24} lg={8}>
              <Card
                bodyStyle={{ padding: 0 }}
                style={{
                  borderRadius: 8,
                  background: 'transparent',
                  boxShadow: 'unset',
                }}
              >
                <Input
                  placeholder="Search by name, address"
                  value={search}
                  onChange={handleOnChange}
                  prefix={
                    search ? (
                      <Button
                        type="text"
                        style={{
                          width: 'auto',
                          height: 'auto',
                          background: 'transparent',
                        }}
                        onClick={clearSearch}
                        icon={<IonIcon name="close-outline" />}
                      />
                    ) : (
                      <IonIcon name="search-outline" />
                    )
                  }
                  bordered={false}
                  size="large"
                />
              </Card>
            </Col>
            <Col span={24}>
              <FarmingDetails />
            </Col>
          </Row>
        </Col>
      </Row>
    </Watcher>
  )
}

export default View
