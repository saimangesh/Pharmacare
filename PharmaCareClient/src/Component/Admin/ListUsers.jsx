import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { ToastContainer, toast } from 'react-toastify';

import { Footer } from "../Footer";
import { Header } from "../Header";
import FilterData from "../../Helper/FilterData";
import { getData, postData, deleteData } from '../../Helper/Axios';

import '../../basic.css';

export const ListUsers = ({ data, setLoading }) => {
  const [isSignedIn, setIsSignedIn] = useState(
    localStorage.getItem("token") || false
  );
  const [islogin, setislogin] = useState(localStorage.getItem("token"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [count, setCount] = useState();
  const navigate = useNavigate();

  // Enum for UserRole
  const UserRole = {
    USER: 'USER',
    ADMIN: 'ADMIN',
    DOCTOR: 'DOCTOR'
  };

  const [pdata, setData] = useState(data);
  const [updatedRows, setUpdatedRows] = useState([]);

  const handleInputChange = (e, id, key) => {
    const newData = [...data];
    const index = newData.findIndex(item => item.id == id);
    newData[index][key] = e.target.value;
    setData(newData);

    const updatedRow = { id, [key]: e.target.value };
    if (!updatedRows.some(row => row.id == id)) {
      setUpdatedRows([...updatedRows, updatedRow]);
    } else {
      const updatedRowsCopy = [...updatedRows];
      const updatedRowIndex = updatedRowsCopy.findIndex(row => row.id == id);
      updatedRowsCopy[updatedRowIndex][key] = e.target.value;
      setUpdatedRows(updatedRowsCopy);
    }
  };

  const onToast = (s) => {
    if ('Delete User Successfull!!' == s || 'Update User Successfull!!' == s) {
      toast.success(s, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(s, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const handleDeleteRow = async (row) => {
    const response = await deleteData({
      "url": `user/delete/${row.id}`
    });
    const data = await response.json();

    if (response.status == 200) {
      onToast("Delete User Successfull!!")
      window.location.reload();
    } else {
      onToast("Something went wrong!!")
    }
  }

  const handleEditRow = async (row) => {
    const response = await postData({
      "url": "user/update",
      "data": row,
      "isJson": true
    });
    const data = await response.json();

    if (response.status == 200) {
      onToast("Update User Successfull!!")
      window.location.reload();
    } else {
      onToast("Something went wrong!!")
    }
  }

  const ExpandedComponent = ({ data }) =>
    <div className="list-container">
      <div className="footer-brand">
        <li className="footer-item logo">
          <span className="span">Name</span> : <span>{data.name}</span>
        </li>
        <li className="footer-item logo">
          <span className="span">User Name</span> : <span>{data.username}</span>
        </li>
        <li className="footer-item logo">
          <span className="span">Role</span> : <span>{data.role}</span>
        </li>
        <li className="footer-item logo">
          <span className="span">Date of birth</span> : <span>{data.dateOfBirth}</span>
        </li>
        <li className="footer-item logo">
          <span className="span">Shipping Address</span> : <span>{data.shippingAddress}</span>
        </li>
        <li className="footer-item logo">
          <span className="span">Billing Address</span> : <span>{data.billingAddress}</span>
        </li>
      </div>
    </div>
    ;


  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'NAME',
      selector: row => row.name,
      sortable: true,
      cell: row => <input value={row.name} onChange={e => handleInputChange(e, row.id, 'name')} />,
    },
    {
      name: 'USER NAME',
      selector: row => row.username,
      sortable: true,
      cell: row => <input value={row.username} onChange={e => handleInputChange(e, row.id, 'username')} />,
    },
    {
      name: 'ROLE',
      selector: row => row.role,
      sortable: true,
      cell: row => (
        <select value={row.role} onChange={e => handleInputChange(e, row.id, 'role')} >
          <option value={UserRole.USER}>{UserRole.USER}</option>
          <option value={UserRole.ADMIN}>{UserRole.ADMIN}</option>
          <option value={UserRole.DOCTOR}>{UserRole.DOCTOR}</option>
        </select>
      ),
    },
    {
      name: 'DATE OF BIRTH',
      selector: row => row.dateOfBirth,
      sortable: true,
      cell: row => <input value={row.dateOfBirth} onChange={e => handleInputChange(e, row.id, 'dateOfBirth')} />,
    },
    {
      name: 'Shipping Address',
      selector: row => row.shippingAddress,
      sortable: true,
      cell: row => <input value={row.shippingAddress} onChange={e => handleInputChange(e, row.id, 'shippingAddress')} />,
    },
    {
      name: 'Billing Address',
      selector: row => row.billingAddress,
      sortable: true,
      cell: row => <input value={row.billingAddress} onChange={e => handleInputChange(e, row.id, 'billingAddress')} />,
    },
    {
      name: 'EDIT',
      cell: row => <button onClick={() => handleEditRow(row)}>Edit</button>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: 'DELETE',
      cell: row => <button onClick={() => handleDeleteRow(row)}>Delete</button>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );

  const filteredItems = data.filter(
    item =>
      JSON.stringify(item)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1
  );

  const subHeaderComponent = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterData
        onFilter={e => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const paginationComponentOptions = {
    rowsPerPageText: 'Rows Per Page',
    rangeSeparatorText: 'of',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'All',
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-11">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-filter-info"></div>
                <DataTable
                  title="USERS"
                  columns={columns}
                  data={filteredItems}
                  defaultSortField="id"
                  striped
                  pagination
                  subHeader
                  subHeaderComponent={subHeaderComponent}
                  highlightOnHover
                  paginationComponentOptions={paginationComponentOptions}
                  expandableRows
                  expandableRowsComponent={ExpandedComponent}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};