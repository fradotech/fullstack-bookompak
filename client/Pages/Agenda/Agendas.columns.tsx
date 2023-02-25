import { AgendaResponse } from '@server/modules/feature/agenda/infrastructure/agenda.response'
import { ColumnsType } from 'antd/es/table'
import React from 'react'
import { RowActionButtons } from '../../Components/Molecules/RowActionButtons/RowActionButtons'
import { ERole } from '../../Enums/Role.enum'
import { Route } from '../../Enums/Route'
import { authAction } from '../Auth/Auth.action'
import { agendaAction } from './Agenda.action'

const user = authAction.loggedUser()

export const agendasColumns: ColumnsType<AgendaResponse> = [
  {
    title: 'Nama',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Lokasi',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'Deskripsi',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Waktu Mulai',
    dataIndex: 'startAt',
    key: 'startAt',
  },
  {
    title: 'Waktu Selesai',
    dataIndex: 'endAt',
    key: 'endAt',
  },
  {
    title: 'Aksi',
    key: 'action',
    width: '130px',
    render: (data: AgendaResponse) => {
      return (
        <RowActionButtons
          actions={[
            {
              type: 'view',
              href: `${Route.Agendas}/${data.id}`,
              title: 'view',
            },
            /* TODO: Enable */
            // {
            //   type: 'edit',
            //   title: 'edit',
            //   onClick: () => {
            //     alert('Tambah Fitur Update Agenda?')
            //   },
            // },
            user.role == ERole.Administrator && {
              type: 'delete',
              title: 'delete',
              onClick: async () => {
                const isConfirm = confirm('Yakin?')
                isConfirm &&
                  (await agendaAction.remove(data.id)) &&
                  location.reload()
              },
            },
          ]}
        />
      )
    },
  },
]
