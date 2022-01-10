import { Env } from 'shared/runtime'

/**
 * Contructor
 */
type Config = {
  farmRoute: string
}

const config: Record<Env, Config> = {
  /**
   * Development configurations
   */
  development: {
    farmRoute: '/app/senhub',
  },

  /**
   * Staging configurations
   */
  staging: {
    farmRoute: '/app/sen_farming',
  },

  /**
   * Production configurations
   */
  production: {
    farmRoute: '/app/sen_farming',
  },
}

/**
 * Module exports
 */
export default config
