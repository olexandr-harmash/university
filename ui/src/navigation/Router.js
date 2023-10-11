import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import PaymentContainer from "../pages/payment/PaymentContainer";
import {CreatedPaymentView} from '../pages/payment/PaymentView'
const Router = () => {
  return (
    <div>
      <Routes>
        <Route
          exact
          path={'/'}
          element={<Home />} />

        <Route
          exact
          path={'/login'}
          element={<Login />} />

        <Route
          exact
          path={'/payment'} 
          element={CreatedPaymentView()} />
      </Routes>
    </div>
  );
};

export default Router;