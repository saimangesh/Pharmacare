import React, { useEffect, useState } from "react";
import { Footer } from "../Component/Footer";
import { Header } from "../Component/Header";
import { useParams } from 'react-router-dom';
import { getData, postData, deleteData } from '../Helper/Axios';

export const CartDetails = () => {
  useEffect(() => { window.scrollTo(0, 0) }, []);
  const { id } = useParams();
  const [photo, setPhoto] = useState();
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(9);
  const [totalAmount, setTotalAmount] = useState(0);
  const [count, setCount] = useState();
  const [cartId, setCartId] = useState();
  const fatchCart = async () => {
    // get cart item
    try {
      const response = await getData({
        "url": `cart/${id}`
      });
      const data = await response.json();
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
              <p className="section-subtitle"> -- CART DETAILS --</p>
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
                        </tr>
                      </thead>
                      <tbody>

                        {item ? item.map((elem, index) => {
                          return (
                            <>
                              <tr>
                                <td className="border-0 align-middle">
                                  <strong>{index + 1}</strong>
                                </td>
                                <th scope="row" className="border-0">
                                  <div className="p-2">
                                    <img
                                      src="./img/tab1.jpg"
                                      //src={`data:image/png;base64,${item2.img}`}
                                      alt=""
                                      width={70}
                                      className="img-fluid rounded shadow-sm d-inline "
                                    />
                                    <div className="ml-3 d-inline-block align-middle">
                                      <h5 className="mb-0">
                                        {" "}
                                        <a href="#" className="text-dark d-inline-block align-middle">
                                          {elem.products.name}
                                        </a>
                                      </h5>
                                      <span className="text-muted font-weight-normal font-italic d-block">
                                        Category: {elem.products.diseaseCategory}
                                      </span>
                                    </div>
                                  </div>
                                </th>
                                <td className="border-0 align-middle">
                                  <strong>{elem.products.price}</strong>
                                </td>
                                <td className="border-0 align-middle">
                                  <strong>{elem.quantity}</strong>
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


              <div className="row py-5 p-4 bg-white rounded shadow-sm">
                <div className="col-lg-6">
                  <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">
                    Uploaded prescription
                  </div>
                  {
                    !photo ? "" :
                      <div className="d-flex justify-content-between py-3 border-bottom">
                        <img
                          src={`data:image/png;base64,${photo}`}
                          alt=""
                          width={70}
                          className="img-fluid rounded shadow-sm d-inline"
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
                        <strong>USD {totalAmount}</strong>
                      </li>
                      <li className="d-flex justify-content-between py-3 border-bottom">
                        <strong className="text-muted">
                          Shipping and handling
                        </strong>
                        <strong>USD 100.00</strong>
                      </li>
                      <li className="d-flex justify-content-between py-3 border-bottom">
                        <strong className="text-muted">Tax</strong>
                        <strong>USD 0.00</strong>
                      </li>
                      <li className="d-flex justify-content-between py-3 border-bottom">
                        <strong className="text-muted">Total</strong>
                        <h3 className="font-weight-bold">USD {totalAmount + 100}</h3>
                      </li>
                    </ul>
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
