import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Route as HttpRoute } from './Enums/Route'
import MainLayout from './Layouts/MainLayout/MainLayout'
import Login from './Pages/Auth/Login'
import BookingDetail from './Pages/Booking/BookingDetail'
import BookingForm from './Pages/Booking/BookingForm'
import Bookings from './Pages/Booking/Bookings'
import BookingsApproval from './Pages/BookingApproval/BookingsApproval'
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

            <Route path={HttpRoute.Bookings} element={<Bookings />} />
            <Route
              path={HttpRoute.BookingCreateByRoom}
              element={<BookingForm />}
            />
            <Route path={HttpRoute.BookingCreate} element={<BookingForm />} />
            <Route path={HttpRoute.BookingDetail} element={<BookingDetail />} />
            <Route
              path={HttpRoute.BookingsApproval}
              element={<BookingsApproval />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </>
  )
}

export default Routers
