import { BookingResponse } from '@server/modules/feature/booking/infrastructure/booking.response'
import { Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'
import { RowActionButtons } from '../../Components/Molecules/RowActionButtons/RowActionButtons'
import { Route } from '../../Enums/Route'
import { EBookingStatus } from '../Booking/Booking.enum'
import { bookingApprovalAction } from './BookingApproval.action'

export const bookingsColumns: ColumnsType<BookingResponse> = [
  {
    title: 'User Name',
    key: 'user.name',
    render: (data: BookingResponse) => data.user?.name || '-',
  },
  {
    title: 'Goal',
    dataIndex: 'goal',
    key: 'goal',
  },
  {
    title: 'Start At',
    key: 'startAt',
    render: (data: BookingResponse) => data.startAt.toString(),
  },
  {
    title: 'End At',
    key: 'endAt',
    render: (data: BookingResponse) => data.endAt.toString(),
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
        return <Tag color="red">{EBookingStatus.Reject}</Tag>
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
              type: 'check',
              title: 'approve',
              onClick: async () => {
                const isConfirm = confirm('Yakin bang?')
                if (isConfirm) {
                  (await bookingApprovalAction.updateStatus(data.id, {
                    status: EBookingStatus.Approve
                  })) &&
                    location.reload()
                }
              },
            },
            {
              type: 'close',
              title: 'reject',
              onClick: async () => {
                const isConfirm = confirm('Yakin bang?')
                if (isConfirm) {
                  (await bookingApprovalAction.updateStatus(data.id, {
                    status: EBookingStatus.Reject
                  })) &&
                    location.reload()
                }
              },
            },
          ]}
        />
      )
    },
  },
]
