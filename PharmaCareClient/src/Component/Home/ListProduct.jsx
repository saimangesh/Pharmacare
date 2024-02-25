import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "../Medicine/ProductCard";
import { getData, postData, deleteData } from '../../Helper/Axios';

export const ListProduct = () => {
  const navigate = useNavigate();

  const [isvalid, setisvalid] = useState(localStorage.getItem("validTime") > new Date().getTime());
  if (!isvalid) {
    localStorage.clear();
    navigate(`/login`);
  }

  const [data, setData] = useState([]);
  const fatchData = async () => {
    const response = await getData({
      "url": "medicine/all",
    });
    const data = await response.json()
    setData(data);
  };

  useEffect(() => {
    fatchData();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filterData = () => {
      const filtered = data.filter(item => {
        // Check for non-null fields and then perform search
        return Object.entries(item).some(
          ([key, value]) =>
            value !== null &&
            value
              .toString()
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        );
      });
      setFilteredData(filtered);
    };

    const debounceTimer = setTimeout(filterData, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, data]);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };


  return (
    !isvalid ? "" :
      <>
        <section id="products" className="section product">
          <div className="container">
            <p className="section-subtitle"> -- Medicines --</p>
            <div>
              <h1>Search Filter</h1>
              <input
                type="text"
                placeholder="Search here..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <h2 className="h2 section-title"></h2>
            <ul className="grid-list">
              {console.log(filteredData)}
              {

                filteredData.map((item, index) =>
                  <ProductCard key={item.id} id={item.id} name={item.name} description={item.description}
                    imageUrl={item.imageUrl}
                    price={item.price} img={item.directionOfUse} diseaseCategory={item.diseaseCategory} />
                )
              }
            </ul>
          </div>
        </section>
      </>
  );
};
