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

export const ListAppointments = ({ data, setLoading }) => {
  const [isSignedIn, setIsSignedIn] = useState(
    localStorage.getItem("token") || false
  );
  const [islogin, setislogin] = useState(localStorage.getItem("token"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [count, setCount] = useState();

  // Enum for AppointmentStatus
  const AppointmentStatus = {
    PENDING: 'PENDING',
    CONFIRMED: 'CONFIRMED',
    COMPLETED: 'COMPLETED',
    REJECTED: 'REJECTED'
  };

  const navigate = useNavigate();

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
    if ('Delete Appointment Successfull!!' == s || 'Update Appointment Successfull!!' == s) {
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
      "url": `appointment/delete/${row.id}`
    });
    const data = await response.json();

    if (response.status == 200) {
      onToast("Delete Appointment Successfull!!")
      window.location.reload();
    } else {
      onToast("Something went wrong!!")
    }
  }

  const handleEditRow = async (row) => {
    const response = await postData({
      "url": "appointment/update",
      "data": row,
      "isJson": true
    });
    const data = await response.json();

    if (response.status == 200) {
      onToast("Update Appointment Successfull!!")
      window.location.reload();
    } else {
      onToast("Something went wrong!!")
    }
  }


  const ExpandedComponent = ({ data }) =>
    <div className="list-container">
      <div className="footer-brand">
        <li className="footer-item logo">
          <span className="span">User Name</span> : <span>{data.user.name}</span>
        </li>
        <li className="footer-item logo">
          <span className="span">Consultation Type</span> : <span>{data.consultationType}</span>
        </li>
        <li className="footer-item logo">
          <span className="span">Status</span> : <span>{data.status}</span>
        </li>
        <li className="footer-item logo">
          <span className="span">Appointment Date</span> : <span>{data.appointmentDate}</span>
        </li>
        <li className="footer-item logo">
          <span className="span">Doctor Name</span> : <span>{data.doctor.name}</span>
        </li>
        <li className="footer-item logo">
          <span className="span">Doctor Experience</span> : <span>{data.doctor.experience}</span>
        </li>
        <li className="footer-item logo">
          <span className="span">Doctor Specialization</span> : <span>{data.doctor.specialization}</span>
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
      name: 'USER NAME',
      selector: row => row.user.name,
      sortable: true,
    },
    {
      name: 'CONSULTATION_TYPE',
      selector: row => row.consultationType,
      sortable: true,
    },
    {
      name: 'STATUS',
      selector: row => row.status,
      sortable: true,
      cell: row => (
        <select value={row.status} onChange={e => handleInputChange(e, row.id, 'status')} >
          <option value={AppointmentStatus.PENDING}>{AppointmentStatus.PENDING}</option>
          <option value={AppointmentStatus.CONFIRMED}>{AppointmentStatus.CONFIRMED}</option>
          <option value={AppointmentStatus.COMPLETED}>{AppointmentStatus.COMPLETED}</option>
          <option value={AppointmentStatus.REJECTED}>{AppointmentStatus.REJECTED}</option>
        </select>
      ),
    },
    {
      name: 'APPOINTMENT DATE',
      selector: row => row.appointmentDate,
      sortable: true,
    },
    {
      name: 'DOCTOR NAME',
      selector: row => row.doctor.name,
      sortable: true,
    },
    {
      name: 'DOCTOR EXPRIENCE',
      selector: row => row.doctor.experience,
      sortable: true,
    },
    {
      name: 'DOCTOR SPECIALIZATION',
      selector: row => row.doctor.specialization,
      sortable: true,
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
                  title="APPOINTMENTS"
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