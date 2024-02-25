import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData, postData, deleteData } from '../Helper/Axios';

export const Header = () => {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [islogin, setislogin] = useState(localStorage.getItem("token"));
  const [count, setCount] = useState();
  const navigate = useNavigate();
  const handalRedirect = () => {
    if (islogin) {
      navigate(`/cart`);
    } else {
      navigate(`/login`);
    }
  };

  const cartData = async () => {
    // get cart item
    try {
      const response = await getData({
        "url": "cart/user"
      });
      const data = await response.json()

      if (data !== "") {
        setCount(data.count);
      } else {
        setCount(0);
      }
    } catch (error) {
      setCount(0);
    }
  };

  const handalLogout = () => {
    // localStorage.removeItem("token");
    localStorage.clear();
    setislogin(false)
    navigate(`/`);
  };

  useEffect(() => {
    cartData();
    //setCount(cartCount());
  }, []);



  return (
    <header className="header" data-header="">

      <div className="nav-wrapper">
      <div className="container" style={{justifyContent : "flex-end"}}>
          <div class="btn-group" style={{marginRight : "auto"}} >
            <h1 className="h1">
              <a href="/" className="logo">
                Pharma<span className="span">Care</span>
              </a>
            </h1>
            <button
              className="nav-open-btn"
              aria-label="Open Menu"
              data-nav-open-btn=""
            >
              <ion-icon name="menu-outline" />
            </button>
          </div>

          {islogin ? (
            <div class="btn-group">
              <button type="button" class="btn btn-secondary">
                <a href="/" className="navbar-link">Home</a>
              </button>
            </div>
          ) : (<></>)}

          {islogin ? (
            <div class="btn-group">
              <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Health
              </button>
              <div class="dropdown-menu dropdown-menu-right">
                <button class="dropdown-item" type="button">
                  <a href="/nutritiondata" className="navbar-link">Nutrition Data</a>
                </button>
                <button class="dropdown-item" type="button">
                  <a href="/dietplans" className="navbar-link">Diet Plans</a>
                </button>
                <button class="dropdown-item" type="button">
                  <a href="/wellnesstips" className="navbar-link">Wellness Tips</a>
                </button>
              </div>
            </div>
          ) : (<></>)}

          {islogin && role === 'USER' ? (
            <div class="btn-group">
              <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Medicines
              </button>
              <div class="dropdown-menu dropdown-menu-right">
                <button class="dropdown-item" type="button">
                  <a href="/shop" className="navbar-link">Shop</a>
                </button>
                <button class="dropdown-item" type="button">
                  <a href="/history" className="navbar-link">Orders</a>
                </button>
              </div>
            </div>
          ) : (<></>)}


          {islogin && role === 'USER' ? (
            <div class="btn-group">
              <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Appoinment
              </button>
              <div class="dropdown-menu dropdown-menu-right">
                <button class="dropdown-item" type="button">
                  <a href="/bookappointment" className="navbar-link">Book Appointment</a>
                </button>
                <button class="dropdown-item" type="button">
                  <a href="/appointments" className="navbar-link">List Appointments</a>
                </button>
              </div>
            </div>
          ) : (<></>)}


          {islogin && role === 'ADMIN' ? (
            <div class="btn-group">
              <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Admin
              </button>
              <div class="dropdown-menu dropdown-menu-right">
                <button class="dropdown-item" type="button">
                  <a href="/admin/users" className="navbar-link">Users</a>
                </button>
                <button class="dropdown-item" type="button">
                  <a href="/admin/doctors" className="navbar-link">Doctors</a>
                </button>
                <button class="dropdown-item" type="button">
                  <a href="/admin/medicines" className="navbar-link">Medicines</a>
                </button>
                <button class="dropdown-item" type="button">
                  <a href="/admin/payments" className="navbar-link">Payments</a>
                </button>
                <button class="dropdown-item" type="button">
                  <a href="/admin/appointments" className="navbar-link">Appointments</a>
                </button>
              </div>
            </div>
          ) : (<></>)}


          <div class="btn-group">
            {islogin && role === 'USER' ? (
              <button
                className="header-action-btn"
                aria-label="Open shopping cart"
                data-panel-btn="cart"
                onClick={handalRedirect}
              >
                <ion-icon name="basket-outline" />
                <data className="btn-badge" value='2'>{count}</data>
              </button>
            ) : (<></>)}
          </div>

          <div class="btn-group">
            {islogin ?
              <button
                className="header-action-btn"
                aria-label="Open shopping cart"
                data-panel-btn="cart"
                onClick={() => handalLogout()}
              >
                <ion-icon name="log-out-outline"></ion-icon>
              </button>
              : <button
                className="header-action-btn"
                aria-label="Open shopping cart"
                data-panel-btn="cart"
                onClick={handalRedirect}
              >
                <ion-icon name="person-circle-outline"></ion-icon>
              </button>}
          </div>

        </div>
      </div>

    </header>
  );
};
