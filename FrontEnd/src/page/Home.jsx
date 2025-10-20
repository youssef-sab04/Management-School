import React , {useContext} from "react";
import { useUserContext } from "../Content/StudentContext.jsx";
import About from "./about.jsx";
import { Services } from "./Services.jsx";
import { Functions } from "./Functions.jsx";
import { Contact } from "./Contact.jsx";
import Footer from "./Footer.jsx";
import { Counter} from "./Counter.jsx";
export default function Home() {
    window.localStorage.setItem('AUTHENTICATED', false)

    const context = useUserContext() ;
    return (
        <>
        <div className="contenuH">
            <About/>
            <Services/>
            <Counter/>
            <Functions/>
            <Contact/>

        </div>
        
        </>
    );
}