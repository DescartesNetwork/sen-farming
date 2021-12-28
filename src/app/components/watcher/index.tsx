import DebtWatcher from './debtWatcher'
import FarmWatcher from './farmWatcher'

const FarmWatch = ({ children }: { children: JSX.Element }) => {
  return (
    <FarmWatcher>
      <DebtWatcher>{children}</DebtWatcher>
    </FarmWatcher>
  )
}

export default FarmWatch
