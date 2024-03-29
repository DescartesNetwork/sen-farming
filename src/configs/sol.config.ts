import { Swap } from '@senswap/sen-js'
import { Net, rpc } from '@sentre/senhub'
import Farming from 'helper/farming'

/**
 * Contructor
 */
type Conf = {
  taxmanAddress: string
  spltAddress: string
  splataAddress: string
  swapAddress: string
  farmingAddress: string
  senAddress: string
  farming: Farming
  swap: Swap
  senOwners: string[]
}

const conf: Record<Net, Conf> = {
  /**
   * Development configurations
   */
  devnet: {
    taxmanAddress: '8UaZw2jDhJzv5V53569JbCd3bD4BnyCfBH3sjwgajGS9',
    spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
    swapAddress: '4erFSLP7oBFSVC1t35jdxmbfxEhYCKfoM6XdG2BLR3UF',
    senAddress: '5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ',
    farmingAddress: 'CpEsjrLhBkcuApn5uEE2tZCwxyCQKmT6S4YgT9zuLW2J',
    get swap() {
      return new Swap(
        this.swapAddress,
        this.spltAddress,
        this.splataAddress,
        rpc,
      )
    },
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
    taxmanAddress: '',
    spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
    swapAddress: '',
    senAddress: '5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ',
    farmingAddress: 'CpEsjrLhBkcuApn5uEE2tZCwxyCQKmT6S4YgT9zuLW2J',
    get swap() {
      return new Swap(
        this.swapAddress,
        this.spltAddress,
        this.splataAddress,
        rpc,
      )
    },
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
    taxmanAddress: '9doo2HZQEmh2NgfT3Yx12M89aoBheycYqH1eaR5gKb3e',
    spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
    swapAddress: 'SSW7ooZ1EbEognq5GosbygA3uWW1Hq1NsFq6TsftCFV',
    senAddress: 'SENBBKVCM7homnf5RX9zqpf1GFe935hnbU4uVzY1Y6M',
    farmingAddress: 'DTvdh6Q13SfYxMoWyibBUmQAUqd2pDPSpjdku5a9NLSF',
    get swap() {
      return new Swap(
        this.swapAddress,
        this.spltAddress,
        this.splataAddress,
        rpc,
      )
    },
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
