import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { getData, postData, deleteData } from '../../Helper/Axios';

export const ProductCard = (props) => {
  const navigate = useNavigate();
  const [islogin, setislogin] = useState(localStorage.getItem("token"));
  const onToast = () => {
    toast.success('Added to cart!', {
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
  const handalClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handalCart = async () => {
    if (!islogin) {
      navigate("/login");
    }

    const response = await postData({
      "url": "cart/addproduct",
      "data": {
        productId: props.id,
        quantity: 1,
      },
      "isJson": true
    });
    const data = await response.json();

    if (response.status === 200) {
      onToast();
      document.getElementsByClassName("btn-badge")[0].innerText = data.count
    } else {
      navigate("/login");
    }

  };
  return (
    <>
      <li>
        <div className="product-card">
          <figure className="card-banner">
            {props.imageUrl ? (
              <img
                src={props.imageUrl}
                width={189}
                height={189}
                loading="lazy"
                alt={props.diseaseCategory}
              />
            ) : (
              <img
                src="./img/tab1.jpg"
                width={189}
                height={189}
                loading="lazy"
                alt={props.diseaseCategory}
              />
            )}
            <div className="btn-wrapper">
              <button className="product-btn" aria-label="Add to Whishlist">
                <ion-icon name="heart-outline" />
                <div className="tooltip">Add to Whishlist</div>
              </button>
              <button
                className="product-btn"
                onClick={() => handalClick(props.id)}
                aria-label="Quick View"
              >
                <ion-icon name="eye-outline" />
                <div className="tooltip">Quick View</div>
              </button>
            </div>
          </figure>
          <div className="rating-wrapper">
            <ion-icon name="star" />
            <ion-icon name="star" />
            <ion-icon name="star" />
            <ion-icon name="star" />
            <ion-icon name="star" />
          </div>
          <h3 className="h4 card-title">
            <a href={`/product/${props.id}`}>{props.name}</a>
          </h3>
          <div className="price-wrapper">
            <del className="del">USD {props.price + 100}</del>
            <data className="price" value={85.0}>
              USD {props.price}
            </data>
          </div>
          <button className="btn btn-primary" onClick={() => handalCart()}>
            Add to Cart
          </button>
        </div>
      </li>

    </>
  );
};
