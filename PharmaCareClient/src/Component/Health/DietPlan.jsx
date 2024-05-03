import React, { useEffect, useState } from "react";
import { getData, postData, deleteData } from '../../Helper/Axios';
import { Footer } from "../Footer";
import { Header } from "../Header";
import DataTable from 'react-data-table-component';
import FilterData from "../../Helper/FilterData";

import '../../basic.css';

export const DietPlan = (props) => {
  const [data, setData] = useState([]);
  const fatchData = async () => {
    const response = await getData({
      "url": "home/dietplans"
    });
    const data = await response.json()
    setData(data);
  };

  useEffect(() => {
    fatchData();
  }, []);


  const ExpandedComponent = ({ data }) =>
    <div className="list-container">
      <div className="footer-brand">
        <li className="footer-item logo" >
          <span className="span">Plan Name</span> : <span>{data.planName}</span>
        </li>
        <li className="footer-item logo" >
          <span className="span">Overview</span> : <span>{data.overwiew}</span>
        </li>
        <li className="footer-item logo" >
          <span className="span">Target Audience</span> : <span>{data.targetAudience}</span>
        </li>
        <li className="footer-item logo" >
          <span className="span">Duration</span> : <span>{data.duration}</span>
        </li>
        <li className="footer-item logo" >
          <span className="span">Meal Frequency</span> : <span>{data.mealFrequency}</span>
        </li>
        <li className="footer-item logo" >
          <span className="span">Daily Calorie Intake</span> : <span>{data.dailyCalorieIntake}</span>
        </li>
        <li className="footer-item logo" >
          <span className="span">Macronutrient Distribution</span> : <span>{data.macronutrientDistribution}</span>
        </li>
        <li className="footer-item logo" >
          
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
      name: 'PLAN NAME',
      selector: row => row.planName,
      sortable: true,
    },
    {
      name: 'OVERVIEW',
      selector: row => row.overwiew,
      sortable: true,
    },
    {
      name: 'TARGET AUDIENCE',
      selector: row => row.targetAudience,
      sortable: true,
    },
    {
      name: 'DURATION',
      selector: row => row.duration,
      sortable: true,
    },

    {
      name: 'MEAL FREQUENCY',
      selector: row => row.mealFrequency,
      sortable: true,
    },
    {
      name: 'DAILY CALORIES INTAKE',
      selector: row => row.dailyCalorieIntake,
      sortable: true,
    },
    {
      name: 'MACRONUTRIENT DISTRIBUTION',
      selector: row => row.macronutrientDistribution,
      sortable: true,
    },
    {
      name: 'CREATED TIME',
      selector: row => row.createdTime,
      sortable: true,
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
                  title="DIET PLAN"
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