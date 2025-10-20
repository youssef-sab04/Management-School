import { Outlet } from "react-router-dom";
import {Container} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {Navbar} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React , {useEffect} from "react";
import { STUDENT_DASHBOARD_ROUTE } from "../router/index.jsx";
import { useUserContext } from "../Content/StudentContext.jsx";
import logo from './logo.png'


export default function GuestLayout() {

  const navigate = useNavigate();
  const UserContect = useUserContext();

    useEffect(() => {

    if (UserContect.Authenticated) {
        console.log("Tokened G")
       
       console.log( "Le token" , window.localStorage.getItem('AUTHENTICATED'));
    }
    else{
        console.log("No thokened , GuestLayout"  )

    }
    }, []);
        useEffect(() => {

          console.log( "Lee token" , window.localStorage.getItem('AUTHENTICATED'));

    }, [UserContect.Authenticated , navigate]);


    

    
  return (
    <>


      <div className="layout">
        <Navbar expand="lg" className="body-tertiary NavH">
          {/* Titre à gauche */}
          <Navbar.Brand href="/" className="me-auto T">
            <img
              src={logo}
              alt="Y-High School Logo"
              style={{ height: '40px', marginRight: '10px' }}
              className="logo"
            />
            <h2 className="mb-0 TITLEdahsT"> Y-High School Management</h2>
          </Navbar.Brand>

          {/* Bouton toggle pour mobile */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            {/* Menu aligné à droite */}
            <Nav className="ms-auto en">
               <Nav.Link href="/">Home Page</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>




            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <main >
          <Outlet />

        </main>
      </div>

    

    </>
  );
}