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
    title: 'Nama User',
    key: 'user.name',
    render: (data: BookingResponse) => data.user?.name || '-',
  },
  {
    title: 'Tujuan',
    dataIndex: 'goal',
    key: 'goal',
  },
  {
    title: 'Waktu Mulai',
    key: 'startAt',
    render: (data: BookingResponse) => data.startAt.toString(),
  },
  {
    title: 'Waktu Selesai',
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
    title: 'Aksi',
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
            /* TODO: Enable */
            // {
            //   type: 'edit',
            //   title: 'edit',
            //   onClick: () => {
            //     alert('Tambah Fitur Update Booking?')
            //   },
            // },
            {
              type: 'delete',
              title: 'delete',
              onClick: async () => {
                const isConfirm = confirm('Apakah anda yakin ingin menghapus?')
                isConfirm &&
                  (await bookingAction.remove(data.id)) &&
                  location.reload()
              },
            },
          ]}
        />
      )
    },
  },
]
