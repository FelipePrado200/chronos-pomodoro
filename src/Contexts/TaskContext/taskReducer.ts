import type { TaskStateModel } from "../../models/TaskStateModel";
import { formatSecondsToMinutes } from "../../utils/formatSecondsToMinutes";
import { getNextCycle } from "../../utils/getNextCycle";
import { initialTaskState } from "./initialTaskState";
import { TaskActionsTypes, type TaskActionsModel } from "./taskActions";

export function taskReducer(
    state: TaskStateModel, action: TaskActionsModel)
    : TaskStateModel{
    switch(action.type){
        case TaskActionsTypes.START_TASK:
  
        const newTask = action.payload;
        const nextCycle = getNextCycle(state.currentCycle);
        const secondsRemaining = newTask.durations * 60;

            return {
                ...state,
                activeTask: newTask,
                currentCycle: nextCycle,
                secondsRemaining: secondsRemaining,
                formatedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
                task: [...state.task, newTask]
            };
        case TaskActionsTypes.INTERRUPT_TASK: {

            return{
                ...state,
                activeTask: null,
                secondsRemaining : 0,
                formatedSecondsRemaining: '00:00',
                task: state.task.map(task => {
                    if(state.activeTask && state.activeTask.id === task.id){
                        return {...task, interrupDate: Date.now()}
                        }    
                        return task
                        })
            }
            }

        case TaskActionsTypes.COMPLET_TASK: {

            return{
                ...state,
                activeTask: null,
                secondsRemaining : 0,
                formatedSecondsRemaining: '00:00',
                task: state.task.map(task => {
                    if(state.activeTask && state.activeTask.id === task.id){
                        return {...task, completeDate: Date.now()}
                        }    
                        return task
                        })
            }
        }
        case TaskActionsTypes.RESET_STATE: {
            return {...initialTaskState};
        }        
        case TaskActionsTypes.COUNT_DOWN: {
            return{
                ...state,
                secondsRemaining: action.payload.secondsRemaining,
                formatedSecondsRemaining: formatSecondsToMinutes(action.payload.secondsRemaining)
            }
            
        }
        case TaskActionsTypes.CHANGE_SETTINGS: {
            return { ...state ,config: { ...action.payload }};
        }  
    }
    //sempre deve retornar o estado
    return state;
}