import { Button, Card, Col, Container, Row } from "react-bootstrap";

export default function Pricing() {
  return (
    <Container>
      <Row>
        <h1>Current Offers</h1>
      </Row>
      <Row className="d-flex justify-content-around mt-4" xs={1} sm={1} md={2}>
        <Col>
          <Card className="p-0" border="secondary">
            <Card.Img variant="top" src="./src/assets/game-controller.jpg" />
            <Card.Header>Single Console</Card.Header>
            <Card.Body>
              <Card.Title>1 Console for $40</Card.Title>
              <Card.Text>
                Made with high quality materials. This console is bound to
                provide hours of fun, get it for a very afforable price today!
              </Card.Text>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-center">
              <Button variant="warning">Buy Now</Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col>
          <Card className="p-0" border="secondary">
            <Card.Img
              variant="top"
              src="./src/assets/game-controller-combo.jpg"
            />
            <Card.Header>Friendship Deal</Card.Header>
            <Card.Body>
              <Card.Title>2 Consoles for $70</Card.Title>
              <Card.Text>
                Competing with your friends is at the forefront of this console,
                include them in the fun with this deal!
              </Card.Text>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-center">
              <Button variant="warning">Buy Now</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
