import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

export const OrderCard = (props) => {
  const navigate = useNavigate();

  const[token,setToken]=useState(localStorage.getItem("token"));
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
    if(!islogin){
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
    if(response.status==200){
      onToast();
      const data = await response.json();
      document.getElementsByClassName("btn-badge")[0].innerText=data.count
    }else{
      navigate("/login");
    }    
  };


  const handleRemove = async () =>{
    //call delete api without body
      const response = await deleteData({
        "url": `cart/product/${prop.id}`
      });
      const data = await response.json();
      //setLoading(t);
     // onToast();    
  };


  return (
    <>
      <tr>
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
                  {props.name}
                </a>
              </h5>
              <span className="text-muted font-weight-normal font-italic d-block">
                Category: {props.diseaseCategory}
              </span>
            </div>
          </div>
        </th>
        <td className="border-0 align-middle">
          <strong>{props.amount}</strong>
        </td>
        <td className="border-0 align-middle">
          <strong>{props.status}</strong>
        </td>
        <td className="border-0 align-middle">
          <strong>{props.createdAt}</strong>
        </td>
        <td className="border-0 align-middle">
          <strong>{props.cartId}</strong>
        </td>
        <td className="border-0 align-middle">
          <a  className="text-dark" onClick={()=>handleRemove()}>
            <i className="fa fa-trash" />
          </a>
        </td>
      </tr>
    </>
  );
};
