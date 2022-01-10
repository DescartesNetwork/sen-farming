import { env, net } from 'shared/runtime'
import manifest from './manifest.config'
import sol from './sol.config'
import route from './route.config'

const configs = {
  manifest: manifest[env],
  sol: sol[net],
  route: route[env],
}

/**
 * Module exports
 */
export default configs
