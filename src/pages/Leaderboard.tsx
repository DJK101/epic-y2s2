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
  const [reloadingFromDB, setReloadingFromDB] = useState(false);

  function addPlayerScore(name: string, score: number, refresh: boolean) {
    const playerScores: Score[] = getPlayerScores() ?? [];
    const playerIfExists = playerScores.find((score) => score.name === name);

    if (playerIfExists) {
      const index = playerScores.indexOf(playerIfExists);
      playerScores[index].score = score;
    } else {
      playerScores.push({ name: name, score: score });
    }

    localStorage.setItem("playerScores", JSON.stringify(playerScores));
    if (refresh) {
      window.location.reload();
    }
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
        (score) => score.name === playerName
      );
      playerScores.splice(index, 1);

      localStorage.setItem("playerScores", JSON.stringify(playerScores));
      window.location.reload();
    }
  }

  function handleRefresh() {
    setReloadingFromDB(true);

    // instantiate a headers object
    let myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    // var raw = JSON.stringify({ base: base, exponent: exponent });
    // create a JSON object with parameters for API call and store in a variable
    let requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    // make API call with parameters and use promises to get response
    fetch(
      "https://6arn48msfh.execute-api.eu-west-1.amazonaws.com/dev",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => JSON.parse(result).body)
      .then((scores: Score[]) =>
        scores.forEach((score) =>
          addPlayerScore(score.name, score.score, false)
        )
      )
      .then(() => setReloadingFromDB(false))
      .catch((error) => console.log("error", error));
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">New Score</Popover.Header>
      <Popover.Body>
        <Form onSubmit={() => addPlayerScore(newName, newScore, true)}>
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
          <Col className="d-flex justify-content-end p-1">
            <Button
              className="mx-2"
              variant="info"
              onClick={handleRefresh}
              disabled={reloadingFromDB}
            >
              {reloadingFromDB ? "Refreshing..." : "Refresh From DB"}
            </Button>

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
                  {index + 1}. {score.name}
                </CardTitle>
                <CardText>Score: {score.score}</CardText>
                {CurrentUser() && CurrentUser().admin && (
                  <Button
                    variant="danger"
                    onClick={() => removePlayerScore(score.name)}
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
