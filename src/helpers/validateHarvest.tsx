import { account, utils } from '@senswap/sen-js'

import calculateReward from './calculateReward'

import { FARMING_ERRORS } from 'app/constants/errors'
import store from 'app/model/index'
import configs from 'app/configs'

const {
  sol: { farming },
} = configs
export class HarvestValidator {
  private async checkSeedBalance(farmAddress: string) {
    const { splt, wallet } = window.sentre
    if (!wallet) throw new Error('Please connect wallet first!')
    const farmData = store.getState().farms[farmAddress]
    const walletAddress = await wallet.getAddress()
    if (!account.isAddress(walletAddress))
      throw new Error(FARMING_ERRORS.WALLET_ADDRESS_INVALID)
    const debtAddress = await farming.deriveDebtAddress(
      walletAddress,
      farmAddress,
    )
    if (!account.isAddress(debtAddress))
      throw new Error(FARMING_ERRORS.DEBT_ADDRESS_INVALID)

    const debtData = store.getState().debts[debtAddress]
    if (!debtData) throw new Error(FARMING_ERRORS.GET_DEBT_DATA)

    const reward = calculateReward(debtData, farmData)
    const { treasury_reward, treasury_stake, total_shares } = farmData
    let { amount: rewardBalance } = await splt.getAccountData(treasury_reward)

    if (treasury_reward === treasury_stake)
      rewardBalance = rewardBalance - total_shares
    const numRewardBalance = Number(utils.undecimalize(rewardBalance, 9))

    if (numRewardBalance < reward)
      throw new Error(FARMING_ERRORS.HARVEST_NOT_ENOUGH_BALANCE)
  }

  async validate(farmAddress: string) {
    if (!account.isAddress(farmAddress))
      throw new Error(FARMING_ERRORS.INVALID_FARM_ADDRESS)
    return await this.checkSeedBalance(farmAddress)
  }
}
