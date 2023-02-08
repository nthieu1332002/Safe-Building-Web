import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoutes from './config/ProtectedRoutes'
import PrivateRoutes from "./config/PrivateRoutes"
import Login from "./pages/Login/Login.jsx"
import Home from "./pages/Home/Home.jsx"
import Building from "./pages/Building/Building.jsx"
import Account from "./pages/Account/Account.jsx"
import Resident from "./pages/Resident/Resident.jsx"
import Flat from "./pages/Flat/Flat.jsx"
import Service from "./pages/Service/Service.jsx"
import Contract from "./pages/Contract/Contract.jsx"

import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx"
import ValidateAccount from "./pages/ValidateAccount/ValidateAccount.jsx"
import ConfirmPassword from "./pages/ConfirmPassword/ConfirmPassword.jsx"
import Layout from './pages/Layout/Layout.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<ProtectedRoutes />}> */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/validate-account" element={<ValidateAccount />}></Route>
        <Route path="/confirm-password" element={<ConfirmPassword />}></Route>
        {/* </Route>
        <Route element={<PrivateRoutes />}> */}

        <Route path="/" element={<Layout />} >
          <Route index element={<Home />}></Route>
          <Route path="/building" element={<Building />}></Route>
          <Route path="/account" element={<Account />}></Route>
          <Route path="/resident" element={<Resident />}></Route>
          <Route path="/flat" element={<Flat />}></Route>
          <Route path="/service" element={<Service />}></Route>
          <Route path="/contract" element={<Contract />}></Route>
        </Route>
        {/* </Route> */}
        {/* <Route path="*" element={<> not found</>} /> */}

      </Routes>
    </BrowserRouter>
  )
}

export default App