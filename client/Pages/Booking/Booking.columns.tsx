import { BookingResponse } from '@server/modules/feature/booking/infrastructure/booking.response'
import { Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'
import { RowActionButtons } from '../../Components/Molecules/RowActionButtons/RowActionButtons'
import { Route } from '../../Enums/Route'
import { bookingAction } from './Booking.action'
import { EBookingStatus } from './Booking.enum'

export const bookingsColumns: ColumnsType<BookingResponse> = [
  {
    title: 'User Name',
    dataIndex: 'user.name',
    key: 'user.name',
  },
  {
    title: 'Goal',
    dataIndex: 'goal',
    key: 'goal',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Start At',
    dataIndex: 'startAt',
    key: 'startAt',
  },
  {
    title: 'End At',
    dataIndex: 'endAt',
    key: 'endAt',
  },
  {
    title: 'Status',
    key: 'status',
    render: (data: BookingResponse) => {
      if (data.status == EBookingStatus.Approve)
        return <Tag color="green">{EBookingStatus.Approve}</Tag>
      else if (data.status == EBookingStatus.Pending)
        return <Tag color="yellow">{EBookingStatus.Pending}</Tag>
      else if (data.status == EBookingStatus.Reject)
        return <Tag color="yellow">{EBookingStatus.Reject}</Tag>
      else return <Tag color="red">Error</Tag>
    },
  },
  {
    title: 'Action',
    key: 'action',
    width: '130px',
    render: (data: BookingResponse) => {
      return (
        <RowActionButtons
          actions={[
            {
              type: 'view',
              href: `${Route.Bookings}/${data.id}`,
              title: 'view',
            },
            {
              type: 'edit',
              title: 'edit',
              onClick: () => {
                alert('Tambah Fitur Update Booking?')
              },
            },
            {
              type: 'delete',
              title: 'delete',
              onClick: () => {
                const isConfirm = confirm('Yakin bang?')
                isConfirm && bookingAction.remove(data.id)
              },
            },
          ]}
        />
      )
    },
  },
]
