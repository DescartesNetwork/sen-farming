import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { Row, Col, Input, Card, Button } from 'antd'
import Banner from './banner'
import FarmingDetails from './farmingDetails'
import Watcher from 'app/components/watcher'
import IonIcon from 'shared/antd/ionicon'

import { AppDispatch, AppState } from 'app/model'
import { setSearch } from 'app/model/main.controller'

const Page = () => {
  const locationSearch = useLocation().search
  const { search } = useSelector((state: AppState) => state.main)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const searchParams = new URLSearchParams(locationSearch).get('search')
    if (!searchParams) return
    dispatch(setSearch({ search: searchParams }))
  }, [dispatch, locationSearch])

  return (
    <Watcher>
      <Row gutter={[24, 24]} style={{ paddingBottom: 12 }} justify="center">
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
                  onChange={(e) =>
                    dispatch(setSearch({ search: e.target.value }))
                  }
                  prefix={
                    search ? (
                      <Button
                        type="text"
                        style={{
                          width: 'auto',
                          height: 'auto',
                          background: 'transparent',
                        }}
                        onClick={() => dispatch(setSearch({ search: '' }))}
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

export default Page
