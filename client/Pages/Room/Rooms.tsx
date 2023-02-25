import { PlusCircleFilled } from '@ant-design/icons'
import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { RoomResponse } from '@server/modules/feature/room/infrastructure/room.response'
import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import DataTable from '../../Components/Organs/DataTable/DataTable'
import { useTableFilter } from '../../Components/Organs/DataTable/useTableFilter'
import { Route } from '../../Enums/Route'
import { roomAction } from './Room.action'
import { roomsColumns } from './Rooms.columns'

const Rooms: React.FC = () => {
  const navigate = useNavigate()
  const [props, setProps] = React.useState<IPaginateResponse<RoomResponse>>()
  const {
    setQueryParams,
    status: { isFetching },
  } = useTableFilter()
  React.useEffect(() => {
    ; (async () => setProps(await roomAction.fetch()))()
  }, [])

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          navigate(Route.RoomCreate)
        }}
        style={{
          float: 'right',
        }}
      >
        <PlusCircleFilled />
        Tambah Ruangan
      </Button>
      <DataTable
        columns={roomsColumns}
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

export default Rooms
