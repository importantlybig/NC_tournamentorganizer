import { Route, Redirect } from "react-router";
import Sadm from "./Sadm";
import CreateTournament from "./CreateTournament";
import MyTournament from "./MyTournament";
import Profile from "./Profile";

const User = (props) => {
  return (
    <>
	 <Route path="/user/profile">
        <Profile/>
      </Route>
      <Route path="/user/createtournament">
        <CreateTournament/>
      </Route>
      <Route path="/user/mytournament">
        <MyTournament />
      </Route>
	  <Route path="/user/sadm">
		  {props.role === 'SUPER_ADMIN' ? <Sadm/> : <Redirect to="/welcome"/>}
      </Route>
    </>
  );
};

export default User;
