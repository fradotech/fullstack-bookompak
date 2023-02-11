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

  User: '/users',
  UserDetail: '/users/:id',
  UserCreate: '/users/create',
  EditUser: '/users/edit',

  // <--- Feature --->

  Booking: '/bookings',
  BookingCreate: '/bookings/create',
  BookingEdit: '/bookings/edit',
  BookingApproval: '/bookings/approval',

  Room: '/rooms',
  RoomCreate: '/rooms/create',
  RoomEdit: '/rooms/edit',
}
