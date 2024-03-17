import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Leaderboard from "../pages/Leaderboard";
import Login from "../pages/Login";
import Pricing from "../pages/Pricing";
import SignUp from "../pages/SignUp";
import User from "../pages/User";
import SearchBar from "./SearchBar";
import CurrentUser from "../Utils";
import Chatroom from "../pages/Chatroom";
import FileUpload from "../pages/FileUpload";
import logo from "../assets/arcade-arena-logo.svg"

export default function NavBar() {
  return (
    <BrowserRouter>
      <Navbar expand="lg" className="bg-body-tertiary mb-5">
        <Container>
          <Navbar.Brand as={Link} to={""}>
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Arena Arcade
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={""}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to={"/pricing"}>
                Pricing
              </Nav.Link>
              <Nav.Link as={Link} to={"/leaderboard"}>
                Leaderboard
              </Nav.Link>
              <Nav.Link as={Link} to={"/chatroom"}>
                Feedback
              </Nav.Link>
              <Nav.Link as={Link} to={"/upload"}>
                File Upload
              </Nav.Link>
            </Nav>
            {CurrentUser() ? (
              <Navbar.Text className="me-3">
                Signed in as: <a href="/user">{CurrentUser().name}</a>
              </Navbar.Text>
            ) : (
              <Button href="/login" className="me-3">
                Login
              </Button>
            )}
            <SearchBar />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/chatroom" element={<Chatroom />} />
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}
