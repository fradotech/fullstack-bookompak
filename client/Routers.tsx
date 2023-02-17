import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Route as HttpRoute } from './Enums/Route'
import MainLayout from './Layouts/MainLayout/MainLayout'
import AgendaDetail from './Pages/Agenda/AgendaDetail'
import AgendaForm from './Pages/Agenda/AgendaForm'
import Agendas from './Pages/Agenda/Agendas'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
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

const Routers: React.FC = () =>
  <>
    <BrowserRouter>
      <Routes>
        {/* <Route path={HttpRoute.Home} element={<Home />} /> */}
        <Route path={HttpRoute.Login} element={<Login />} />
        <Route path={HttpRoute.Register} element={<Register />} />
      </Routes>
    </BrowserRouter>

    <BrowserRouter>
      <MainLayout>
        <Routes>
          {/* <--- Dashboard ---> */}

          <Route path={HttpRoute.Dashboard} element={<Dashboard />} />

          {/* <--- User ---> */}

          <Route path={HttpRoute.Users} element={<Users />} />
          <Route path={HttpRoute.UserDetail} element={<UserDetail />} />

          {/* <--- Agenda ---> */}

          <Route path={HttpRoute.Agendas} element={<Agendas />} />
          <Route path={HttpRoute.AgendaCreate} element={<AgendaForm />} />
          <Route path={HttpRoute.AgendaDetail} element={<AgendaDetail />} />

          {/* <--- Booking ---> */}

          <Route path={HttpRoute.Bookings} element={<Bookings />} />
          <Route path={HttpRoute.BookingCreate} element={<BookingForm />} />
          <Route path={HttpRoute.BookingDetail} element={<BookingDetail />} />
          <Route path={HttpRoute.BookingsApproval} element={<BookingsApproval />} />

          {/* <--- Room ---> */}

          <Route path={HttpRoute.Rooms} element={<Rooms />} />
          <Route path={HttpRoute.RoomCreate} element={<RoomForm />} />
          <Route path={HttpRoute.RoomDetail} element={<RoomDetail />} />

          {/* <--- Other ---> */}

          <Route path="*" element={<NotFound />} />

        </Routes>
      </MainLayout>
    </BrowserRouter>
  </>

export default Routers
