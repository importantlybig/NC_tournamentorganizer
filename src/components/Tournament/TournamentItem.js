import { useSelector } from "react-redux";
import { Card, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const TournamentItem = (props) => {
  const { language, dictionary } = useSelector((state) => state.language)

  return (
    <Col>
      <Card>
        <Card.Header>
          <small>#ID: {props.id}</small>
        </Card.Header>
        <Card.Body>
          <div class="d-flex justify-content-center">
            <Link to={`/tournaments/${props.id}/dashboard`}>
              <Image src="/football.png" width="80" height="80" />
            </Link>
          </div>
          <Link to={`/tournaments/${props.id}/dashboard`}>
            <Card.Title bsPrefix="fs-6 text-center">{props.name}</Card.Title>
          </Link>
          <Card.Text bsPrefix="text-center">
            <p className="m-0">
              <small>{dictionary[language]['Sport']}: Football</small>
            </p>
            <p className="m-0">
              <small>{dictionary[language]['Tournament structure']}: ${props.structure}</small>
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TournamentItem;
