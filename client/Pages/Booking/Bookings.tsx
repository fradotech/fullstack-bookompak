import { PlusCircleFilled } from '@ant-design/icons'
import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { BookingResponse } from '@server/modules/feature/booking/infrastructure/booking.response'
import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import DataTable from '../../Components/Organs/DataTable/DataTable'
import { useTableFilter } from '../../Components/Organs/DataTable/useTableFilter'
import { Route } from '../../Enums/Route'
import { bookingAction } from './Booking.action'
import { bookingsColumns } from './Booking.columns'

const Bookings: React.FC = () => {
  const navigate = useNavigate()
  const [props, setProps] = React.useState<IPaginateResponse<BookingResponse>>()
  const {
    setQueryParams,
    status: { isFetching },
  } = useTableFilter()

  React.useEffect(() => {
    ; (async () => setProps(await bookingAction.fetch()))()
  }, [])

  return (
    <>
      {/* TODO: Enable */}
      {/* <Button
        onClick={() => {
          alert('Tambah fitur filter status?')
        }}
      >
        <FilterOutlined />
        Filter by Status
      </Button> */}
      <Button
        type="primary"
        onClick={() => {
          navigate(Route.BookingCreate)
        }}
        style={{
          float: 'right',
        }}
      >
        <PlusCircleFilled />
        New Booking
      </Button>
      <DataTable
        columns={bookingsColumns}
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

export default Bookings
