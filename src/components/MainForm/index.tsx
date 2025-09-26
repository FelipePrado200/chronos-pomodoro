import style from './style.module.css';
import { PlayCircleIcon , StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultInput } from '../DefaultInput';
import { DefaultButton } from '../DefaultButton';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../Contexts/TaskContext/useTaskConext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';    
import { TaskActionsTypes } from '../../Contexts/TaskContext/taskActions';
import { Tips } from '../Tips';
import { showMessage } from '../../adapters/showMessage';



export function MainForm() {
    const {state, dispatch} = useTaskContext();
    const taskNameInput = useRef<HTMLInputElement>(null);
    const lastTaskName = state.task[state.task.length -1 ]?.name || ''


    // ciclos
    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle)



    function handleCreateNewTask(e: React.FormEvent){
        e.preventDefault()        
        showMessage.dismiss()

        if (taskNameInput.current === null) return;

        const taskName = taskNameInput.current.value.trim(); // trim é pra remover espaços em branco no começo e no fim

        if(!taskName){
            showMessage.warn('Digite o nome da tarefa')
            return;
        }

        const newTask: TaskModel = {
            id: Date.now().toString(),
            name: taskName,
            startDate: Date.now(),
            completeDate: null,
            interrupDate: null,
            durations: state.config[nextCycleType] ,
            type: nextCycleType,
        }
        
        dispatch({type: TaskActionsTypes.START_TASK, payload: newTask})
        showMessage.sucess('Tarefa iniciada')
        
    }

    function handleInterruptTask(){
        showMessage.dismiss()
        showMessage.error('Tarefa interrompida')
        dispatch({type: TaskActionsTypes.INTERRUPT_TASK})

    }


    return(
        <div className={style.containerForm}>
            <form onSubmit={handleCreateNewTask} className='form' action="" >
                <div className='formRow'>
                    <DefaultInput  
                    labelText='Cicle'
                    id='meuInput'
                    type='text'
                    placeholder='Digite algo'
                    ref={taskNameInput}
                    disabled={!!state.activeTask}
                    defaultValue={lastTaskName}
                    />
                </div>
                <div className='formLinha'>
                    <Tips/>
                </div>

                {state.currentCycle > 0 &&(
                    <div className='formRow'>
                        <Cycles/>
                    </div>                    
                )}
                                
                <div className='formRow'>
                {!state.activeTask && (
                    <DefaultButton 
                    aria-label='iniciar tarefa'
                    title='Iniciar tarefa'
                    type='submit'
                    icon={<PlayCircleIcon/>}
                    key={"botão submit"}/> 
                    
                )} 
                {!!state.activeTask &&(
                    <DefaultButton
                    aria-label='interromper tarefa'
                    title='interromper tarefa'
                    type='button'
                    icon={<StopCircleIcon/>}
                    color='red'
                    onClick={handleInterruptTask}
                    key={"botão interromper"} 
                    />
                )}
                </div>
            </form>
        
        </div>

    )

}