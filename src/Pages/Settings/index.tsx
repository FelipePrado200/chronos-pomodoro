import {  SaveIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { DefaultInput } from "../../components/DefaultInput";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../template/MainTemplate";

import { useEffect, useRef } from "react";
import { useTaskContext } from "../../Contexts/TaskContext/useTaskConext";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionsTypes } from "../../Contexts/TaskContext/taskActions";

export function Settings() {
  const {state , dispatch} = useTaskContext()
  
  const workTimeInputRef = useRef<HTMLInputElement>(null)
  const shortBreakTimeInputRef = useRef<HTMLInputElement>(null)
  const longBreakTimeInputRef = useRef<HTMLInputElement>(null)

  function handleSaveSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      showMessage.dismiss()

      const formErrors = []

      const workTime = Number(workTimeInputRef.current?.value)
      const shortBreakTime = Number(shortBreakTimeInputRef.current?.value)
      const longBreakTime = Number(longBreakTimeInputRef.current?.value)
      
      if(isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime) ){
        formErrors.push("Digite apenas numeros para foco")
      }
      if(workTime < 1 || workTime > 99){
        formErrors.push("Digite valores entre 1 e 99 para foco")
      }
      if(shortBreakTime < 1 || shortBreakTime > 30){
        formErrors.push("Digite valores entre 1 e 30 descanso curto")
      }
      if(longBreakTime < 1 || longBreakTime > 60){
        formErrors.push("Digite valores entre 1 e 60 para descanso longo")
      }
      if(formErrors.length > 0){
        formErrors.forEach(error => {
          showMessage.error(error)
        })
        return
      }       
      dispatch({type: TaskActionsTypes.CHANGE_SETTINGS, payload:{
        workTime,
        shortBreakTime,
        longBreakTime
      }})
      showMessage.sucess('Suas configurações foram salvas')
  }

      useEffect(() => {
        document.title = 'Configurações Chronos Pomodoro'
      }, [])
  return (
   <>
    <MainTemplate>
      <Container>
            <Heading>Configurações</Heading>
      </Container>
      <Container>
          <p  style={{fontWeight: "bold"}}>
                Modifique as configurações para tempo de foco, descanso curto 
                e descanso longo      
          </p>
      </Container>      
      <Container>
          <form  action="" className="form">
              <div className="formRow">
                  <DefaultInput 
                  defaultValue={state.config.workTime}
                  id="workTime" 
                  labelText="Foco" ref={workTimeInputRef}/>
              </div>
          </form>
          <form action="" className="form">
              <div className="formRow">
                  <DefaultInput 
                  defaultValue={state.config.shortBreakTime}
                  id="shortBreakTime" 
                  labelText="Decanso curto" ref={shortBreakTimeInputRef}/>
              </div>
          </form>
          <form action="" className="form">
              <div className="formRow">
                  <DefaultInput
                  defaultValue={state.config.longBreakTime}
                  id="longBreakTime" 
                  labelText="Decanso Longo" ref={longBreakTimeInputRef}/>
              </div>
          </form>
          <form onSubmit={handleSaveSubmit} action="" className="form">
              <div className="formRow">
                  <DefaultButton 
                  icon={<SaveIcon/>} 
                  title="Salvar configurações"
                  aria-label="Salvar configurações"
                  />
                  
              </div>
          </form>
      </Container>
    </MainTemplate>
        
   </>
  );
}
