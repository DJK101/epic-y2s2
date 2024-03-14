import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Container,
  Row,
} from "react-bootstrap";

const playerScores = [
  { name: "Player 1", score: 100 },
  { name: "Player 2", score: 90 },
  { name: "Player 3", score: 180 },
  // Add more players as needed
];

playerScores.sort((a, b) => b.score - a.score);

export default function Leaderboard() {
  return (
    <Container>
      <Row>
        <h1>Global Leaderboard</h1>
      </Row>
      <Row>
          {playerScores.map((player, index) => (
            <Card key={index} style={{ width: "18rem", margin: "0.5rem" }}>
              <CardBody>
                <CardTitle>{index + 1}. {player.name}</CardTitle>
                <CardText>Score: {player.score}</CardText>
              </CardBody>
            </Card>
          ))}
      </Row>
    </Container>
  );
}
