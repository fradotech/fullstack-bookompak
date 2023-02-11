import {
  AuditOutlined,
  DashboardOutlined,
  MergeCellsOutlined,
  ReconciliationOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'

import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from '../../Enums/Route'

export type IProps = {
  children: React.ReactNode
  headerRightMenu?: React.FC
}

type MenuItem = Required<MenuProps>['items'][number]

export const menuItems: MenuItem[] = [
  {
    key: Route.Dashboard,
    label: <Link to={Route.Dashboard}>Dashboard</Link>,
    icon: <DashboardOutlined />,
  },
  {
    key: Route.Booking,
    label: <Link to={Route.Booking}>Booking</Link>,
    icon: <ReconciliationOutlined />,
  },
  {
    key: Route.BookingApproval,
    label: <Link to={Route.BookingApproval}>Booking Approval</Link>,
    icon: <AuditOutlined />,
  },
  {
    key: Route.Room,
    label: <Link to={Route.Room}>Room</Link>,
    icon: <MergeCellsOutlined />,
  },
  {
    key: Route.User,
    label: <Link to={Route.User}>User</Link>,
    icon: <UsergroupAddOutlined />,
  },
]
