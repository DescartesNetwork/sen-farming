import { Fragment } from 'react'

import DebtWatcher from './debtWatcher'
import FarmWatcher from './farmWatcher'

const FarmWatch = () => {
  return (
    <Fragment>
      <DebtWatcher />
      <FarmWatcher />
    </Fragment>
  )
}

export default FarmWatch
