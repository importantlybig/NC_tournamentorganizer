import React, {  useReducer } from "react";
import {
  Dropdown,
  FormControl,
  InputGroup,
  DropdownButton,
  Row,
} from "react-bootstrap";
import classes from "./AccountFilter.module.css";

const initalFilterState = {
  sortBy: "firstName",
  sortOrder: "Descending",
  searchBy: "firstName",
  searchKeyword: "",
};


const filterReducer = (state, action) => {
  switch (action.type) {
    case "ORDER":
      return {
        ...state,
        sortOrder: action.payload.sortOrder === "Ascending" ? "Ascending" : "Descending",
      };
      case "SORT":
      return {
        ...state,
        sortBy: action.payload.sortBy
      } 
      case 'SEARCH-KEYWORD':
        return {
          ...state,
          searchKeyword: action.payload.searchKeyword
        }
      case 'SEARCH-BY':
        return {
          ...state,
          searchBy: action.payload.searchBy
        }
      default: 
        return {
         initalFilterState
      }
  }
};

const AccountFilter = (props) => {
  // Display search bar 
  // Display sort bar

  //Array of select category for search bar
  //Array of select category for sort bar


  const [filterState,dispatch] = useReducer(filterReducer, initalFilterState);
  const {sortBy,sortOrder,searchBy,searchKeyword} = filterState

// Lift the filter state up 
props.onFilterList(filterState)
// Lift the filter state up 

 const onSortByHandler = (eventKey) =>{
      dispatch({type:"SORT", payload:{sortBy:eventKey}})
    
    }  
 const onSortOrderHandler = (eventKey)=>{
      dispatch({type:"ORDER", payload:{sortOrder:eventKey}})
 }
 const onSearchByHandler = (eventKey) =>{
      dispatch({type:'SEARCH-BY',payload:{searchBy:eventKey}})
 }
 const onSearchKeyword = (event) =>{
    const enteredKeyword = event.target.value
    dispatch({type:"SEARCH-KEYWORD",payload:{searchKeyword:enteredKeyword}})
 }


  return (
    <>
      <Row className="justify-content-between">
        <InputGroup className={`mb-3 ${classes["filter-input-group"]}`}>
          <DropdownButton
            variant="outline-secondary"
            title={`Sort by: ${sortBy}`}
            id="input-group-dropdown-2"
            align="end"
            onSelect={onSortByHandler}
          >
            <Dropdown.Item eventKey="#ID">id</Dropdown.Item>
            <Dropdown.Item eventKey="firstName">First Name</Dropdown.Item>
            <Dropdown.Item eventKey="lastName">Last Name</Dropdown.Item>
            <Dropdown.Item eventKey="email">Email</Dropdown.Item>
            <Dropdown.Item eventKey="createdAt">Create-date</Dropdown.Item>
            <Dropdown.Item eventKey="updatedAt">Updated-date</Dropdown.Item>
          </DropdownButton>
          <DropdownButton
            variant="outline-secondary"
            title={`${sortOrder}`}
            id="input-group-dropdown-2"
            align="end"
            onSelect={onSortOrderHandler}
          >
            <Dropdown.Item eventKey="Ascending">Ascending</Dropdown.Item>
            <Dropdown.Item eventKey="Descending" >Descending</Dropdown.Item>
          </DropdownButton>
        </InputGroup>

        <InputGroup className={`mb-3 ${classes["filter-input-group"]}`}>
          <FormControl
            aria-label="Text input with dropdown button"
            placeholder="Name"
            as="input"
            onChange={onSearchKeyword}
          />
          <DropdownButton
            variant="outline-secondary"
            title={`Search by: ${searchBy}`}
            id="input-group-dropdown-2"
            align="end"
            onSelect={onSearchByHandler}
            value={searchKeyword}
          >
            <Dropdown.Item eventKey="id" >#ID</Dropdown.Item>
            <Dropdown.Item eventKey="firstName" >First Name</Dropdown.Item>
            <Dropdown.Item eventKey="lastName" >Last Name</Dropdown.Item>
            <Dropdown.Item eventKey="email">Email</Dropdown.Item>
          </DropdownButton>
        </InputGroup>
      </Row>
    </>
  );
};

export default React.memo(AccountFilter);
