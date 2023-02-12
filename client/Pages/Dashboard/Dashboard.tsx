import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { AgendaResponse } from '@server/modules/feature/agenda/infrastructure/agenda.response'
import { BookingResponse } from '@server/modules/feature/booking/infrastructure/booking.response'
import { Col, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import CardImage from '../../Components/Molecules/Card/Card'
import { Route } from '../../Enums/Route'
import { agendaAction } from '../Agenda/Agenda.action'
import { bookingAction } from '../Booking/Booking.action'

const Dashboard: React.FC = () => {
  const [bookings, setBookings] = React.useState<IPaginateResponse<BookingResponse>>()
  const [agendas, setAgendas] = React.useState<IPaginateResponse<AgendaResponse>>()

  React.useEffect(() => {
    ; (async () => setBookings(await bookingAction.fetch()))()
  }, [])

  React.useEffect(() => {
    ; (async () => setAgendas(await agendaAction.fetch()))()
  }, [])

  return (
    <Row>
      <Col span={12}>
        <Title level={4}>Agendas</Title>
        <Row gutter={16}>
          {agendas?.data?.map((data) => {
            return (
              <CardImage
                title={data?.name}
                description={data?.description}
                href={`${Route.Agendas}/${data?.id}`}
              />
            )
          })}
        </Row>
      </Col>
      <Col span={12}>
        <Title level={4}>Bookings</Title>
        <Row gutter={16}>
          {bookings?.data?.map((data) => {
            return (
              <CardImage
                title={data?.user?.name}
                description={data?.description}
                href={`${Route.Bookings}/${data?.id}`}
              />
            )
          })}
        </Row>
      </Col>
    </Row>
  )
}

export default Dashboard
