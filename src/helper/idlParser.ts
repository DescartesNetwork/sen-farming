import { AnchorProvider, Program } from '@project-serum/anchor'
import { DebtData, FarmData } from '@senswap/sen-js'
import { sha256 } from 'js-sha256'
import camelcase from 'camelcase'
import { Connection } from '@solana/web3.js'
import { rpc } from '@sentre/senhub'

import configs from 'configs'
import SafeWallet from './safeWallet'
/**
 * Number of bytes of the account discriminator.
 */
export const ACCOUNT_DISCRIMINATOR_SIZE = 8

/**
 * Calculates and returns a unique 8 byte discriminator prepended to all anchor accounts.
 *
 * @param name The name of the account to calculate the discriminator.
 */
const accountDiscriminator = (name: string): Buffer => {
  return Buffer.from(
    sha256.digest(`account:${camelcase(name, { pascalCase: true })}`),
  ).slice(0, ACCOUNT_DISCRIMINATOR_SIZE)
}

type IDL = {
  version: '0.1.0'
  name: 'sen_utility'
  instructions: []
  accounts: [
    {
      name: 'farm'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'owner'
            type: 'publicKey'
          },
          {
            name: 'state'
            type: 'u8'
          },
          {
            name: 'mintStake'
            type: 'publicKey'
          },
          {
            name: 'treasuryStake'
            type: 'publicKey'
          },
          {
            name: 'mintReward'
            type: 'publicKey'
          },
          {
            name: 'treasuryReward'
            type: 'publicKey'
          },
          {
            name: 'genesisTimestamp'
            type: 'i64'
          },
          {
            name: 'totalShares'
            type: 'u64'
          },
          {
            name: 'reward'
            type: 'u64'
          },
          {
            name: 'period'
            type: 'u64'
          },
          {
            name: 'compensation'
            type: 'i128'
          },
        ]
      }
    },
    {
      name: 'debt'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'farm'
            type: 'publicKey'
          },
          { name: 'owner'; type: 'publicKey' },
          { name: 'shares'; type: 'u64' },
          { name: 'debt'; type: 'u128' },
          { name: 'isInitialized'; type: 'bool' },
        ]
      }
    },
  ]
  events: []
  errors: []
}

const farmingIdl: IDL = {
  version: '0.1.0',
  name: 'sen_utility',
  instructions: [],
  accounts: [
    {
      name: 'farm',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'owner',
            type: 'publicKey',
          },
          {
            name: 'state',
            type: 'u8',
          },
          {
            name: 'mintStake',
            type: 'publicKey',
          },
          {
            name: 'treasuryStake',
            type: 'publicKey',
          },
          {
            name: 'mintReward',
            type: 'publicKey',
          },
          {
            name: 'treasuryReward',
            type: 'publicKey',
          },
          {
            name: 'genesisTimestamp',
            type: 'i64',
          },
          {
            name: 'totalShares',
            type: 'u64',
          },
          {
            name: 'reward',
            type: 'u64',
          },
          {
            name: 'period',
            type: 'u64',
          },
          {
            name: 'compensation',
            type: 'i128',
          },
        ],
      },
    },
    {
      name: 'debt',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'farm',
            type: 'publicKey',
          },
          { name: 'owner', type: 'publicKey' },
          { name: 'shares', type: 'u64' },
          { name: 'debt', type: 'u128' },
          { name: 'isInitialized', type: 'bool' },
        ],
      },
    },
  ],
  events: [],
  errors: [],
}

const getRawProgram = () => {
  const connection = new Connection(rpc)
  const wallet = new SafeWallet()
  const provider = new AnchorProvider(connection, wallet, {
    commitment: 'confirmed',
  })
  return new Program(farmingIdl, configs.sol.farmingAddress, provider)
}

export const parseFarmData = (buf: Buffer): FarmData => {
  let discriminator = accountDiscriminator('farm')
  const program = getRawProgram()
  const farmData = program.coder.accounts.decode(
    'farm',
    Buffer.concat([discriminator, buf]),
  )
  return {
    compensation: BigInt(farmData.compensation.toString()),
    genesis_timestamp: BigInt(farmData.genesisTimestamp.toString()),
    mint_reward: farmData.mintReward.toString(),
    mint_stake: farmData.mintStake.toString(),
    owner: farmData.owner.toString(),
    period: BigInt(farmData.period.toString()),
    reward: BigInt(farmData.reward.toString()),
    state: farmData.state,
    total_shares: BigInt(farmData.totalShares.toString()),
    treasury_reward: farmData.treasuryReward.toString(),
    treasury_stake: farmData.treasuryStake.toString(),
  }
}

export const parseDebtData = (buf: Buffer): DebtData => {
  let discriminator = accountDiscriminator('debt')
  const program = getRawProgram()
  const debtData = program.coder.accounts.decode(
    'debt',
    Buffer.concat([discriminator, buf]),
  )
  return {
    farm: debtData.farm.toString(),
    owner: debtData.owner.toString(),
    shares: BigInt(debtData.shares.toString()),
    debt: BigInt(debtData.debt.toString()),
    is_initialized: debtData.isInitialized,
  }
}
