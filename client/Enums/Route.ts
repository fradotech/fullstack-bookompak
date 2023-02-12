export type RouteType = {
  permissions: string[]
  name: string
  href: string
  icon?: any
}

export type RouteListType = RouteType & {
  items?: RouteType[]
}

export const Route = {
  // <--- IAM --->

  Home: '/',
  Dashboard: '/dashboard',
  Login: '/auth/login',
  Logout: '/auth/logout',

  Profile: '/profile',
  ProfileEdit: '/profile/edit',

  Roles: '/roles',

  Users: '/users',
  UserDetail: '/users/:id',
  UserCreate: '/users/create',
  UserEdit: '/users/edit',

  // <--- Feature --->

  Agendas: '/agendas',
  AgendaCreate: '/agendas/create',
  AgendaDetail: '/agendas/:id',
  AgendaEdit: '/agendas/edit',

  Bookings: '/bookings',
  BookingCreate: '/bookings/create',
  BookingDetail: '/bookings/:id',
  BookingEdit: '/bookings/edit',
  BookingsApproval: '/bookings/approval',

  Rooms: '/rooms',
  RoomCreate: '/rooms/create',
  RoomDetail: '/rooms/:id',
  RoomEdit: '/rooms/edit',
}
