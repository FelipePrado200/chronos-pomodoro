import {  useEffect , useReducer, useRef } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./taskContext";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/timerWorkerManager";
import { TaskActionsTypes } from "./taskActions";
import { loadBeep } from "../../utils/loadBeep";
import type { TaskStateModel } from "../../models/TaskStateModel";
type TaskContextProviderProps = {
  children: React.ReactNode;
}

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer,initialTaskState, () => {
      
      const storageState = localStorage.getItem('state') ;
      
      if (storageState === null)  return initialTaskState

      const parsedStorageState = JSON.parse(storageState) as TaskStateModel;
      
      return {
          ...parsedStorageState,
          activeTask: null,
          currentCycle: 0,
          secondsRemaining: 0,
          formatedSecondsRemaining: '00:00'
      }

      
  });


  const worker = TimerWorkerManager.getInstance()
  let playBeepRef = useRef<ReturnType<typeof loadBeep> | null >(null);
  

  worker.onmessage(e => {
    const countDownSeconds = e.data

    if(countDownSeconds <= 0){
      if(playBeepRef.current){
        playBeepRef.current();
        playBeepRef.current = null ;
      };
      dispatch({
        type: TaskActionsTypes.COMPLET_TASK,
        })
    }else{
      dispatch({
        type: TaskActionsTypes.COUNT_DOWN,
        payload : {secondsRemaining : countDownSeconds}
        })
    }
  })

  useEffect(() => {
    //estado mudou
    localStorage.setItem('state' , JSON.stringify(state))

    if(!state.activeTask){
        worker.terminate()
    }
    //alterando titulo da page
    document.title = `${state.formatedSecondsRemaining} - Chronos Pomodoro`

    worker.postMessage(state)
  } , [worker , state]);

  useEffect(() => {
    if(state.activeTask && playBeepRef.current === null){
      playBeepRef.current = loadBeep()
    }else{
      playBeepRef.current = null;
    }
  } , [state.activeTask])
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
