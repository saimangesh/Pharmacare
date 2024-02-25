import axios from "axios";
import React, { useEffect, useState } from "react";
import { getData, postData, deleteData } from '../../Helper/Axios';
import { useNavigate } from "react-router-dom";
import { Footer } from "../Footer";
import { Header } from "../Header";
import styled from 'styled-components';
import DataTable from 'react-data-table-component';
import FilterData from "../../Helper/FilterData";

import '../../basic.css';

export const Doctor = (props) => {

  const [isSignedIn, setIsSignedIn] = useState(
    localStorage.getItem("token") || false
  );
  const [islogin, setislogin] = useState(localStorage.getItem("token"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [count, setCount] = useState();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const fatchData = async () => {
    const response = await getData({
      "url": "doctor/all"
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
          <span className="span">Name</span> : <span>{data.name}</span>
        </li>
        <li className="footer-item logo">
          <span className="span">Experience</span> : <span>{data.experience}</span>
        </li>
        <li className="footer-item logo">
          <span className="span">Specialization</span> : <span>{data.specialization}</span>
        </li>
        <li className="footer-item logo">
          <span className="span">Qualification</span> : <span>{data.qualification}</span>
        </li>
        <li className="footer-item logo">
          <span className="span">Hospital Name</span> : <span>{data.hospitalName}</span>
        </li>
        <li className="footer-item logo">
          <span className="span">Consultation Type</span> : <span>{data.consultationType}</span>
        </li>        
        <li className="footer-item logo">
          <span className="span">Appointment Date</span> : <span>{data.appointmentDate}</span>
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
      name: 'NAME',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'EXPRIENCE',
      selector: row => row.experience,
      sortable: true,
    },
    {
      name: 'SPECIALIZATION',
      selector: row => row.specialization,
      sortable: true,
    },
    {
      name: 'QUALIFICATION',
      selector: row => row.qualification,
      sortable: true,
    },
    {
      name: 'HOSPITAL NAME',
      selector: row => row.hospitalName,
      sortable: true,
    },
    {
      name: 'CONSULTATION_TYPE',
      selector: row => row.consultationType,
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
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
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
                  title="DOCTORS"
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