import { Button, Modal, Form, Row ,Spinner} from "react-bootstrap";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { deActivateAccounts } from "../../lib/sadm-api";
import { useDispatch } from "react-redux";
import { notificationActions } from "../../store/notification";
import { useSelector } from "react-redux";

const DeleteAdmin = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { token } = useSelector((state) => state.auth);
  const { status, message } = useSelector((state) => state.notification);
  const { language, dictionary } = useSelector((state) => state.language)
  const dispatch = useDispatch();

  const selectRows = props.selectRows;
  const hasChosen = selectRows.length > 0;

  const onDeleteHandler = async (event) => {
    event.preventDefault();
    console.log(props.selectRows);
    const ids = selectRows.map((account) => account.id);
    const loadingComponent = <Spinner animation="border" />;
    dispatch(notificationActions.pending(loadingComponent));
    try {
      await deActivateAccounts(token, { ids });
      dispatch(notificationActions.success("SUCCESSFULLY DELETED ACCOUNT"));
      //Reload account list
      props.onReload();
    } catch (error) {
      const displayError = <p className="text-danger text-center">{error.message}</p>
      dispatch(notificationActions.fail({
        inputType: "SERVER",
        errorMessage: displayError
      }));
    }
  };
  return (
    <>
      <Button
        disabled={!hasChosen}
        className="btn btn-danger"
        onClick={handleShow}
      >
       {dictionary[language]['Disable selected account(s)']}
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p>Are you sure to delete the following:</p>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* Display accounts selected for delete */}
          <DataTable
            columns={[
              {
                name: "Id",
                selector: (row) => row.id,
                sortable: true,
              },
              {
                name: "Email",
                selector: (row) => row.email,
                sortable: true,
                grow: 2,
              },
            ]}
            data={selectRows}
          ></DataTable>
          <div className="m-3 text-end">
            <i className="text-danger">
              {selectRows.length} account(s) will be deleted
            </i>
          </div>
          <Form onSubmit={onDeleteHandler}>
            <Row className="mb-3 justify-content-center">
              {status === "PENDING" && message}
              {status === "SUCCESS" && message}
              {status === "FAIL" &&
                message.inputType === "SERVER" &&
                message.errorMessage}
            </Row>
            {status !== "PENDING" && (
              <Button className="w-100" variant="danger" type="submit">
                Delete
              </Button>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteAdmin;
