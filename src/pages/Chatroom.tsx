import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import CurrentUser from "../Utils";

export default function Chatroom() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const currentTime = new Date().toUTCString();
    const currentUser = localStorage.getItem("currentUser")
      ? JSON.parse(localStorage.getItem("currentUser") ?? "").name
      : "Unknown";

    const message: Message = {
      author: currentUser,
      content: newMessage,
      timestamp: currentTime,
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Feedback Chatroom</h1>
        </Col>
        <Col className="d-flex justify-content-end">
          {CurrentUser() && CurrentUser().admin && (
            <Button variant="danger" onClick={() => setMessages([])}>
              Clear Chat
            </Button>
          )}
        </Col>
      </Row>
      <Container>
        <Row className="g-2">
          {messages.map((message: Message, index: number) => (
            <Card key={index} border="secondary" className="p-0">
              <Card.Header className="d-flex justify-content-between">
                <div>{message.author}</div>
                <div>{message.timestamp}</div>
              </Card.Header>
              <CardBody>{message.content}</CardBody>
            </Card>
          ))}
        </Row>
      </Container>
      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Control
          type="text"
          placeholder="Message"
          size="lg"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          required
        />
        <Button variant="success" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
