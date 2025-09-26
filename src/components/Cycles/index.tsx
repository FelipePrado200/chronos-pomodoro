import { useTaskContext } from '../../Contexts/TaskContext/useTaskConext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import styles from './styles.module.css';
export function Cycles() {
  const {state} = useTaskContext();

  const cyclesState = Array.from({length: state.currentCycle})

  const cycleDescriptionMap = {
    workTime: 'pausa longa',
    shortBreakTime: 'descanso curto',
    longBreakTime: 'descanso longo',
  }
  return (
    <div className={styles.cycles}>       
      <span>Ciclos:</span>
      <div className={styles.cyclesDots}>
        {/* <span className={`${styles.cyclesDot} ${styles.workTime}`}></span> */}
        {cyclesState.map((_, index) => {
          const nextCycle = getNextCycle(index)
          const nextCycleType = getNextCycleType(nextCycle)
          return <span 
          key={`${nextCycleType}_${nextCycle}`}
          className={`${styles.cyclesDot} ${styles[nextCycleType]}`}
          aria-label={`indicador de ciclo de foco ${cycleDescriptionMap[nextCycleType]}`}
          title={`indicador de ciclo de foco ${cycleDescriptionMap[nextCycleType]}`}
          >
          </span>
        })}
        </div>
    </div>
  );
}
