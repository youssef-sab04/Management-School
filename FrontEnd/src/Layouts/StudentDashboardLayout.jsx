//StudentDashboardLayout
import { Outlet } from "react-router-dom";
import { Container } from 'react-bootstrap';
import { Nav , Dropdown } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from "../router/index.jsx";
import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { useUserContext } from "../Content/StudentContext.jsx";
import UserApi from "../service/api/student/UsersApi.jsx";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StudentAdminSidebar from "./Administration/StudentAdminSidebar";
import logo from './logo.png'
import { redirectToDashboard } from "../router/index.jsx";


export default function StudentDashboardLayout() {

  const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)

  const { Login, setAuthenticated, Authenticated, logout  , setUser} = useUserContext();


  useEffect(() => {
   if(Authenticated === true){
    setIsLoading(false);
     UserApi.getUser().then(({ data }) => {
      const role = data?.role
      
             if(role !== 'student') {
                    navigate(redirectToDashboard(role));
                    } 
      setUser(data?.user);
      console.log("role" , data?.role)
      setAuthenticated(true);
    }).catch((reason) => {
      navigate(LOGIN_ROUTE);
      logout();
    });
   }
    else {
      logout();
      navigate(LOGIN_ROUTE)

    }
  }, [Authenticated]);





 if (isLoading) {
    return <></>
  }

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
            <Nav className="ms-auto">
              <Nav.Link href = '/student/dashboard' className="NavI"> <i ><SpaceDashboardIcon /></i>Dashboard</Nav.Link>


              <Dropdown className="DD">
                <Dropdown.Toggle variant="" className="Dd NavI" id="dropdown-basic">
                 <i ><AccountCircleIcon /></i> DashboardMenu
                </Dropdown.Toggle>
                <Dropdown.Menu className="DD">
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>



            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <main className="MainDahsS DAHST">
        < StudentAdminSidebar />
        <Outlet/>
      </main>
      </div>


    </>
  );
}