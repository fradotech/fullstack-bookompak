import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Route as HttpRoute } from './Enums/Route'
import MainLayout from './Layouts/MainLayout/MainLayout'
import Login from './Pages/Auth/Login'
import Dashboard from './Pages/Dashboard/Dashboard'
import NotFound from './Pages/NotFound'
import RoomDetail from './Pages/Room/RoomDetail'
import RoomForm from './Pages/Room/RoomForm'
import Rooms from './Pages/Room/Rooms'
import UserDetail from './Pages/User/UserDetail'
import Users from './Pages/User/Users'

const Routers: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path={HttpRoute.Home} element={<Home />} /> */}
          <Route path={HttpRoute.Login} element={<Login />} />
        </Routes>

        <MainLayout>
          <Routes>
            <Route path={HttpRoute.Dashboard} element={<Dashboard />} />

            <Route path={HttpRoute.Users} element={<Users />} />
            <Route path={HttpRoute.UserDetail} element={<UserDetail />} />

            <Route path={HttpRoute.Rooms} element={<Rooms />} />
            <Route path={HttpRoute.RoomCreate} element={<RoomForm />} />
            <Route path={HttpRoute.RoomDetail} element={<RoomDetail />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </>
  )
}

export default Routers
