// Creating new account page
import { useCallback, useEffect, useState } from "react";
import { Container, Button,Badge } from "react-bootstrap";
import AccountFilter from "../../components/SuperAdmin/AccountFilter";
import NewAdmin from "../../components/SuperAdmin/NewAdmin";
import DataTable from "react-data-table-component";
import DeleteAdmin from "../../components/SuperAdmin/DeleteAdmin";
import { useSelector } from "react-redux";
import { getAllAccounts } from "../../lib/sadm-api";
import { downloadCSV } from "../../utils/exportFile.js";
import React from "react";
import { downloadJSON } from "../../utils/exportFile.js";
import EditAccount from '../../components/SuperAdmin/EditAccount';



// This page is for super admin only
let initAccountList = [];



const Sadm = () => {
  const [accountList, setAccountList] = useState(initAccountList);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loaded,setLoaded]= useState(false)
  const [toggledClearRows, setToggleClearRows] = React.useState(false);
  const [pending, setPending] = useState(true)

  console.log(accountList)
  const auth = useSelector((state) => state.auth);

  const { language, dictionary } = useSelector((state) => state.language)
  
  const columns = [
    {
      cell: (row) => <EditAccount onReload={reload}  account={row}></EditAccount>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: `${dictionary[language]['First name']}`,
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: `${dictionary[language]['Last name']}`,
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: `${dictionary[language]['Phone']}`,
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: `${dictionary[language]['Status']}`,
      cell: (row) =>   { return row.status ? <Badge bg="success">{dictionary[language]['Available']}</Badge> : <Badge bg="danger">{dictionary[language]['Disable']}</Badge>},
      sortable: true,
      sortFunction: row=> row.status
    }];
// Toggle the state so React Data Table changes to clearSelectedRows are triggered
const handleClearRows = () => {
  setToggleClearRows(toggledClearRows=>!toggledClearRows);
}

  const filterHandler = useCallback((filter) => {
    handleClearRows()
    let filteredAccountList = initAccountList;
    //Identify search keyword
    if (filter.searchKeyword !== "") {
      //If there is search input, skip the filter by input search
      filteredAccountList = initAccountList.filter((account) => {
        //Identify search category and find matched property including input keyword
        if(!account[filter.searchBy]){
          return false
        }
        return account[filter.searchBy]
          .toString()
          .toLowerCase()
          .includes(filter.searchKeyword.toLowerCase());
      });
    }
    setAccountList(filteredAccountList);
  
  }, [accountList]);
  const selectRowsChangeJHandler = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, [accountList]);
  //Export CSV and JSON buttons
  const ExportCSV = ({ onExport }) => (
    <Button onClick={(e) => onExport(e.target.value)}>{dictionary[language]['Export CSV']}</Button>
  );
  const ExportJSON = ({ onExport }) => (
    <Button onClick={(e) => onExport(e.target.value)}>{dictionary[language]['Export JSON']}</Button>
  );
  const actionsMemoCSV = React.useMemo(
    () => (
      <>
        <ExportCSV onExport={() => downloadCSV(accountList)} />
        <ExportJSON onExport={() => downloadJSON(accountList)} />
      </>
    ),
    [accountList,language]
  );

  //Reload the list after add or remove account
  const  reload = ()=>{
    handleClearRows()
    setPending(true)
    setLoaded(false)
  }

  //Load data
   useEffect(()=>{
    if(loaded === false){
      getAllAccounts(auth.token).then((data)=>{
        initAccountList = data
        console.log(data)
        setAccountList(data)
        setPending(false);
      }).catch(error=>{
        alert(error.message)
        setPending(false);
      })
      setLoaded(true)
    }
  },[loaded])
  return (
    <>
      <Container className="vh-100">
        <div className="display-3 my-5 text-center">{dictionary[language]['Account management page']}</div>
        <AccountFilter onFilterList={filterHandler}></AccountFilter>
        {/* <AccountList accounts={accountList}></AccountList> */}
        <DataTable
          columns={columns}
          data={accountList}
          pagination
          striped
          selectableRows
          onSelectedRowsChange={selectRowsChangeJHandler}
          actions={actionsMemoCSV}
          progressPending={pending}
          selectableRowDisabled={(row)=>{ return row.status === false || row.email === 'superadmin@gmail.com' }}
          clearSelectedRows={toggledClearRows}
        />
        <div className="d-flex justify-content-between mt-3">
          <DeleteAdmin onReload={reload}  selectRows={selectedRows}></DeleteAdmin>
          <NewAdmin onReload={reload} ></NewAdmin>
        </div>
      </Container>
    </>
  );
};

export default Sadm;
