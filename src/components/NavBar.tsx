import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Pricing from "../pages/Pricing";
import Leaderboard from "../pages/Leaderboard";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

export default function NavBar() {
  return (
    <BrowserRouter>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to={"/home"}>
            <img
              alt=""
              src="/src/assets/arcade-arena-logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Arena Arcade
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/home"}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to={"/pricing"}>
                Pricing
              </Nav.Link>
              <Nav.Link as={Link} to={"/leaderboard"}>
                Leaderboard
              </Nav.Link>
              <Nav.Link as={Link} to={"/login"}>
                Login
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Go</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
    </BrowserRouter>
  );
}
