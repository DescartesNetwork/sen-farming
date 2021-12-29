import { CSSProperties, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Spin } from 'antd'

import { notifyError } from 'app/helper'
import { getFarms, upsetFarm } from 'app/model/farms.controller'
import configs from 'app/configs'

const {
  sol: { farming, senAddress },
} = configs

// Watch id
let watchId = 0

const FarmWatcher = ({
  children,
  style = {},
}: {
  children: JSX.Element
  style?: CSSProperties
}) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      await dispatch(getFarms())
    } catch (er) {
      await notifyError(er)
    } finally {
      setIsLoading(false)
    }
  }, [dispatch])

  const watchData = useCallback(async () => {
    if (watchId) return console.warn('Already watched')
    const filters = [
      { dataSize: 209 },
      { memcmp: { bytes: senAddress, offset: 97 } },
    ]
    watchId = farming.watch((er, re: any) => {
      if (er) return console.error(er)
      const { type, address, data } = re
      if (type !== 'farm') return
      return dispatch(upsetFarm({ address, data }))
    }, filters)
  }, [dispatch])

  useEffect(() => {
    fetchData()
    watchData()
    return () => {
      ;(async () => {
        try {
          farming.unwatch(watchId)
        } catch (er) {}
      })()
      watchId = 0
    }
  }, [fetchData, watchData])

  return (
    <Spin spinning={isLoading} style={style}>
      {children}
    </Spin>
  )
}

export default FarmWatcher
