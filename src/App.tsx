import  { TaskContextProvider } from "./Contexts/TaskContext/taskContextProvider";
import { MessagesContainer } from "./MessagesContainer";

import { MainRouter } from "./routes/MainRoutes"

import './styles/global.css';
import './styles/theme.css';

export function App() {



  return (
    <TaskContextProvider>
        <MessagesContainer>
          <MainRouter/>
        </MessagesContainer> 
    </TaskContextProvider>
  );
}
