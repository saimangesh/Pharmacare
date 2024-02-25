import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrderCard } from "../ShopComponent/OrderCard";
import { ToastContainer, toast } from 'react-toastify';
import axiosFetch from "../../Helper/Axios";


export const ListOrder = () => {
  const navigate = useNavigate();

  const [isSignedIn, setIsSignedIn] = useState(
    localStorage.getItem("token") || false
  );
  if (!isSignedIn) {
    localStorage.clear();
  }

  const [isvalid, setisvalid] = useState(localStorage.getItem("validTime") > new Date().getTime());
  if (!isvalid) {
    localStorage.clear();
    navigate(`/login`);
  }

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [islogin, setislogin] = useState(localStorage.getItem("token"));

  const [data, setData] = useState([]);
  const fatchData = async () => {

    const response = await axiosFetch({
      "url": "home/orders",
      "method": "GET",
    });
    setData(response.data);
  };


  useEffect(() => {
    fatchData();
  }, []);


  return (
    !isvalid ? "" :
      <>
        <section id="products" className="section product">
          <div className="container">
            <p className="section-subtitle"> -- ORDER HISTORY --</p>
            <h2 className="h2 section-title"></h2>
            <ul className="grid-list">
              {
                data.map((item) =>
                  <OrderCard key={item.uses} id={item.id} name={item.name} description={item.description} price={item.price} img={item.directionOfUse} diseaseCategory={item.diseaseCategory} />
                )
              }
            </ul>
          </div>
        </section>
      </>
  );
};
