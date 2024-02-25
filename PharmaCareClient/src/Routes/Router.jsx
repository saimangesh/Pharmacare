import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../Pages/Home";
import { ProductDetails } from "../Pages/ProductDetails";
import { Shop } from "../Pages/Shop";
import { History } from "../Pages/History";
import { Cart } from "../Pages/Cart";
import { CheckOut } from "../Pages/CheckOut";
import { Login } from "../Pages/Login";
import { Singup } from "../Pages/Singup";
import { CartDetails } from "../Pages/CartDetails";

import { Protected } from "../Component/Protected";

import { NutritionData } from "../Component/Health/NutritionData";
import { DietPlan } from "../Component/Health/DietPlan";
import { WellnessTip } from "../Component/Health/WellnessTip";

import { UserAppointment } from "../Component/Appointment/UserAppointment";
import { BookAppointment } from "../Component/Appointment/BookAppointment";
import { Doctor } from "../Component/Appointment/Doctor";

import { Appointments } from "../Pages/Admin/Appointments";
import { Users } from "../Pages/Admin/Users";
import { Payments } from "../Pages/Admin/Payments";
import { Medicines } from "../Pages/Admin/Medicines";
import { Doctors } from "../Pages/Admin/Doctors";
import { AboutUs } from "../Pages/AboutUs";
import { ContactUs } from "../Pages/ContactUs";

export const Router = () => {
  const [isSignedIn, setIsSignedIn] = useState(
    localStorage.getItem("token") || false
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart/:id" element={<CartDetails />} />
        <Route
          path="/cart"
          element={
            <Protected isSignedIn={isSignedIn}>
              <Cart />
            </Protected>
          }
        />
        <Route
          path="/checkout"
          element={
            <Protected isSignedIn={isSignedIn}>
              <CheckOut />
            </Protected>
          }
        />
        <Route
          path="/history"
          element={
            <Protected isSignedIn={isSignedIn}>
              <History />
            </Protected>
          }
        />
        <Route
          path="/wellnesstips"
          element={
            <Protected isSignedIn={isSignedIn}>
              <WellnessTip />
            </Protected>
          }
        />
        <Route
          path="/nutritiondata"
          element={
            <Protected isSignedIn={isSignedIn}>
              <NutritionData />
            </Protected>
          }
        />
        <Route
          path="/dietplans"
          element={
            <Protected isSignedIn={isSignedIn}>
              <DietPlan />
            </Protected>
          }
        />
        <Route
          path="/appointments"
          element={
            <Protected isSignedIn={isSignedIn}>
              <UserAppointment />
            </Protected>
          }
        />
        <Route
          path="/bookappointment"
          element={
            <Protected isSignedIn={isSignedIn}>
              <BookAppointment />
            </Protected>
          }
        />
        <Route
          path="/doctors"
          element={
            <Protected isSignedIn={isSignedIn}>
              <Doctor />
            </Protected>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<Singup />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route
          path="/admin/users"
          element={
            <Protected isSignedIn={isSignedIn}>
              <Users />
            </Protected>
          }
        />

        <Route
          path="/admin/appointments"
          element={
            <Protected isSignedIn={isSignedIn}>
              <Appointments />
            </Protected>
          }
        />

        <Route
          path="/admin/doctors"
          element={
            <Protected isSignedIn={isSignedIn}>
              <Doctors />
            </Protected>
          }
        />

        <Route
          path="/admin/medicines"
          element={
            <Protected isSignedIn={isSignedIn}>
              <Medicines />
            </Protected>
          }
        />

        <Route
          path="/admin/payments"
          element={
            <Protected isSignedIn={isSignedIn}>
              <Payments />
            </Protected>
          }
        />

      </Routes>
    </>
  );
};
