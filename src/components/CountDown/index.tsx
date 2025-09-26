import { useTaskContext } from '../../Contexts/TaskContext/useTaskConext';
import styles from './styles.module.css';


export function CountDown() {
  const {state} = useTaskContext()
  return (
    <div className={styles.container} >
        {state.formatedSecondsRemaining}
    </div>
  );
}

