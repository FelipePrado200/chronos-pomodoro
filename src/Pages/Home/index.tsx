import { useEffect } from "react";
import { Container } from "../../components/Container";
import { CountDown } from "../../components/CountDown";
import { MainForm } from "../../components/MainForm";
import { MainTemplate } from "../../template/MainTemplate";


export function Home() {
    useEffect(() => {
      document.title = 'Home'
    }, [])
  return (
   <>
    <MainTemplate>
      <Container>
        <CountDown >
        </CountDown>
      </Container>
      <Container>
        <MainForm />
      </Container>
    </MainTemplate>
        
   </>
  );
}
