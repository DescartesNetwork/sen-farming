import { CSSProperties, Fragment } from 'react'
import DebtWatcher from './debtWatcher'
import FarmWatcher from './farmWatcher'
import PoolWatcher from './pool.watcher'

const Watcher = ({
  children,
  style,
}: {
  children: JSX.Element
  style?: CSSProperties
}) => {
  return (
    <Fragment>
      <FarmWatcher style={style}>
        <DebtWatcher>{children}</DebtWatcher>
      </FarmWatcher>
      <PoolWatcher />
    </Fragment>
  )
}

export default Watcher
