import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';

import { Footer } from "../Footer";
import { Header } from "../Header";
import FilterData from "../../Helper/FilterData";
import { getData, postData, deleteData } from '../../Helper/Axios';


import '../../basic.css';

export const UserAppointment = (props) => {

  const [isSignedIn, setIsSignedIn] = useState(
    localStorage.getItem("token") || false
  );
  const [islogin, setislogin] = useState(localStorage.getItem("token"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [count, setCount] = useState();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fatchData = async () => {
    const response = await getData({
      "url": "appointment/all"
    });
    const data = await response.json()
    setData(data);
  };

  useEffect(() => {
    fatchData();
  }, []);


  const ExpandedComponent = ({ data }) =>
    <div className="container">
      <div className="footer-brand">
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
        <li className="footer-item logo">
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
      name: 'CONSULTATION_TYPE',
      selector: row => row.consultationType,
      sortable: true,
    },
    {
      name: 'STATUS',
      selector: row => row.status,
      sortable: true,
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
    }
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
    rowsPerPageText: 'Rows per page',
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
                  title="DOCTOR APPOINTMENTS"
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