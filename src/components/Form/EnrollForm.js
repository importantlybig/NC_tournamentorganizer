import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Wrapper from "../../components/UI/Wrapper";
import TournamentInfomation from "../Tournament/TournamentInfomation";
import { createTournamentTeam } from "../../lib/tournament-api";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import useHttp from "../../hooks/useHttp";
import Loader from "../UI/Loader";
import { isEmailValid, isEmpty } from "../../utils/inputValidation";

const EnrollForm = (props) => {
  const { language, dictionary } = useSelector((state) => state.language);
  const [membersNumber, setmembersNumber] = useState(1);
  const [inputError, setInputError] = useState({
    hasError: false,
    errorMessage: "",
  });
  //set form input fields
  const [teamName, setTeamNam] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [participantEmail, setParticipantEmail] = useState("");
  const [participantAddress, setParticipantAddress] = useState("");

  useEffect(()=>{
    setmembersNumber(1)
    setInputError({
      hasError: false,
      errorMessage: "",
    })
    setForm((prev) => {
      return [
        <Row className="mb-3" xs={1} md={4} lg={4}  style={{
          "padding-top": "0.5em",
          "padding-bottom": "1em",
          "border-radius": "0.25em",
          "background-color": "#687888",
        }}>
          <Form.Group as={Col} className="text-center">
            <Form.Label>#{dictionary[language]["Player"]}</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setParticipantName(e.target.value)}
              defaultValue={membersNumber + 1}
              readOnly={true}
            />
          </Form.Group>

          <Form.Group as={Col} className="text-center">
            <Form.Label>{dictionary[language]["Name"]}</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setParticipantName(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} className="text-center">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setParticipantEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} className="text-center">
            <Form.Label>{dictionary[language]["Address"]}</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your address"
              onChange={(e) => setParticipantAddress(e.target.value)}
            />
          </Form.Group>
        </Row>,
      ];
    });
    
  },[language])

  const {
    httpRequest: sendEnrollmentRequest,
    isLoading,
    hasError,
    errorMessage,
    finished,
  } = useHttp();

  const [form, setForm] = useState([
    <Row
      className={`mb-3`}
      xs={1}
      md={4}
      lg={4}
      style={{
        "padding-top": "0.5em",
        "padding-bottom": "1em",
        "border-radius": "0.25em",
        "background-color": "#687888",
      }}
    >
      <Form.Group as={Col} className="text-center">
        <Form.Label>#{dictionary[language]["Player"]}</Form.Label>
        <Form.Control
          type="number"
          onChange={(e) => setParticipantName(e.target.value)}
          defaultValue={1}
          readOnly={true}
        />
      </Form.Group>
      <Form.Group as={Col} className="text-center">
        <Form.Label>{dictionary[language]["Name"]}</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setParticipantName(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Col} className="text-center">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setParticipantEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Col} className="text-center">
        <Form.Label>{dictionary[language]["Address"]}</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your address"
          onChange={(e) => setParticipantAddress(e.target.value)}
        />
      </Form.Group>
    </Row>,
  ]);


  const addMemberHandler = () => {
    setmembersNumber((prev) => prev + 1);
    setForm((prev) => {
      return [
        ...prev,
        <Row className="mb-3" xs={1} md={4} lg={4}  style={{
          "padding-top": "0.5em",
          "padding-bottom": "1em",
          "border-radius": "0.25em",
          "background-color": "#687888",
        }}>
          <Form.Group as={Col} className="text-center">
            <Form.Label>#{dictionary[language]["Player"]}</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setParticipantName(e.target.value)}
              defaultValue={membersNumber + 1}
              readOnly={true}
            />
          </Form.Group>

          <Form.Group as={Col} className="text-center">
            <Form.Label>{dictionary[language]["Name"]}</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setParticipantName(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} className="text-center">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setParticipantEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} className="text-center">
            <Form.Label>{dictionary[language]["Address"]}</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your address"
              onChange={(e) => setParticipantAddress(e.target.value)}
            />
          </Form.Group>
        </Row>,
      ];
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const teamName = e.target[0].value;
    if (isEmpty(teamName)) {
      setInputError({
        hasError: true,
        errorMessage: "Please specify team name ",
      });
      return;
    }

    const participants = [];
    for (let index = 1; index < e.target.length - 1; index = index + 4) {
      const playerOrder = e.target[index].value;
      const enteredName = e.target[index + 1].value;
      const enteredEmail = e.target[index + 2].value;
      const enteredAddress = e.target[index + 3].value;

      if (isEmpty(enteredName)) {
        //console.log("Please fill in name of player# ", playerOrder )
        setInputError({
          hasError: true,
          errorMessage: "Please fill in name of player# " + playerOrder,
        });
        return;
      }
      if (isEmpty(enteredEmail)) {
        //console.log("Please fill in email of player# ", playerOrder )
        setInputError({
          hasError: true,
          errorMessage: "Please fill in email of player# " + playerOrder,
        });
        return;
      }
      if (isEmpty(enteredAddress)) {
        //console.log("Please fill in address of player# ", playerOrder )
        setInputError({
          hasError: true,
          errorMessage: "Please fill in address of player# " + playerOrder,
        });
        return;
      }
      if (!isEmailValid(enteredEmail)) {
        console.log("Player ", playerOrder, " has invalid email format");
        setInputError({
          hasError: true,
          errorMessage: "Player# " + playerOrder + "has invalid email format",
        });
        return;
      }

      participants.push({
        name: enteredName,
        email: enteredEmail,
        address: enteredAddress,
      });
    }
    setInputError({
      hasError: false,
      errorMessage: "",
    });
    const requestBody = {
      teamName: teamName,
      participants: [...participants],
    };

    sendEnrollmentRequest(
      createTournamentTeam,
      { id: props.tournamentId, requestBody },
      (data) => {
        console.log(data);
      }
    );
  };

  return (
    <>
      <Container className="mt-3 mb-5">
        <h3>{dictionary[language]["Enrollment form"]}</h3>
        <Button type="button" variant="primary" onClick={addMemberHandler}>
          {dictionary[language]["Add more teammates form"]}
        </Button>
        <Form className="mt-5" onSubmit={submitHandler}>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              {dictionary[language]["Team name"]}:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="name"
                placeholder="Enter your team"
                className="form-control"
                onChange={(e) => setTeamNam(e.target.value)}
              />
            </Col>
          </Form.Group>
          {inputError.hasError && (
            <h6 className="text-center text-danger">
              {inputError.errorMessage}
            </h6>
          )}
          {isLoading && <Loader />}
          {!isLoading && hasError && finished && !inputError.hasError && (
            <h6 className="text-center text-danger">{errorMessage}</h6>
          )}
          {!isLoading && !hasError && finished && !inputError.hasError && (
            <h6 className="text-center text-success">
              Request sent succesfully, please wait for admin's approval{" "}
            </h6>
          )}
          <Wrapper>
            <h5 className="text-center">Member number: {membersNumber}</h5>
            {form}
          </Wrapper>
          <Button type="submit" variant="primary" className="px-4">
            {dictionary[language]["Submit"]}
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default EnrollForm;
