import { Provider } from 'react-redux'
import {
  WalletProvider,
  UIProvider,
  MintProvider,
  AccountProvider,
} from '@sentre/senhub'

import View from 'view'

import model from 'model'
import configs from 'configs'
import './static/styles/index.less'
import './static/styles/dark.less'
import './static/styles/light.less'

import 'static/styles/index.less'

const {
  manifest: { appId },
} = configs

export const Page = () => {
  return (
    <UIProvider appId={appId} antd>
      <MintProvider>
        <AccountProvider>
          <WalletProvider>
            <Provider store={model}>
              <View />
            </Provider>
          </WalletProvider>
        </AccountProvider>
      </MintProvider>
    </UIProvider>
  )
}

export * from 'static.app'
