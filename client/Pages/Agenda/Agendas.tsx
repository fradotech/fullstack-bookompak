import { PlusCircleFilled } from '@ant-design/icons'
import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { AgendaResponse } from '@server/modules/feature/agenda/infrastructure/agenda.response'
import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import DataTable from '../../Components/Organs/DataTable/DataTable'
import { useTableFilter } from '../../Components/Organs/DataTable/useTableFilter'
import { ERole } from '../../Enums/Role.enum'
import { Route } from '../../Enums/Route'
import { authAction } from '../Auth/Auth.action'
import { agendaAction } from './Agenda.action'
import { agendasColumns } from './Agendas.columns'


const Agendas: React.FC = () => {
  const user = authAction.loggedUser()
  const navigate = useNavigate()
  const [props, setProps] = React.useState<IPaginateResponse<AgendaResponse>>()
  const {
    setQueryParams,
    status: { isFetching },
  } = useTableFilter()

  React.useEffect(() => {
    ; (async () => setProps(await agendaAction.fetch()))()
  }, [])

  return (
    <>
      {user.role == ERole.Administrator && <Button
        type="primary"
        onClick={() => {
          navigate(Route.AgendaCreate)
        }}
        style={{
          float: 'right',
        }}
      >
        <PlusCircleFilled />
        Tambah Agenda
      </Button>}
      <DataTable
        columns={agendasColumns}
        dataSource={props?.data?.map((item) => ({
          ...item,
          key: item.id,
        }))}
        meta={props?.meta}
        onPageChange={(page, pageSize) =>
          setQueryParams({ page: page, per_page: pageSize })
        }
        loading={isFetching}
      />
    </>
  )
}

export default Agendas
