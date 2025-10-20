import { Outlet } from "react-router-dom";
import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import logo from './logo.png'
import Footer from '../page/Footer' // Chemin corrigé


export default function Layout() {
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
            <h2 className="mb-0 TITLEdahsT"> Y-High School</h2>
          </Navbar.Brand>

          {/* Bouton toggle pour mobile */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            {/* Menu aligné à droite */}
            <Nav className="ms-auto en">
              <Nav.Link href="/">Home Page</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/services">Services</Nav.Link>
              <Nav.Link href="/Statistiques">Statistiques</Nav.Link>
              <Nav.Link href="/témoignages">Témoignages</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>

              <Nav.Link href="/login">Login</Nav.Link>




            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <main >
          <Outlet />
          <Footer />

        </main>
      </div>


    </>
  );
}