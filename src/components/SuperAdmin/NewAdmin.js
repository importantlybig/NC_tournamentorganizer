import { useRef, useState } from "react";
import { Button, Modal, Form, Row, Col, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNewAccountAPI } from "../../lib/sadm-api";
import { notificationActions } from "../../store/notification";
import {
  isEmpty,
  isEmailValid,
  isPasswordContentValid,
  isRePasswordMatch,
  isPasswordLengthValid,
} from "../../utils/inputValidation";

const NewAdmin = (props) => {
  const dispatch = useDispatch();
  const { language, dictionary } = useSelector((state) => state.language)

  const [show, setShow] = useState(false);
  const handleClose = () => {
    dispatch(notificationActions.reset());
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const { status, message } = useSelector((state) => state.notification);
  const { token } = useSelector((state) => state.auth);

  const emailInput = useRef();
  const passwordInput = useRef();
  const rePasswordInput = useRef();
  const firstNameInput = useRef();
  const lastNameInput = useRef();

  const onSubmitHander = async (event) => {
    event.preventDefault();
    // Fetch input value
    const enteredEmail = emailInput.current.value;
    const enteredPassword = passwordInput.current.value;
    const enteredRePassword = rePasswordInput.current.value;
    const enteredFirstName = firstNameInput.current.value;
    const enteredLastName = lastNameInput.current.value;

    //Validate empty email
    if (isEmpty(enteredEmail)) {
      dispatch(
        notificationActions.fail({
          inputType: "EMAIL",
          errorMessage: `Email field must not be empty`,
        })
      );
      return;
    }
    //Validate email
    if (!isEmailValid(enteredEmail)) {
      dispatch(
        notificationActions.fail({
          inputType: "EMAIL",
          errorMessage: "Email has invalid format",
        })
      );
      return;
    }

    //Validate empty password
    if (isEmpty(enteredPassword)) {
      dispatch(
        notificationActions.fail({
          inputType: "PASSWORD",
          errorMessage: `Password field must not be empty`,
        })
      );
      return;
    }

    //Validate password length
    if (!isPasswordLengthValid(enteredPassword)) {
      dispatch(
        notificationActions.fail({
          inputType: "PASSWORD",
          errorMessage: `Passworld length must be greater than 8`,
        })
      );
      return;
    }

    //Validate password content
    if (
      !isPasswordContentValid(
        enteredFirstName,
        enteredLastName,
        enteredPassword
      )
    ) {
      dispatch(
        notificationActions.fail({
          inputType: "PASSWORD",
          errorMessage: `Password must not be first name or lastname`,
        })
      );
      return;
    }

    //Validate re-entered password match
    if (!isRePasswordMatch(enteredPassword, enteredRePassword)) {
      dispatch(
        notificationActions.fail({
          inputType: "RE-PASSWORD",
          errorMessage: `Re-enterd password does not match password`
        })
      );
      return;
    }

    try {
      const loadingComponent = <Spinner animation="border" />;
      dispatch(notificationActions.pending(loadingComponent));
      console.log(
        enteredEmail,
        enteredPassword,
        enteredRePassword,
        enteredFirstName,
        enteredLastName
      );
      // Async code
      await createNewAccountAPI(
        {
          enteredEmail,
          enteredPassword,
          enteredFirstName,
          enteredLastName,
        },
        token
      );
      dispatch(notificationActions.success("ACCOUNT CREATED SUCCESSFULLY!"));
      //Reload account list
      props.onReload()
    } catch (error) {
      const displayError = <p className="text-danger text-center">{error.message}</p>
      dispatch(notificationActions.fail({
        inputType: "SERVER",
        errorMessage: displayError
      }));
    }
    //Inputs are validated are able to be sent to the server
    emailInput.current.value = "";
    passwordInput.current.value = "";
    rePasswordInput.current.value = "";
    firstNameInput.current.value = "";
    lastNameInput.current.value = "";

    //Reload account list
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {dictionary[language]['Create a new admin']} <i className="fas fa-user-plus"></i>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p>{dictionary[language]['Create new admin/organizer']}</p>
            <p className="h6">
              <em>(*): {dictionary[language]['Required field']}</em>
            </p>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form noValidate onSubmit={onSubmitHander}>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email(*)</Form.Label>
              <Form.Control
                type="email"
                placeholder="user1@nctournmanet.com"
                ref={emailInput}
                isInvalid={message.inputType === "EMAIL"}
                required
              />
              <Form.Control.Feedback type="invalid">
                {message.errorMessage}
              </Form.Control.Feedback>
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>{dictionary[language]['Password']}(*)</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={dictionary[language]['Enter password']}
                  ref={passwordInput}
                  required
                  isInvalid={message.inputType === "PASSWORD"}
                />
                <Form.Control.Feedback type="invalid">
                  {message.errorMessage}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridRePassword">
                <Form.Label>{dictionary[language]['Confirm password']}(*)</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={dictionary[language]['Confirm password']}
                  ref={rePasswordInput}
                  isInvalid={message.inputType === "RE-PASSWORD"}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {message.errorMessage}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>{dictionary[language]['First name']}</Form.Label>
              <Form.Control placeholder={dictionary[language]['Enter first name']} ref={firstNameInput} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>{dictionary[language]['Last name']}</Form.Label>
              <Form.Control placeholder={dictionary[language]['Enter last name']} ref={lastNameInput} />
            </Form.Group>

            <Row className="mb-3 justify-content-center">
              {status === "PENDING" && message}
              {status === "SUCCESS" && message}
              {status === "FAIL" &&
                message.inputType === "SERVER" &&
                message.errorMessage}
            </Row>
            {status !== "PENDING" && (
              <Button className="w-100" variant="primary" type="submit">
                {dictionary[language]['Submit']}
              </Button>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {dictionary[language]['Close']}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewAdmin;
