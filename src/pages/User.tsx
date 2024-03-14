import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Container,
  Row,
  Toast,
} from "react-bootstrap";
import CurrentUser from "../Utils";
import { useState } from "react";

export default function User() {
  const [, setUpdate] = useState();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
  };

  const toggleAdmin = () => {
    const currentUser = CurrentUser();
    currentUser.admin = !currentUser.admin;

    const users: [User] = JSON.parse(localStorage.getItem("users") ?? "");
    const index = users.findIndex((user) => user.email === currentUser.email);
    users[index] = currentUser;

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    setUpdate(currentUser.admin);
  };

  function getOtherUsers(): User[] {
    const users: [User] = JSON.parse(localStorage.getItem("users") ?? "");
    const index = users.findIndex((user) => user.email === CurrentUser().email);
    users.splice(index, 1);

    return users;
  }

  function removeUser(email: string) {
    console.log("Function called");

    const users: [User] = JSON.parse(localStorage.getItem("users") ?? "");
    const index = users.findIndex((user) => user.email === email);
    users.splice(index, 1);

    localStorage.setItem("users", JSON.stringify(users));
    window.location.reload();
  }

  function generateUserCard(user: User, index: number) {
    return (
      <Card key={index} style={{ width: "18rem", margin: "0.5rem" }}>
        <CardBody>
          <CardTitle>Name: {user.name}</CardTitle>
          <CardText>
            Email: {user.email}
            <br />
            DOB: {user.dob}
            <br />
            Admin: {user.admin ? "✅" : "❌"}
          </CardText>
          {CurrentUser().admin && (
            <Button
              variant="danger"
              onClick={() => removeUser(user.email)}
              disabled={user.admin}
            >
              Remove
            </Button>
          )}
        </CardBody>
      </Card>
    );
  }

  return (
    <Container className="d-flex flex-column">
      <Row>
        <h1>Account Information</h1>
      </Row>
      {CurrentUser() && (
        <>
          <Row>
            <h4>Name: {CurrentUser().name}</h4>
          </Row>
          <Row>
            <h4>Email: {CurrentUser().email}</h4>
          </Row>
          <Row>
            <h4>DOB: {CurrentUser().dob}</h4>
          </Row>
          <Row>
            <h4>Admin: {CurrentUser().admin ? "✅" : "❌"}</h4>
          </Row>
        </>
      )}
      <Row className="">
        <div>
          <Button
            variant={CurrentUser().admin ? "warning" : "success"}
            onClick={toggleAdmin}
            className=""
          >
            {CurrentUser().admin ? "Remove Admin" : "Make Admin"}
          </Button>
        </div>
      </Row>
      <Row className="mt-5">
        <div>
          <Button variant="danger" onClick={handleLogout} href="/home">
            Logout
          </Button>
        </div>
      </Row>

      <Row className="mt-5">
        <h1>Other users</h1>
        {getOtherUsers()[0] ? (
          getOtherUsers().map((user: User, index: number) =>
            generateUserCard(user, index)
          )
        ) : (
          <Container>
            <Toast bg="warning" className="d-inline-block m-1 text-dark">
              <Toast.Header>
                <strong className="rounded me-auto">No Scores Found</strong>
              </Toast.Header>
              <Toast.Body>
                Sorry, no scores are currently available to be displayed
              </Toast.Body>
            </Toast>
          </Container>
        )}
      </Row>
    </Container>
  );
}
