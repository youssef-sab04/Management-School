import { Outlet } from "react-router-dom";
import {Container} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {Navbar} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

export default function Layout() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          {/* Titre à gauche */}
          <Navbar.Brand href="/" className="me-auto">
            <h2 className="mb-0">School Management</h2>
          </Navbar.Brand>

          {/* Bouton toggle pour mobile */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            {/* Menu aligné à droite */}
            <Nav className="ms-auto">
              <Nav.Link href="/">Home Page</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Button variant="dark">Dark</Button>


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main className="container">
        <Outlet />
      </main>

    </>
  );
}