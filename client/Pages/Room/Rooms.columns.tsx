import { RoomResponse } from '@server/modules/feature/room/infrastructure/room.response'
import { Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'
import { RowActionButtons } from '../../Components/Molecules/RowActionButtons/RowActionButtons'
import { Route } from '../../Enums/Route'
import { roomAction } from './Room.action'

export const roomsColumns: ColumnsType<RoomResponse> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Number',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: 'Is Ready',
    key: 'isReady',
    render: (data: RoomResponse) => {
      if (data.isReady) return <Tag color="green">Yes</Tag>

      return <Tag color="red">No</Tag>
    },
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'Action',
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
            {
              type: 'edit',
              title: 'edit',
              onClick: () => {
                alert('Tambah Fitur CRUD Room?')
              },
            },
            {
              type: 'delete',
              title: 'delete',
              onClick: () => {
                const isConfirm = confirm('Yakin bang?')
                isConfirm && roomAction.remove(data.id)
              },
            },
          ]}
        />
      )
    },
  },
]
