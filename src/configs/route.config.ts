import { Env } from '@sentre/senhub'

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
