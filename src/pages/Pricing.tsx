import { Button, Card, Container, Row } from "react-bootstrap";

export default function Pricing() {
  return (
    <Container>
      <Row>
        <h1>Current Offers</h1>
      </Row>
      <Row className="d-flex justify-content-around mt-5">
          <Card className="w-25 p-0">
            <Card.Img variant="top" src="./src/assets/game-controller.jpg"/>
            <Card.Body>
              <Card.Title>Single Console</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-center">
              <Button variant="warning">Buy Now</Button>
            </Card.Footer>
          </Card>
          <Card className="w-25 p-0">
            <Card.Img variant="top" src="./src/assets/game-controller-combo.jpg"/>
            <Card.Body>
              <Card.Title>Friendship Deal</Card.Title>
              <Card.Text>
                This card has supporting text below as a natural lead-in to
                additional content.{" "}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-center">
              <Button variant="warning">Buy Now</Button>
            </Card.Footer>
          </Card>
      </Row>
    </Container>
  );
}
