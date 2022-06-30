import { CSSProperties } from 'react'
import DebtWatcher from './debtWatcher'
import FarmWatcher from './farmWatcher'

const Watcher = ({
  children,
  style,
}: {
  children: JSX.Element
  style?: CSSProperties
}) => {
  return (
    <FarmWatcher style={style}>
      <DebtWatcher>{children}</DebtWatcher>
    </FarmWatcher>
  )
}

export default Watcher
