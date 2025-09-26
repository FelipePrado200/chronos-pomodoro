import { TrashIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../template/MainTemplate";
import { useTaskContext } from "../../Contexts/TaskContext/useTaskConext";
import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import type { SortTasksOptions } from "../../utils/sortTasks";
import {sortTasks} from "../../utils/sortTasks"
import { useEffect, useState } from "react";

import styles from "./styles.module.css"
import { TaskActionsTypes } from "../../Contexts/TaskContext/taskActions";

export function History() {
  const {state , dispatch} = useTaskContext()
  const hasTasks = state.task.length > 0;
  const [sortTaskOptions,setSortTaskOptions] = useState<SortTasksOptions>(
    () => {
    return{
      tasks: sortTasks({tasks: state.task}),
      field: 'startDate',
      direction: 'desc'
    }
  })
  useEffect(() => {
    document.title = 'Histórico do Chronos Pomodoro'
  }, [])
  useEffect(() => {
    setSortTaskOptions(prevState => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.task,
        direction: prevState.direction,
        field: prevState.field
      })
    }));

  }, [state.task])
  function handleSortTasks({field} : Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTaskOptions.direction === 'desc' ? 'asc' : 'desc'
    setSortTaskOptions({
        tasks: sortTasks({
          direction: newDirection,
          tasks:sortTaskOptions.tasks,
          field,
        }),
        direction: newDirection,
        field

      
    })
  }


  function handleResetHistory(){
    if(!confirm('Tem certeza que deseja deletar seu histórico?')) return
    dispatch({ type: TaskActionsTypes.RESET_STATE})
  }
  return (
   <>
    <MainTemplate>
      <Container>
        <Heading >
            <span>History</span>
            {hasTasks && (
            <span className={styles.buttonContainer}>
              <DefaultButton
              onClick={handleResetHistory}
              color="red"
              aria-label="apagar histórico" 
              title="apagar histórico" 
              icon={<TrashIcon/>}/>
            </span> 
            )}
        </Heading>
      </Container>
      <Container>
            {hasTasks && (
            <div className={styles.responsiveTable}>
                <table>
                  <thead>
                    <tr>
                      <th 
                        onClick={() => handleSortTasks({ field:'name'})}>Tarefa</th>
                      <th 
                        onClick={() => handleSortTasks({ field:'durations'})}>Duração</th>
                      <th 
                        onClick={() => handleSortTasks({ field:'startDate'})}>Duração</th>
                      <th>Status</th>
                      <th>Tipo</th>                      
                    </tr>
                  </thead>
                  <tbody>
                    {sortTaskOptions.tasks.map((task) => {
                      const taskTypeDictionary = {
                        workTime: 'Foco',
                        shortBreakTime: 'Descanso curto',
                        longBreakTime: 'Descanso longo'
                      }
                      return(
                        <tr key={task.id}>
                          <td>{task.name}</td>
                          <td>{task.durations} minutos</td>
                          <td>{formatDate(task.startDate)}</td>
                          <td>{getTaskStatus(task, state.activeTask)}</td>
                          <td>{taskTypeDictionary[task.type]}</td>
                        </tr> 
                      )
                    })}
                  </tbody>
                </table>
            </div>
            )}
            {!hasTasks &&(
              <p style={{textAlign: "center" , fontWeight: 'bold'}}>Ainda não existem tarefas criadas</p>
            )}
      </Container>
    </MainTemplate>
        
   </>
  );
}
