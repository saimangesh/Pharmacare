import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import DatetimePicker from 'react-datetime-picker';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker'
import { addDays, isValid, setHours, setMinutes } from "date-fns";

import { Footer } from "../Footer";
import { Header } from "../Header";
import { getData, postData, deleteData } from '../../Helper/Axios';
import FilterData from "../../Helper/FilterData";
import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css"
import '../../FilterData.css';
import '../../basic.css';

export const BookAppointment = () => {

  const [isSignedIn, setIsSignedIn] = useState(
    localStorage.getItem("token") || false
  );
  const [islogin, setislogin] = useState(localStorage.getItem("token"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [count, setCount] = useState();
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const fatchData = async () => {
    const response = await getData({
      "url": "doctor/all"
    });
    const data = await response.json()
    setRecords(data);
  };

  useEffect(() => {
    fatchData();
  }, []);

  const [filters, setFilters] = useState({
    consultationType: '',
    specialization: '',
    hospitalName: '',
    doctorName: '',
  });

  const [appointmentData, setAppointmentData] = useState({
    selectedDoctor: null,
    appointmentDate: '',
  });

  const handleFilterChange = (fieldName, value) => {
    setFilters({
      ...filters,
      [fieldName]: value,
    });
  };

  const handleDoctorSelect = (selectedDoctor) => {
    setAppointmentData({
      ...appointmentData,
      selectedDoctor,
    });
  };

  const handleDateChange = (event) => {
    setAppointmentData({
      ...appointmentData,
      appointmentDate: event.target.value,
    });
  };

  const filteredDoctors = records.filter((doctor) => {
    return (
      (filters.consultationType == '' || doctor.consultationType == filters.consultationType) &&
      (filters.specialization == '' || doctor.specialization == filters.specialization) &&
      (filters.hospitalName == '' || doctor.hospitalName == filters.hospitalName) &&
      (filters.doctorName == '' || doctor.name == filters.doctorName)
    );
  });

  
  const onToast = (s) => {
    if ('Appointment Successfull!!' == s) {
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


  const handleBookAppointment = async () => {
    if (appointmentData.appointmentDate === "") {
      onToast("Please choose Appointment Date!!");
    } else {
      const response = await postData({
        "url": "appointment/create",
        "data": {
          doctorId: appointmentData.selectedDoctor.id,
          consultationType: appointmentData.selectedDoctor.consultationType,
          appointmentDate: appointmentData.appointmentDate,
          date: appointmentData.date,
          status: 'PENDING'
        },
        "isJson": true
      });
      const data = await response.json();

      if (response.status == 200) {
        onToast('Appointment Successfull!!');
        window.location.href = "/appointments";
      } else {
        onToast("Appointment Failed, due to aleady you might have an appointment in same time !!");
      }
    }
  };

  const [date, setDate] = useState(new Date());

  const setAppointmentDate = (event) => {
    const year = event.getFullYear();
    const month = String(event.getMonth() + 1).padStart(2, '0');
    const day = String(event.getDate()).padStart(2, '0');
    const hours = String(event.getHours()).padStart(2, '0');
    const minutes = String(event.getMinutes()).padStart(2, '0');
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
    setSelectedDate(event);
    setAppointmentData({
      ...appointmentData,
      appointmentDate: formattedDate
    });
  };


  const ExpandedComponent = ({ data }) =>
    <div className="container">
      <div className="footer-brand">
        <li className="footer-item logo">
          <span className="span">Consultation Type</span> : <span>{data.consultationType}</span>
        </li>
        <li className="footer-item logo">
          <span className="span">Doctor Name</span> : <span>{data.name}</span>
        </li>
        <li className="footer-item logo">
          <span className="span">Doctor Specialization</span> : <span>{data.specialization}</span>
        </li>
        <li className="footer-item logo">

        </li>
      </div>
    </div>
    ;


  const columns = [
    {
      name: 'CONSULTATION_TYPE',
      selector: row => row.consultationType,
      sortable: true,
    },
    {
      name: 'DOCTOR NAME',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'DOCTOR SPECIALIZATION',
      selector: row => row.specialization,
      sortable: true,
    }
  ];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );

  const filteredItems = records.filter(
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
                <section id="products" className="section product">
                  <div className="container">
                    <p className="section-subtitle"> -- BOOK DOCTOR APPOINTMENT --</p>


                    <div>
                      <div>
                        <label>Consultation Type:</label>
                        <select onChange={(e) => handleFilterChange('consultationType', e.target.value)}>
                          <option value="">Select Consultation Type</option>
                          {[...new Set(filteredDoctors.map((doctor) => doctor.consultationType))].map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>

                        <label>Specialization:</label>
                        <select onChange={(e) => handleFilterChange('specialization', e.target.value)}>
                          <option value="">Select Specialization</option>
                          {[...new Set(filteredDoctors.map((doctor) => doctor.specialization))].map((spec) => (
                            <option key={spec} value={spec}>
                              {spec}
                            </option>
                          ))}
                        </select>

                        <label>Hospital Name:</label>
                        <select onChange={(e) => handleFilterChange('hospitalName', e.target.value)}>
                          <option value="">Select Hospital Name</option>
                          {[...new Set(filteredDoctors.map((doctor) => doctor.hospitalName))].map((hospital) => (
                            <option key={hospital} value={hospital}>
                              {hospital}
                            </option>
                          ))}
                        </select>
                      </div>



                      <div>
                        <div></div>
                        <h3></h3>
                        <ul>
                          <DataTable
                            title="CHOOSE DOCTOR FOR APPOINTMENT"
                            columns={columns}
                            data={filteredDoctors}
                            defaultSortField="id"
                            striped
                            pagination
                            subHeader
                            subHeaderComponent={subHeaderComponent}
                            highlightOnHover
                            paginationComponentOptions={paginationComponentOptions}
                            expandableRows
                            expandableRowsComponent={ExpandedComponent}
                            onRowClicked={handleDoctorSelect}
                          />
                        </ul>
                      </div>

                      {appointmentData.selectedDoctor && (

                        <div className="col-lg-6">
                          <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">
                            Appointment Details
                          </div>

                          <div className="p-4">
                            <strong className="text-muted">Doctor Name:</strong> {appointmentData.selectedDoctor.name}
                          </div>
                          <div className="p-4">
                            <strong className="text-muted">Doctor Specialization:</strong> {appointmentData.selectedDoctor.specialization}
                          </div>

                          <div className="p-4">
                            <strong className="text-muted">Appointment Date: </strong>
                            <DatePicker
                              showTimeSelect
                              selected={selectedDate}
                              onChange={date => setAppointmentDate(date)}
                              minDate={new Date()}
                              maxDate={addDays(new Date(), 5)}
                              minTime={new Date(0, 0, 0, 10, 0)}
                              maxTime={new Date(0, 0, 0, 19, 0)}
                              timeIntervals={30}
                              dateFormat="dd-MM-YYYY hh:mm aa"
                            />
                          </div>

                          <div className="p-4">
                            <button onClick={handleBookAppointment}>Book Appointment</button>
                          </div>

                        </div>
                      )}
                    </div>

                  </div>
                </section>


              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};