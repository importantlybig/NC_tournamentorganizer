import Button from "@restart/ui/esm/Button";
import { Card } from "react-bootstrap";
import classes from "./AccountItem.module.css";

const AccountItem = (props) => {
  return (
    <Card className="mt-3">
      <Card.Header className={classes["my-card-header"]}>
        <div className={`${classes["header-item"]}`}>ID: #{props.id}</div>
        <div className={classes["header-item"]}>First Name: {props.firstName}</div>
        <div className={classes["header-item"]}>Last Name: {props.lastName}</div>

        <div className={classes["header-item"]}>
          Email: {props.email}
        </div>
        <div className={classes["header-item"]}>
          Created-at: 19:00 17/7/2021
        </div>
        <div className={classes["header-item"]}>
          Last-modified: 19:00 17/7/2021
        </div>
        
        <div className={classes["header-item-control"]}>
          <Button className="btn btn-danger">Remove</Button>
        </div>
      </Card.Header>
    </Card>
  );
};

export default AccountItem;
