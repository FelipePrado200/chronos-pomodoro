import { Container } from "../../components/Container";
import { Logo } from "../../components/Logo";
import { Footer } from "../../components/Footer";
import { Heading } from "../../components/Heading";
import { Menu } from "../../components/Menu";

type MainTemplateProps = {
    children: React.ReactNode; 
}
export function MainTemplate({children}: MainTemplateProps) {

  return (
   <>
    <Container>
        <Logo/>
    </Container>
    <Container>
        <Heading>
            <Menu/>
        </Heading>
    </Container>
        {children}
    <Container>
        <Footer/>
    </Container>
   </>
  );
}
