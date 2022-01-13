import { Provider } from 'react-redux'
import {
  WalletProvider,
  UIProvider,
  PoolProvider,
  MintProvider,
  AccountProvider,
} from '@senhub/providers'

import PageView from 'app/page'
import WidgetView from 'app/widget'

import model from 'app/model'
import configs from 'app/configs'
import './static/styles/index.less'
import './static/styles/dark.less'
import './static/styles/light.less'

import 'app/static/styles/index.less'

const {
  manifest: { appId },
} = configs

export const Page = () => {
  return (
    <UIProvider appId={appId} antd>
      <PoolProvider>
        <MintProvider>
          <AccountProvider>
            <WalletProvider>
              <Provider store={model}>
                <PageView />
              </Provider>
            </WalletProvider>
          </AccountProvider>
        </MintProvider>
      </PoolProvider>
    </UIProvider>
  )
}

export const widgetConfig: WidgetConfig = {
  size: 'small',
  type: 'solid',
}

export const Widget = () => {
  return (
    <UIProvider appId={appId} antd>
      <PoolProvider>
        <MintProvider>
          <AccountProvider>
            <WalletProvider>
              <Provider store={model}>
                <WidgetView />
              </Provider>
            </WalletProvider>
          </AccountProvider>
        </MintProvider>
      </PoolProvider>
    </UIProvider>
  )
}
