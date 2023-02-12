import {
  AuditOutlined,
  DashboardOutlined,
  MergeCellsOutlined,
  ReconciliationOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { ERole } from '../../Enums/Role.enum'

import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from '../../Enums/Route'
import { authAction } from '../../Pages/Auth/Auth.action'

export type IProps = {
  children: React.ReactNode
  headerRightMenu?: React.FC
}

type MenuItem = Required<MenuProps>['items'][number]

const user = authAction.loggedUser()

const itemsRoleUser: MenuItem[] = [
  {
    key: Route.Dashboard,
    label: <Link to={Route.Dashboard}>Dashboard</Link>,
    icon: <DashboardOutlined />,
  },
  {
    key: Route.Bookings,
    label: <Link to={Route.Bookings}>Booking</Link>,
    icon: <ReconciliationOutlined />,
  },
]

const itemsRoleAdministrator: MenuItem[] =
  user?.role == ERole.Administrator
    ? [
        {
          key: Route.BookingsApproval,
          label: <Link to={Route.BookingsApproval}>Booking Approval</Link>,
          icon: <AuditOutlined />,
        },
        {
          key: Route.Rooms,
          label: <Link to={Route.Rooms}>Room</Link>,
          icon: <MergeCellsOutlined />,
        },
        {
          key: Route.Users,
          label: <Link to={Route.Users}>User</Link>,
          icon: <UsergroupAddOutlined />,
        },
      ]
    : []

export const menuItems: MenuItem[] = [
  ...itemsRoleUser,
  ...itemsRoleAdministrator,
]
