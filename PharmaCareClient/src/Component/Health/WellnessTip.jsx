import React, { useEffect, useState } from "react";
import { Footer } from "../Footer";
import { Header } from "../Header";
import DataTable from 'react-data-table-component';
import FilterData from "../../Helper/FilterData";
import { getData, postData, deleteData } from '../../Helper/Axios';

import '../../basic.css';

export const WellnessTip = (props) => {
  const [data, setData] = useState([]);
  const fatchData = async () => {
    const response = await getData({
      "url": "home/wellnesstips"
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
          <span className="span">Title</span> : <span>{data.title}</span>
        </li>
        <li className="footer-item logo">
          <span className="span">Category</span> : <span>{data.category}</span>
        </li>
        <li className="footer-item logo">
          <span className="span">Description</span> : <span>{data.description}</span>
        </li>
        <li className="footer-item logo">
          <span className="span">Benefits</span> : <span>{data.benefits}</span>
        </li>
        <li className="footer-item logo">
          <span className="span">Practical Steps</span> : <span>{data.practicalSteps}</span>
        </li>
        <li className="footer-item logo">
          <span className="span">Frequency</span> : <span>{data.frequency}</span>
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
      name: 'TITLE',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'CATEGORY',
      selector: row => row.category,
      sortable: true,
    },
    {
      name: 'DESCRIPTION',
      selector: row => row.description,
      sortable: true,
    },
    {
      name: 'BENEFITS',
      selector: row => row.benefits,
      sortable: true,
    },
    {
      name: 'PRACTICAL STEPS',
      selector: row => row.practicalSteps,
      sortable: true,
    },
    {
      name: 'FREQUENCY',
      selector: row => row.frequency,
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
                  title="WELLESS TIPS"
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