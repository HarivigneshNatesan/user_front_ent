import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';
import DataTable from 'react-data-table-component';

export default function User() {

  const [userData, setUserData] = useState([]);
  const [duplicate, setDuplicate] = useState([]);

  const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;


  function callSearch(e) {
    e.preventDefault();
    const searchVal = e.target.value;

    if (searchVal === "") {
      setUserData(duplicate);
      return;
    }

    const filterData = userData.filter((item) => {

      if (item.name.toLowerCase()
        .includes(searchVal.toLowerCase())) { return item; }
    })

    setUserData(filterData);

    console.log(filterData);
  }


  useEffect(() => {
    axios.get('http://localhost:8080/user/allUsers').then((response) => {
      setUserData(response.data);
      setDuplicate(response.data);
    }).catch(error => {
      console.error(error);
    });
  }, [])

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
      reorder:true
    },
    {
      name: 'Sex',
      selector: (row) => row.sex,
      sortable: true,
      reorder:true
    },
    {
      name: 'Age',
      selector: (row) => row.age,
      sortable: true
    },
    {
      name: 'Mobile',
      selector: (row) => row.phone,
      sortable: true
    },
    {
      name: 'Email',
      selector: (row) => row.mail,
      sortable: true
    }
  ]



  return (
    <>
      <DataTable columns={columns}
        data={userData}
        pagination
        paginationPerPage={5}
        responsive
        paginationRowsPerPageOptions={[5, 10, 15]}
        fixedHeader
        fixedHeaderScrollHeight='400px'
        title="User List"
        expandableRows
        subHeader
        subHeaderComponent={<input type='text' placeholder='Search By Name' onChange={(e) => callSearch(e)} />}
        theme='default'
        striped="True"
        actions={<button onClick = {()=>window.print()}>Export</button>}
        expandableRowsComponent={ExpandedComponent} />
    </>
  )

}
