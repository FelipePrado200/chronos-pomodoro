import styles from './styles.module.css';
import { RouterLink } from '../RouterLink';


export function Footer(){

  return (
    <footer className={styles.footer}>
      <RouterLink href='/explication-pomodoro'>
          <p style={{fontWeight: "bold"}}>
            Entenda como funciona a técnica pomodoro 
          
          </p>
      </RouterLink>
      <RouterLink href='/'>
          
          <p style={{fontWeight: "bold"}}>
            Chronos Pomdoro &copy; {new Date().getFullYear()} - Feito com 💚
          </p>
      </RouterLink>
      
    </footer>
  );
}