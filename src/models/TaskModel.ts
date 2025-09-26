export type TaskModel = {
    id:string,
    name:string,
    durations:number,
    startDate: number;
    completeDate:number| null; // quando timer chega no final
    interrupDate: number | null; // quando a task for interrompida
    type : 'workTime' | 'shortBreakTime' | 'longBreakTime'
};


