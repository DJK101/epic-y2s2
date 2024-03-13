import { useState } from "react";
import { Button, Container, Form, Toast } from "react-bootstrap";
import "react-datetime/css/react-datetime.css";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [newUser, setNewUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    dob: "",
    admin: false,
  });
  const [toastDetails, setToastDetails] = useState<ToastDetails>(
    {
      title: '',
      content: '',
      style: '',
    }
  )
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const clearForm = () => {
    setNewUser({
      name: "",
      email: "",
      password: "",
      dob: "",
      admin: false,
    });
    setConfirmPassword("");
    setAgreedToTerms(false);
  };

  const addUser = () => {
    const newUserr: User = newUser;

    const storedUsers = localStorage.getItem("users");
    const users: [User] = storedUsers ? JSON.parse(storedUsers) : [];

    users.push(newUserr);

    localStorage.setItem("users", JSON.stringify(users));
  };

  const userExists = () => {
    const storedUsers = localStorage.getItem("users");
    const users: [User] = storedUsers ? JSON.parse(storedUsers) : [];

    return users.some((user) => user.email === newUser.email);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newUser.password !== confirmPassword) {
      setToastDetails({
        title: "An Error Occured!",
        content: "Passwords do not match",
        style: "danger",
      });
      setShowToast(true);
      return;
    }

    if (userExists()) {
      setToastDetails({
        title: "An Error Occured!",
        content: "User with email '" + newUser.email + "' already exists",
        style: "danger",
      });
      setShowToast(true);
      return;
    }

    addUser();
    setToastDetails({
      title: "Success!",
      content: "User " + newUser.email + " registered successfully!",
      style: "success"
    });
    setShowToast(true);
    clearForm();
  };

  const handleChange = (e: any, key: string) => {
    const { value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setNewUser((prevState) => ({
      ...prevState,
      [key]: newValue,
    }));
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center pt-5">
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={1200}
        autohide
        bg={toastDetails.style}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{toastDetails.title}</strong>
        </Toast.Header>
        <Toast.Body>{toastDetails.content}</Toast.Body>
      </Toast>

      <h2>Sign Up</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Full Name"
            size="lg"
            value={newUser.name}
            onChange={(e) => handleChange(e, "name")}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            size="lg"
            value={newUser.email}
            onChange={(e) => handleChange(e, "email")}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="pwd">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            size="lg"
            value={newUser.password}
            onChange={(e) => handleChange(e, "password")}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="pwd-confirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-enter Password"
            size="lg"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="dob">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            placeholder="Date of Birth"
            size="lg"
            value={newUser.dob}
            onChange={(e) => handleChange(e, "dob")}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label={
              <>
                I agree to the{" "}
                <a href="/terms" target="_blank" rel="noopener noreferrer">
                  T&Cs
                </a>
              </>
            }
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>

        <p className="mt-3">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </Form>
    </Container>
  );
}
