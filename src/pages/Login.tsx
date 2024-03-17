import { useState } from "react";
import { Button, Container, Form, Toast } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastDetails, setToastDetails] = useState<ToastDetails>({
    title: "",
    content: "",
    style: "",
  });

  const navigate = useNavigate();

  const displayErrorToast = () => {
    setToastDetails({
      title: "Invalid Credentials!",
      content: "The details you entered were incorrect",
      style: "danger",
    });
    setShowToast(true);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!localStorage.getItem("users")) {
      displayErrorToast();
      return;
    }

    const users: [User] = JSON.parse(localStorage.getItem("users") ?? "");
    const submittedUser = users.find((user: User) => user.email === email);

    if (!submittedUser || submittedUser.password !== password) {
      displayErrorToast();
      return;
    }
    
      localStorage.setItem("currentUser", JSON.stringify(submittedUser));
      
      navigate('/');
      window.location.reload();
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center pt-5">
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={2000}
        autohide
        bg={toastDetails.style}
      >
        <Toast.Header>
          <strong className="me-auto">{toastDetails.title}</strong>
        </Toast.Header>
        <Toast.Body>{toastDetails.content}</Toast.Body>
      </Toast>

      <h2>Sign In</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            size="lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember Me" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <p className="mt-3">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </Form>
    </Container>
  );
}
