import { Net, rpc } from '@sentre/senhub'
import { Farming } from '@senswap/sen-js'

/**
 * Contructor
 */
type Conf = {
  spltAddress: string
  splataAddress: string
  farmingAddress: string
  senAddress: string
  farming: Farming
  senOwners: string[]
}

const conf: Record<Net, Conf> = {
  /**
   * Development configurations
   */
  devnet: {
    spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
    senAddress: '5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ',
    farmingAddress: 'CpEsjrLhBkcuApn5uEE2tZCwxyCQKmT6S4YgT9zuLW2J',
    get farming() {
      return new Farming(
        this.farmingAddress,
        this.spltAddress,
        this.splataAddress,
        rpc,
      )
    },
    senOwners: ['GJLqpmDxxrV9xruee2vFvEoTho7VVQHRtuHH8nfoAE54'],
  },

  /**
   * Staging configurations
   */
  testnet: {
    spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
    senAddress: '5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ',
    farmingAddress: 'CpEsjrLhBkcuApn5uEE2tZCwxyCQKmT6S4YgT9zuLW2J',
    get farming() {
      return new Farming(
        this.farmingAddress,
        this.spltAddress,
        this.splataAddress,
        rpc,
      )
    },
    senOwners: ['GJLqpmDxxrV9xruee2vFvEoTho7VVQHRtuHH8nfoAE54'],
  },

  /**
   * Production configurations
   */
  mainnet: {
    spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
    senAddress: 'SENBBKVCM7homnf5RX9zqpf1GFe935hnbU4uVzY1Y6M',
    farmingAddress: 'DTvdh6Q13SfYxMoWyibBUmQAUqd2pDPSpjdku5a9NLSF',
    get farming() {
      return new Farming(
        this.farmingAddress,
        this.spltAddress,
        this.splataAddress,
        rpc,
      )
    },
    senOwners: ['Cs6jYywHTAgdvjxn8xG4VkJJH8DXXy7zbtatzMUWoCMG'],
  },
}

/**
 * Module exports
 */
export default conf
