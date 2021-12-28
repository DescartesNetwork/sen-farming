import { utils, DebtData, FarmData } from '@senswap/sen-js'

const calculateReward = (debt: DebtData, farm: FarmData): number => {
  if (debt === null || Object.keys(debt).length === 0) return 0
  if (farm === null || Object.keys(farm).length === 0) return 0
  const p =
    Number(utils.undecimalize(farm.reward, 9)) /
    Number(utils.undecimalize(farm.total_shares, 9))
  const t =
    (Date.now() / 1000 - Number(farm.genesis_timestamp)) / Number(farm.period)
  const D = Number(utils.undecimalize(farm.compensation, 18)) // fixed

  const r_i = Number(utils.undecimalize(debt.shares, 9))
  const d_i = Number(utils.undecimalize(debt.debt, 9))

  const reward = p * Math.floor(t) * r_i - d_i + D * r_i

  return Number(Number(reward).toFixed(8))
}

export default calculateReward
