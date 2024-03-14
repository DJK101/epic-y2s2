import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Leaderboard from "../pages/Leaderboard";
import Login from "../pages/Login";
import Pricing from "../pages/Pricing";
import SignUp from "../pages/SignUp";
import User from "../pages/User";
import SearchBar from "./SearchBar";
import CurrentUser from "../Utils";

export default function NavBar() {
  return (
    <BrowserRouter>
      <Navbar expand="lg" className="bg-body-tertiary mb-5">
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
              {!CurrentUser() && (
                <Nav.Link as={Link} to={"/login"}>
                  Login
                </Nav.Link>
              )}
            </Nav>
            {CurrentUser() && (
              <Navbar.Text className="me-3">
                Signed in as: <a href="/user">{CurrentUser().name}</a>
              </Navbar.Text>
            )}
            <SearchBar />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}
