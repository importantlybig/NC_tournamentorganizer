import React, { useEffect, useReducer } from "react";
import {
  Dropdown,
  FormControl,
  InputGroup,
  DropdownButton,
  Row,
} from "react-bootstrap";
import { useSelector } from "react-redux";
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
//props:
  // props.hasSort      - Whether to use the sorting feature of this component (true by default)
  // props.initalFilter - Provide inital state of filter 
  // props.onFilterList - for lifting the state up , upper component will use the state to implement filter algorithm

const AccountFilter = (props) => {
  const [filterState,dispatch] = useReducer(filterReducer, initalFilterState);
  const {sortBy,sortOrder,searchBy,searchKeyword} = filterState

  const {language,dictionary} = useSelector(state=>state.language)

const keyName={
  id:"#ID",
  firstName:dictionary[language]['First name'],
  lastName: dictionary[language]['Last name'],
  email: "Email"
}

// Lift the filter state up 
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
  useEffect(()=>{
    props.onFilterList(filterState)
  },[filterState])

  return (
    <>
      <Row className="justify-content-end">
        {props.hasSort && <InputGroup className={`mb-3 ${classes["filter-input-group"]}`}>
          <DropdownButton
            variant="outline-secondary"
            title={`Sort by: ${sortBy}`}
            id="input-group-dropdown-2"
            align="end"
            onSelect={onSortByHandler}
          >
            <Dropdown.Item eventKey="#ID">id</Dropdown.Item>
            <Dropdown.Item eventKey="firstName">{dictionary[language]["First name"]}</Dropdown.Item>
            <Dropdown.Item eventKey="lastName">{dictionary[language]["Last name"]}</Dropdown.Item>
            <Dropdown.Item eventKey="email">Email</Dropdown.Item>
            <Dropdown.Item eventKey="createdAt">{dictionary[language]["Create-date"]}</Dropdown.Item>
            <Dropdown.Item eventKey="updatedAt">{dictionary[language]["Updated-date"]}</Dropdown.Item>
          </DropdownButton>
          <DropdownButton
            variant="outline-secondary"
            title={`${sortOrder}`}
            id="input-group-dropdown-2"
            align="end"
            onSelect={onSortOrderHandler}
          >
            <Dropdown.Item eventKey="Ascending">{dictionary[language]["Ascending"]}</Dropdown.Item>
            <Dropdown.Item eventKey="Descending" >{dictionary[language]["Descending"]}</Dropdown.Item>
          </DropdownButton>
        </InputGroup>}

        <InputGroup className={`mb-3 ${classes["filter-input-group"]}`}>
          <FormControl
            aria-label="Text input with dropdown button"
            placeholder={dictionary[language]["Keyword"]}
            as="input"
            onChange={onSearchKeyword}
          />
          <DropdownButton
            variant="outline-secondary"
            title={`${dictionary[language]["Search by"]}: ${keyName[searchBy]}`}
            id="input-group-dropdown-2"
            align="end"
            onSelect={onSearchByHandler}
            value={searchKeyword}
          >
            <Dropdown.Item eventKey="id" >#ID</Dropdown.Item>
            <Dropdown.Item eventKey="firstName" >{dictionary[language]["First name"]}</Dropdown.Item>
            <Dropdown.Item eventKey="lastName" >{dictionary[language]["Last name"]}</Dropdown.Item>
            <Dropdown.Item eventKey="email">Email</Dropdown.Item>
          </DropdownButton>
        </InputGroup>
      </Row>
    </>
  );
};

export default React.memo(AccountFilter);
