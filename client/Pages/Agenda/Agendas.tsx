import { PlusCircleFilled } from '@ant-design/icons'
import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { AgendaResponse } from '@server/modules/feature/agenda/infrastructure/agenda.response'
import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import DataTable from '../../Components/Organs/DataTable/DataTable'
import { useTableFilter } from '../../Components/Organs/DataTable/useTableFilter'
import { Route } from '../../Enums/Route'
import { agendaAction } from './Agenda.action'
import { agendasColumns } from './Agendas.columns'

const Agendas: React.FC = () => {
  const navigate = useNavigate()
  const [props, setProps] = React.useState<IPaginateResponse<AgendaResponse>>()
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([])
  const {
    setQueryParams,
    status: { isFetching },
  } = useTableFilter()
  const onSelectChange = (selectRow: React.Key[]) =>
    setSelectedRowKeys(selectRow)

  React.useEffect(() => {
    ; (async () => setProps(await agendaAction.fetch()))()
  }, [])

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          navigate(Route.AgendaCreate)
        }}
        style={{
          float: 'right',
        }}
      >
        <PlusCircleFilled />
        New Agenda
      </Button>
      <DataTable
        rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
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
