import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  Form,
  OverlayTrigger,
  Popover,
  Row,
  Toast,
} from "react-bootstrap";
import CurrentUser from "../Utils";
import { useState } from "react";

export default function Leaderboard() {
  const [newName, setNewName] = useState("");
  const [newScore, setNewScore] = useState(0);

  function addPlayerScore() {
    const playerScores: Score[] = getPlayerScores() ?? [];
    playerScores.push({ player: newName, score: newScore });

    console.log(playerScores);

    localStorage.setItem("playerScores", JSON.stringify(playerScores));

    window.location.reload();
  }

  function getPlayerScores() {
    let playerScoresData;
    if ((playerScoresData = localStorage.getItem("playerScores"))) {
      const playerScores: Score[] = JSON.parse(playerScoresData);
      playerScores.sort((a, b) => b.score - a.score);
      return playerScores;
    }
    return [];
  }

  function removePlayerScore(playerName: string) {
    let playerScores: Score[] | null;
    if ((playerScores = getPlayerScores())) {
      const index = playerScores.findIndex(
        (score) => score.player === playerName
      );
      playerScores.splice(index, 1);

      localStorage.setItem("playerScores", JSON.stringify(playerScores));
      window.location.reload();
    }
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">New Score</Popover.Header>
      <Popover.Body>
        <Form onSubmit={() => addPlayerScore()}>
          <Form.Group controlId="name">
            <Form.Control
              type="text"
              placeholder="Name"
              size="sm"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="score">
            <Form.Control
              type="number"
              placeholder="Score"
              size="sm"
              value={newScore}
              onChange={(e) => setNewScore(parseInt(e.target.value))}
              required
            />
          </Form.Group>

          <Button variant="success" type="submit">
            Submit
          </Button>
        </Form>
      </Popover.Body>
    </Popover>
  );

  return (
    <Container>
      <Row>
        <Col>
          <h1>Global Leaderboard</h1>
        </Col>
        {CurrentUser() && CurrentUser().admin && (
          <Col className="d-flex justify-content-end">
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={popover}
            >
              <Button variant="primary">Add New Score</Button>
            </OverlayTrigger>
          </Col>
        )}
      </Row>
      <Row>
        {getPlayerScores()[0] ? (
          getPlayerScores().map((score: Score, index: number) => (
            <Card key={index} style={{ width: "18rem", margin: "0.5rem" }}>
              <CardBody>
                <CardTitle>
                  {index + 1}. {score.player}
                </CardTitle>
                <CardText>Score: {score.score}</CardText>
                {CurrentUser() && CurrentUser().admin && (
                  <Button
                    variant="danger"
                    onClick={() => removePlayerScore(score.player)}
                  >
                    Remove
                  </Button>
                )}
              </CardBody>
            </Card>
          ))
        ) : (
          <Container>
            <Toast bg="warning" className="d-inline-block m-1 text-dark">
              <Toast.Header closeButton={false}>
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
