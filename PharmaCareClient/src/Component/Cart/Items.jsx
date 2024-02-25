import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { getData, postData, deleteData } from '../../Helper/Axios';

export const Items = ({ prop, setLoading }) => {
  const [quantity, setQuantity] = useState(prop.quantity);
  const [item2, setItem2] = useState(prop.products);

  const onToast = () => {
    toast.success('Item Removed!!', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const updateQuantity = async (q) => {
    const response = await postData({
      "url": "cart/addproduct",
      "data": {
        productId: prop.products.id,
        quantity: q,
      },
      "isJson": true
    });
    const data = await response.json();
    setLoading(data);
    // setQuantity(data.cartDetalis.quantity);
  };

  const handleQuantity = (e) => {
    e.preventDefault();
    setQuantity(e.target.value);
    updateQuantity();
  };

  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      updateQuantity(quantity - 1);
    }
  };

  const handlePlus = () => {
    if (quantity > 0) {
      setQuantity(quantity + 1);
      updateQuantity(quantity + 1);
    }
  };

  const handleRemove = async () => {
    //call delete api without body
    const response = await deleteData({
      "url": `cart/product/${prop.products.id}`
    });
    const data = await response.json();
    setLoading(data);
    onToast();
  }

  return (
    <>
      <tr>
        <th scope="row" className="border-0">
          <div className="p-2">
            {item2.imageUrl ? (
              <img
                src={item2.imageUrl}
                alt=""
                width={70}
                className="img-fluid rounded shadow-sm d-inline "
              />
            ) : (
              <img
                src="./img/tab1.jpg"
                alt=""
                width={70}
                className="img-fluid rounded shadow-sm d-inline "
              />
            )}
            <div className="ml-3 d-inline-block align-middle">
              <h5 className="mb-0">
                {" "}
                <a href="#" className="text-dark d-inline-block align-middle">
                  {item2.name}
                </a>
              </h5>
              <span className="text-muted font-weight-normal font-italic d-block">
                Category: {item2.diseaseCategory}
              </span>
            </div>
          </div>
        </th>
        <td className="border-0 align-middle">
          <strong>{item2.price}</strong>
        </td>
        <td className="border-0 align-middle">
          <div className="qty2 display-flex">
            <button className="qtyminus1" onClick={() => handleMinus()}>
              -
            </button>

            <input
              type="text"
              name="quantity"
              onChange={(e) => handleQuantity(e)}
              value={quantity}
              className="qty1"
            />
            <button className="qtyplus1" onClick={() => handlePlus()}>
              +
            </button>
          </div>
        </td>
        <td className="border-0 align-middle">
          <a className="text-dark" onClick={() => handleRemove()}>
            <i className="fa fa-trash" />
          </a>
        </td>
      </tr>
    </>
  );
};
