import { HistoryIcon , HouseIcon , MoonIcon, SettingsIcon , SunIcon } from 'lucide-react';
import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { RouterLink } from '../RouterLink';


type AvailableThemes = 'dark' | 'light'; 

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storedTheme = localStorage.getItem('theme')  
    return storedTheme as AvailableThemes|| 'dark';
  }); 

  const nextThemeicon = theme === 'dark' ? <SunIcon/> : <MoonIcon/>;

  function handleThemeChange(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault(); 

    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark' 
      return nextTheme 
    }) 
  }{}


  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]) //com array de dependências, roda sempre que o tema mudar


  return (
    <nav className={styles.menuLink}>
        <ul className={styles.menuIcons}>
          <RouterLink 
            className={styles.menuLink}
            aria-label='Home' 
            title='Ir para Home'
            href='/'>
            <HouseIcon></HouseIcon>
          </RouterLink>
          <RouterLink 
            className={styles.menuLink}
            aria-label='Configurações' 
            title='Ir para configurações'
            href='/settings'>
            <SettingsIcon></SettingsIcon>
          </RouterLink>
          <RouterLink 
            className={styles.menuLink}
            aria-label='Configurações' 
            title='Configurações'
            href='/history'>
            <HistoryIcon></HistoryIcon>
          </RouterLink>
           <a 
            className={styles.menuLink}
            href='#'
            aria-label='Mudar tema' 
            title='Mudar tema'
            onClick={handleThemeChange}
            >
            {nextThemeicon}
          </a>
        </ul>
    </nav>
  );
} 