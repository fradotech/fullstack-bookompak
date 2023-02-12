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
  EditUser: '/users/edit',

  // <--- Feature --->

  Bookings: '/bookings',
  BookingCreate: '/bookings/create',
  BookingCreateByRoom: '/bookings/create/:id',
  BookingDetail: '/bookings/:id',
  BookingEdit: '/bookings/edit',
  BookingsApproval: '/bookings/approval',

  Rooms: '/rooms',
  RoomCreate: '/rooms/create',
  RoomDetail: '/rooms/:id',
  RoomEdit: '/rooms/edit',
}
