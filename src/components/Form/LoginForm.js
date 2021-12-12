import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Spinner } from "react-bootstrap";
import classes from "./LoginForm.module.css";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendLoginRequest } from "../../store/auth";
import { notificationActions } from "../../store/notification";

const LoginForm = () => {

  const emailInput = useRef();
  const passwordInput = useRef();

  //Auth context
  const dispatch = useDispatch();
  const { status,message:errorMessage } = useSelector((state) => state.notification);
  const isLoading = status === "PENDING";
  const hasError = status === "FAIL"

   const { language, dictionary } = useSelector((state) => state.language)
  


  //Send login request
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInput.current.value;
    const enteredPassword = passwordInput.current.value;
    
    // Email not valid
    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(enteredEmail))){
      return dispatch(notificationActions.fail("Email format is not valid"))
    }
    if(enteredPassword.length <= 8){
      return dispatch(notificationActions.fail("Password length must be greater than 8"))
    }
    dispatch(sendLoginRequest({ enteredEmail, enteredPassword }));
  };


  // Clean notification context after the component is unmounted
  useEffect(()=>{
    return ()=>{
      dispatch(notificationActions.reset())
    }
  },[])

  return (
    <>
      
      <div className={`p-3 mx-auto ${classes["my-form-wrapper"]}`}>
        <h3 className="p-3 text-center">{dictionary[language]['Login to your account']}</h3>
        {hasError && <p className="text-danger text-center">{errorMessage}</p>}
        <Form onSubmit={submitHandler}>
          <Form.Group className={`mb-3`} controlId="formBasicEmail">
            <Form.Label>{dictionary[language]['Account']} Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              ref={emailInput}
            />
          </Form.Group>

          <Form.Group className={`mb-3`} controlId="formBasicPassword">
            <Form.Label>{dictionary[language]['Password']}</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={passwordInput}
            />
          </Form.Group>
          <div className="text-center">
            {!isLoading && (
              <Button
                className={`mb-1 w-100 btn-primary  `}
                type="submit"
              >
                {dictionary[language]['Login']}
              </Button>
            )}
            {isLoading && (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </div>
        </Form>
      </div>
    </>
  );
};

export default LoginForm;
