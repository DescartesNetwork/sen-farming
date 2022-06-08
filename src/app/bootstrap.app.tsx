import { Provider } from 'react-redux'
import {
  WalletProvider,
  UIProvider,
  PoolProvider,
  MintProvider,
  AccountProvider,
} from '@senhub/providers'

import View from 'app/view'

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
                <View />
              </Provider>
            </WalletProvider>
          </AccountProvider>
        </MintProvider>
      </PoolProvider>
    </UIProvider>
  )
}

export * from 'app/static.app'
