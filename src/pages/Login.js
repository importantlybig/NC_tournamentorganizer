import { Container } from "react-bootstrap";
import LoginForm from "../components/Form/LoginForm";
import classes from "./Login.module.css";

const Login = () => {
  // document.body.style.backgroundColor = "#0f2147";
  return (
    <Container className="vh-100">
      {/* <div className={`p-3 display-1  text-center ${classes["my-title"]}`}>
        netcompany
      </div> */}
      <h3 className={`p-3 mx-auto text-center ${classes["my-subtitle"]}`}>
        Tournament Organzier
      </h3>
      <LoginForm></LoginForm>
    </Container>
  );
};

export default Login;
