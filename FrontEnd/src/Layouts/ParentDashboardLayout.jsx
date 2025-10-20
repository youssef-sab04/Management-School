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
import ParentSidebar from "../Component/Parent/ParentSidebar.jsx";





export default function ParentDashboardLayout() {

  const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)

  const { Login, setAuthenticated, Authenticated, logout , setUser } = useUserContext();


  useEffect(() => {
   if(Authenticated === true){
    setIsLoading(false);
     UserApi.getParent().then(({ data }) => {
      setUser(data);
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
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          {/* Titre à gauche */}
          <Navbar.Brand href="/" className="me-auto">
            <h2 className="mb-0">Schoool Management</h2>
          </Navbar.Brand>

          {/* Bouton toggle pour mobile */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            {/* Menu aligné à droite */}
            <Nav className="ms-auto">
              <Nav.Link href = '/parent/dashboard' className="NavI"> <i ><SpaceDashboardIcon /></i>Dashboard</Nav.Link>


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
        </Container>
      </Navbar>

      <main className="MainDahsS">
        <ParentSidebar/>
        <Outlet/>
      </main>

    </>
  );
}