import type { TaskModel } from "./TaskModel";

// Estado -> Componente -> Filhos

export type TaskStateModel ={
    task: TaskModel[]; //importando types da taskModel
    secondsRemaining: number; // segundos da pagina
    formatedSecondsRemaining: string; // segundos zerados
    activeTask: TaskModel | null; // task ativa
    currentCycle: number; // vai de 1 a 8
    config: {
        workTime : number; // mainform
        shortBreakTime : number; // mainform
        longBreakTime : number; // mainform
    }
}