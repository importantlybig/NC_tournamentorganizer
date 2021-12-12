import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import { useState, useRef } from "react";
import { updateAccount } from "../../lib/sadm-api";
//import AccountFilter from "./AccountFilter";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { notificationActions } from "../../store/notification";
//import { isEmpty } from "../../utils/inputValidation";
const EditAccount = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
	dispatch(notificationActions.reset());  
	setShow(false)
	if(performUpdated){
		props.onReload()
	}
  };
  const handleShow = () => setShow(true);
  const [isEditMode, setEditMode] = useState(false);
  const { status, message } = useSelector((state) => state.notification);
  const { language, dictionary } = useSelector((state) => state.language)
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const firstNameInput = useRef();
  const lastNameInput = useRef();
  const addressInput = useRef();
  const phoneInput = useRef();
  const [performUpdated,setPerformUpdated] = useState(false)
  const [unlock,setUnlockAccount] = useState(false)


  const onSubmitHander = async (event) => {
    event.preventDefault();
    const enteredFirstName = firstNameInput.current.value;
    const enteredLastName = lastNameInput.current.value;
    const enteredAddress = addressInput.current.value;
    const enteredPhone = phoneInput.current.value;

    const updatedData = {
      firstName: enteredFirstName,
      lastName: enteredLastName,
      address: enteredAddress,
      phone: enteredPhone,
	  status: unlock ? true : null
    };

    dispatch(notificationActions.pending("SENDING REQUEST TO SERVER"));
    try {
      await updateAccount(token, updatedData, props.account.id);
      dispatch(notificationActions.success("ACCOUNT UPDATED SUCCESSFULLY"));
	  setPerformUpdated(true)
    } catch (error) {
	  const displayError = <p className="text-danger text-center">{error.message}</p>
      dispatch(notificationActions.fail({
        inputType: "SERVER",
        errorMessage: displayError
      }));
    }
  };

  const modeToggle = () => {
    setEditMode((prevState) => !prevState);
  };

  const disableToggle = () =>{
	setUnlockAccount((prevState)=> !prevState)
  }

  let displayUnclockToggle = false 
  if(props.account.status === true){
	displayUnclockToggle = false
  }else{
	displayUnclockToggle = isEditMode   
  }

  return (
    <>
      <Button onClick={handleShow} variant="info">
        {dictionary[language]['Edit']}
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p>{dictionary[language]["Edit account profile"]}</p>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form noValidate onSubmit={onSubmitHander}>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label={isEditMode ? dictionary[language]["Edit mode"] : dictionary[language]["Read-only mode"]}
                  onClick={modeToggle}
                />
              </Form.Group>
            </Row>
			<Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label= 'Unlock account'
				  onClick={disableToggle}
				  disabled={!displayUnclockToggle}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} xs="2" controlId="formGridID">
                <Form.Label>#ID</Form.Label>
                <Form.Control
                  type="input"
                  placeholder=""
                  required
                  readOnly={true}
                  value={props.account.id}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="user1@nctournmanet.com"
                  required
                  readOnly={true}
                  value={props.account.email}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>{dictionary[language]["First name"]}</Form.Label>
                <Form.Control
                  placeholder={dictionary[language]["First name"]}
                  ref={firstNameInput}
                  defaultValue={props.account.firstName}
                  readOnly={!isEditMode}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>{dictionary[language]["Last name"]}</Form.Label>
                <Form.Control
                  placeholder={dictionary[language]["Last name"]}
                  ref={lastNameInput}
                  defaultValue={props.account.lastName}
                  readOnly={!isEditMode}
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} className="mb-3" controlId="lastName">
                <Form.Label>{dictionary[language]["Address"]}</Form.Label>
                <Form.Control
                  placeholder={dictionary[language]["Address"]}
                  defaultValue={props.account.address}
                  readOnly={!isEditMode}
                  ref={addressInput}
                />
              </Form.Group>
            </Row>
            <Form.Group as={Col} className="mb-3" controlId="firstName">
              <Form.Label>{dictionary[language]["Phone"]}</Form.Label>
              <Form.Control
                placeholder={dictionary[language]["Phone"]}
                defaultValue={props.account.phone}
                readOnly={!isEditMode}
                ref={phoneInput}
              />
            </Form.Group>
            <Row className="mb-3 justify-content-center">
              {status === "PENDING" && message}
              {status === "SUCCESS" && message}
              {status === "FAIL" &&
                message.inputType === "SERVER" &&
                message.errorMessage}
            </Row>
            <Button
              disabled={!isEditMode}
              className="w-100"
              variant="success"
              type="submit"
            >
              {dictionary[language]["Save"]}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          {dictionary[language]["Close"]}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditAccount;
