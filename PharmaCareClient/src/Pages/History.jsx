import React, { useEffect, useState } from "react";
import { Footer } from "../Component/Footer";
import { Header } from "../Component/Header";
import { useNavigate } from "react-router-dom";
import { getData, postData, deleteData } from '../Helper/Axios';

export const History = () => {
  useEffect(() => { window.scrollTo(0, 0) }, []);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(9);
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartId, setCartId] = useState();
  const [item, setItem]=useState([]);
  const [count, setCount] = useState();

  const fatchCart = async () => {
    try {
      const response = await getData({
        "url": "cart/user"
      });
      const data = await response.json()
      setTotalAmount(data.totalAmount);
      //setItem(data.cartDetalis);
      setCartId(data.id);
      document.getElementsByClassName("btn-badge")[0].innerText = data.count;
    } catch (error) {
      setCount(0);
    }
  };

  const fatchData = async () => {
    const response = await getData({
      "url": "payment/all"
    });
    const data = await response.json()
    setItem(data);
    setData(data);
  };

  useEffect(() => {
    //fatchCart();
    fatchData();
  }, [loading]);

  const handalClick = (id) => {
    navigate(`/cart/${id}`);
  };

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
    <>
      <Header />
      <div className="shopping-cart">
        <div className="px-4 px-lg-0">
          <div className="pb-5">
            <div className="container">
              <p className="section-subtitle"> -- ORDERS --</p>
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
              <div className="row">
                <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                  {/* Shopping cart table */}
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col" className="border-0 bg-light">
                            <div className="p-2 px-3 text-uppercase">
                              ID
                            </div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Price</div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Currency</div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Status</div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Created Date</div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">View</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>


                        {filteredData ? filteredData.map((elem, index) => {
                          return (
                            <>
                              <tr>
                                <td className="border-0 align-middle">
                                  Order : {index + 1}
                                </td>
                                <td className="border-0 align-middle">
                                  {elem.amount}
                                </td>
                                <td className="border-0 align-middle">
                                  {elem.currency}
                                </td>
                                <td className="border-0 align-middle">
                                  {elem.status}
                                </td>
                                <td className="border-0 align-middle">
                                  {elem.createdTime}
                                </td>
                                <td className="border-0 align-middle">
                                  <button
                                    href=""
                                    className="btn btn-dark rounded-pill py-2 btn-block"
                                    onClick={() => handalClick(elem.cart.id)}
                                  >
                                    View
                                  </button>
                                </td>
                              </tr>
                            </>
                          )
                        })
                          : <></>}
                      </tbody>
                    </table>
                  </div>
                  {/* End */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
