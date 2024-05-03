import React, { useEffect, useState } from "react";
import { Footer } from "../Footer";
import { Header } from "../Header";
import DataTable from 'react-data-table-component';
import FilterData from "../../Helper/FilterData";
import { getData, postData, deleteData } from '../../Helper/Axios';

import '../../basic.css';

export const NutritionData = (props) => {
  const [data, setData] = useState([]);
  const fatchData = async () => {
    const response = await getData({
      "url": "home/nutritiondatas"
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
        <li className="footer-item logo">
          <span className="span">Category</span> : <span>{data.category}</span>
        </li>
        <li className="footer-item logo" >
          <span className="span">Food Item</span> : <span>{data.foodItem}</span>
        </li>
        <li className="footer-item logo">
          <span className="span">Overview</span> : <span>{data.overwiew}</span>
        </li>
        <li className="footer-item logo">
          <span className="span">Calories</span> : <span>{data.calories}</span>
        </li>
        <li className="footer-item logo" >
          <span className="span">Carbs</span> : <span>{data.carbs}</span>
        </li>
        <li className="footer-item logo">
          <span className="span">Dietary Fiber</span> : <span>{data.dietaryFiber}</span>
        </li>
        <li className="footer-item logo">
          <span className="span">Fats</span> : <span>{data.fats}</span>
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
      name: 'CATEGORY',
      selector: row => row.category,
      sortable: true,
    },
    {
      name: 'FOOD ITEM',
      selector: row => row.foodItem,
      sortable: true,
    },
    {
      name: 'OVERVIEW',
      selector: row => row.overwiew,
      sortable: true,
    },
    {
      name: 'CALORIES',
      selector: row => row.calories,
      sortable: true,
    },
    {
      name: 'CARBS',
      selector: row => row.carbs,
      sortable: true,
    },

    {
      name: 'DIETARY FIBER',
      selector: row => row.dietaryFiber,
      sortable: true,
    },
    {
      name: 'FATS',
      selector: row => row.fats,
      sortable: true,
    },

    {
      name: 'PROTIENS',
      selector: row => row.protiens,
      sortable: true,
    },
    {
      name: 'SERVING SIZE',
      selector: row => row.servingSize,
      sortable: true,
    },
    {
      name: 'SUGARS',
      selector: row => row.sugars,
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
                  title="NUTRITION DATA"
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