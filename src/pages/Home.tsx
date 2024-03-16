import { Button, Card, Col, Container, Row } from "react-bootstrap";
import image1 from "../assets/idle-game-poster.png";

export default function Home() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <h1 className="text-center mb-4">Welcome to Arena Arcade</h1>
        <p className="text-center mb-4">
          Your ultimate destination for handheld gaming fun!
        </p>
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={image1} />
              <Card.Body>
                <Card.Title>Tycoon Power House</Card.Title>
                <Card.Text>
                  Build your empire from scratch in this addictive idle game.
                  Manage resources, upgrade facilities, and expand your business
                  to become the ultimate tycoon and amass vast wealth.
                </Card.Text>
                <Button variant="primary">View Preview</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src="./src/assets/space-game-poster.png" />
              <Card.Body>
                <Card.Title>Galactic Rush</Card.Title>
                <Card.Text>
                  Explore the depths of space in this action-packed adventure.
                  Pilot your spaceship through asteroid fields, engage in
                  thrilling dogfights with enemy ships, and uncover the secrets
                  of distant galaxies.
                </Card.Text>
                <Button variant="primary">View Preview</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src="./src/assets/pirate-game-poster.png" />
              <Card.Body>
                <Card.Title>Pirate's Plunder</Card.Title>
                <Card.Text>
                  Set sail on the high seas and become the most feared pirate
                  captain in history! Build your own pirate crew, plunder
                  treasure-filled islands, and engage in epic naval battles
                  against rival ships.
                </Card.Text>
                <Button variant="primary">View Preview</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Row>
    </Container>
  );
}
