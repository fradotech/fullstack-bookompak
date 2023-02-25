import { RoomResponse } from '@server/modules/feature/room/infrastructure/room.response'
import { Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'
import { RowActionButtons } from '../../Components/Molecules/RowActionButtons/RowActionButtons'
import { Route } from '../../Enums/Route'
import { roomAction } from './Room.action'

export const roomsColumns: ColumnsType<RoomResponse> = [
  {
    title: 'Nama',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Nomor',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: 'Tersedia',
    key: 'isReady',
    render: (data: RoomResponse) => {
      if (data.isReady) return <Tag color="green">Ya</Tag>

      return <Tag color="red">Tidak</Tag>
    },
  },
  {
    title: 'Lokasi',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'Aksi',
    key: 'action',
    width: '130px',
    render: (data: RoomResponse) => {
      return (
        <RowActionButtons
          actions={[
            {
              type: 'view',
              href: `${Route.Rooms}/${data.id}`,
              title: 'view',
            },
            /* TODO: Enable */
            // {
            //   type: 'edit',
            //   title: 'edit',
            //   onClick: () => {
            //     alert('Tambah Fitur Update Room?')
            //   },
            // },
            {
              type: 'delete',
              title: 'delete',
              onClick: async () => {
                const isConfirm = confirm('Yakin?')
                isConfirm &&
                  (await roomAction.remove(data.id)) &&
                  location.reload()
              },
            },
          ]}
        />
      )
    },
  },
]
