import type { TaskModel } from "../../models/TaskModel"
import type { TaskStateModel } from "../../models/TaskStateModel";

export const TaskActionsTypes = {
  START_TASK: 'START_TASK',
  INTERRUPT_TASK: 'INTERRUPT_TASK',
  RESET_STATE   : 'RESET_STATE',
  COUNT_DOWN: 'COUNT_DOWN',
  COMPLET_TASK: 'COMPLET_TASK',
  CHANGE_SETTINGS: 'CHANGE_SETTINGS'

} as const;

export type TaskActionsWithPlayLoad = 
{
    type: typeof TaskActionsTypes.START_TASK;
    payload: TaskModel; // payload é opcional, pois nem toda ação precisa dele
} 
|{
    type: typeof TaskActionsTypes.COUNT_DOWN;
    payload: {secondsRemaining : number}; // payload é opcional, pois nem toda ação precisa dele
} 
|{
    type: typeof TaskActionsTypes.CHANGE_SETTINGS;
    payload: TaskStateModel['config']; // payload é opcional, pois nem toda ação precisa dele
} 
export type TaskAcontionsWithoutPayload = 
|{
  type: typeof TaskActionsTypes.RESET_STATE;
}
| {
    type: typeof TaskActionsTypes.INTERRUPT_TASK;
}| {
    type: typeof TaskActionsTypes.COMPLET_TASK;
}

 
export type TaskActionsModel = 
    | TaskActionsWithPlayLoad
    | TaskAcontionsWithoutPayload
