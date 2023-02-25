import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { BookingResponse } from '@server/modules/feature/booking/infrastructure/booking.response'
import React from 'react'
import DataTable from '../../Components/Organs/DataTable/DataTable'
import { useTableFilter } from '../../Components/Organs/DataTable/useTableFilter'
import { bookingApprovalAction } from './BookingApproval.action'
import { bookingsColumns } from './BookingApproval.columns'

const BookingsApproval: React.FC = () => {
  const [props, setProps] = React.useState<IPaginateResponse<BookingResponse>>()
  const {
    setQueryParams,
    status: { isFetching },
  } = useTableFilter()

  React.useEffect(() => {
    ; (async () => setProps(await bookingApprovalAction.fetch()))()
  }, [])

  return (
    <>
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

export default BookingsApproval
