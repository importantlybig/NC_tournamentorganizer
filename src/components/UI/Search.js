import { useRef } from "react";
import { useSelector } from "react-redux";
import { Row, InputGroup, Button, FormControl, Form } from "react-bootstrap";
const Search = (props) => {
  const { language, dictionary } = useSelector((state) => state.language)
  const searchKeywordInputRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    props.searchHandler(searchKeywordInputRef.current.value);
  };
  return (
    <Row className="mt-3 justify-content-end">
      <Form onSubmit={onSubmitHandler} style={{ "max-width": "25em" }}>
        <InputGroup className={`mb-3`} >
          <FormControl
            aria-label="Text input with dropdown button"
            placeholder={dictionary[language]['Enter tournament name']}
            as="input"
            defaultValue={props.defaultKeyword}
            ref={searchKeywordInputRef}
          />
          <Button variant="primary" type="submit">
            {" "}
            <i class="fas fa-search"></i>
          </Button>
        </InputGroup>
      </Form>
    </Row>
  );
};

export default Search;
