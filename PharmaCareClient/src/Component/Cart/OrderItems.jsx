import React, { useState } from "react";

export const OrderItems = ({ key, prop, setLoading }) => {
  const [quantity, setQuantity] = useState(prop.quantity);
  const [index, setIndex] = useState(key);
  const [item2, setItem2] = useState(prop.products);

  return (
    <>
      <tr>
        <td className="border-0 align-middle">
          <strong>{index}</strong>
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
          <strong>{quantity}</strong>
        </td>
      </tr>
    </>
  );
};
