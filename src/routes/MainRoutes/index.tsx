import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { Home } from "../../Pages/Home";
import { Explication } from "../../Pages/Explication";
import { NotFound } from "../../Pages/NotFound";
import { History } from "../../Pages/History"
import { useEffect } from "react";
import { Settings } from "../../Pages/Settings";

function ScrollToTop(){
    const {pathname} = useLocation();
    useEffect(() => {
        window.scrollTo({top: 0 , behavior: 'smooth'})

    }, [pathname]);
    return null;
}

export function MainRouter(){


    return(
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explication-pomodoro" element={<Explication />} />      
              <Route path="/history" element={<History />} />      
              <Route path="/settings" element={<Settings />} />      
              <Route path="*" element={<NotFound />} />              
            </Routes>
            <ScrollToTop/>
        </BrowserRouter>
    )
}