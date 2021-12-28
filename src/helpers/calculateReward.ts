import { DebtData, FarmData, utils } from '@senswap/sen-js'

const calculateReward = (debt: DebtData, farm: FarmData) => {
  if (debt === null || Object.keys(debt).length === 0) return 0
  if (farm === null || Object.keys(farm).length === 0) return 0
  if (!farm.total_shares) return 0

  const shares = debt.shares
  const compensation = farm.compensation
  const delay =
    (global.BigInt(Math.floor(Date.now() / 1000)) - farm.genesis_timestamp) /
    farm.period
  const precision = global.BigInt(10 ** 18)
  const rewardsPerShare = (precision * farm.reward) / farm.total_shares
  const newDebt =
    ((rewardsPerShare * delay + compensation) * shares) / precision
  const yieldFarm = utils.undecimalize(newDebt - debt.debt, 9)
  return Number(yieldFarm)
}

export default calculateReward
