import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import { Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'
import { RowActionButtons } from '../../Components/Molecules/RowActionButtons/RowActionButtons'
import { ERole } from '../../Enums/Role.enum'
import { Route } from '../../Enums/Route'

export const usersColumns: ColumnsType<UserResponse> = [
  {
    title: 'Nama',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Role',
    key: 'role',
    render: (data: UserResponse) => {
      if (data.role == ERole.Administrator)
        return <Tag color="blue">{data.role}</Tag>

      return <Tag color="green">{data.role}</Tag>
    },
  },
  {
    title: 'Nomor Telepon',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: 'Aksi',
    key: 'action',
    width: '130px',
    render: (data: UserResponse) => {
      return (
        <RowActionButtons
          actions={[
            {
              type: 'view',
              href: `${Route.Users}/${data.id}`,
              title: 'view',
            },
            /* TODO: Enable */
            // {
            //   type: 'edit',
            //   title: 'edit',
            //   onClick: () => {
            //     alert('Tambah Fitur Edit User?')
            //   },
            // },
            // {
            //   type: 'delete',
            //   title: 'delete',
            //   onClick: () => {
            //     alert('Tambah Fitur Delete User?')
            //   },
            // },
          ]}
        />
      )
    },
  },
]
