import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Route as HttpRoute } from './Enums/Route';
import MainLayout from "./Layouts/MainLayout/MainLayout";
import Login from "./Pages/Auth/Login";
import Dashboard from './Pages/Dashboard';
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import User from "./Pages/User";

const Routers: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={HttpRoute.Home} element={<Home />} />
          <Route path={HttpRoute.Login} element={<Login />} />
        </Routes>
        <MainLayout>
          <Routes>
            <Route path={HttpRoute.Dashboard} element={<Dashboard />} />
            <Route path={HttpRoute.User} element={<User />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </MainLayout>
      </BrowserRouter >
    </>
  )
}

export default Routers;