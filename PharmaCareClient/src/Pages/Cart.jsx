import React, { useEffect, useState } from "react";
import { Footer } from "../Component/Footer";
import { Header } from "../Component/Header";
import { Items } from "../Component/Cart/Items";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { getData, postData, deleteData } from '../Helper/Axios';
import { Button, FormControl } from 'react-bootstrap';
import '../Cart.css';

export const Cart = () => {
  const onToast = (s) => {
    if ('Order Placed!!!' === s) {
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

  useEffect(() => { window.scrollTo(0, 0) }, []);

  const [data, setData] = useState();
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(9);
  const [totalAmount, setTotalAmount] = useState(0);
  const [count, setCount] = useState();
  const [cartId, setCartId] = useState();
  const [photo, setPhoto] = useState();

  const fatchCart = async () => {
    try {
      const response = await getData({
        "url": "cart/user"
      });
      const data = await response.json()
      setTotalAmount(data.totalAmount);
      setItem(data.cartDetalis);
      setCartId(data.id);
      setPhoto(data.photo);
      document.getElementsByClassName("btn-badge")[0].innerText = data.count;
    } catch (error) {
      setCount(0);
    }
  };

  useEffect(() => {
    fatchCart();

  }, [loading]);


  const createOrder = async (e) => {
    const response = await postData({
      "url": "payment/create",
      "data": {
        amount: totalAmount,
        cartId: cartId
      },
      "isJson": true
    });
    const data = await response.json();
    setData(data);
    return data;
  }

  const handlePayment = async () => {
    if (photo == null) {
      onToast("Please upload prescription");
    } else {
      const order = await createOrder();
      onToast("Order Placed!!!");
      window.location.href = "/history";
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      onToast("Please upload prescription");
    } else {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const response = await postData({
        "url": "cart/uploadPrescription",
        "data": formData,
        "isJson": false
      });
      const data = await response.json();
      window.location.href = "/cart";
    }
  };

  const [isBig, setIsBig] = useState(false);

  const handleClick = () => {
    setIsBig(!isBig);
  };

  return (
    <>
      <Header />
      <div className="shopping-cart">
        <div className="px-4 px-lg-0">
          <div className="pb-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                  {/* Shopping cart table */}
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col" className="border-0 bg-light">
                            <div className="p-2 px-3 text-uppercase">
                              Product
                            </div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Price</div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Quantity</div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Remove</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>

                        {item ? item.map((elem, index) => {
                          return (
                            <>
                              <Items
                                key={index} prop={elem} setLoading={setLoading} />
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


              <div className="row py-5 p-4 bg-white rounded shadow-sm">
                <div className="col-lg-6">
                  <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">
                    Please upload prescription
                  </div>
                  <FormControl type="file" onChange={handleFileChange} className="custom-form-control" />
                  <button
                    href=""
                    className="btn btn-dark rounded-pill py-2 btn-block"
                    onClick={(e) => handleUpload(e)}
                  >
                    Upload
                  </button>
                  {
                    !photo ? "" :
                      <div className="d-flex justify-content-between py-3 border-bottom">
                        <img
                          src={`data:image/png;base64,${photo}`}
                          alt=""
                          width={70}
                          className="img-fluid rounded shadow-sm d-inline "
                          style={{ width: isBig ? '100%' : 'auto', height: isBig ? 'auto' : '100px' }}
                          onClick={handleClick}
                        />
                      </div>
                  }
                </div>

                <div className="col-lg-6">
                  <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">
                    Order summary{" "}
                  </div>
                  <div className="p-4">
                    <p className="font-italic mb-4">
                      Shipping and additional costs are calculated based on
                      values you have entered.
                    </p>
                    <ul className="list-unstyled mb-4">
                      <li className="d-flex justify-content-between py-3 border-bottom">
                        <strong className="text-muted">Order Subtotal </strong>
                        <strong>USD {Math.ceil((totalAmount * 100)) / 100}</strong>
                      </li>
                      <li className="d-flex justify-content-between py-3 border-bottom">
                        <strong className="text-muted">
                          Shipping and handling
                        </strong>
                        <strong>USD 7.00</strong>
                      </li>
                      <li className="d-flex justify-content-between py-3 border-bottom">
                        <strong className="text-muted">Tax</strong>
                        <strong>USD 0.00</strong>
                      </li>
                      <li className="d-flex justify-content-between py-3 border-bottom">
                        <strong className="text-muted">Total</strong>
                        <h3 className="font-weight-bold">USD {Math.ceil((totalAmount + 7) * 100) / 100}</h3>
                      </li>
                    </ul>
                    <button
                      href=""
                      className="btn btn-dark rounded-pill py-2 btn-block"
                      onClick={(e) => handlePayment(e)}
                    >
                      Procceed to Payment
                    </button>
                  </div>
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
