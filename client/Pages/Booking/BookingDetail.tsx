import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { BookingResponse } from '@server/modules/feature/booking/infrastructure/booking.response'
import { Button, Descriptions, Space, Tag } from 'antd'
import React from 'react'
import { useParams } from 'react-router-dom'
import DescriptionContainer from '../../Components/Molecules/DescriptionContainer/DescriptionContainer'
import { Section } from '../../Components/Molecules/Section/Section'
import { Route } from '../../Enums/Route'
import { defaultSizeSpace } from '../../utils/theme'
import { bookingAction } from './Booking.action'

const BookingDetail: React.FC = () => {
  const { id } = useParams()
  const [props, setProps] = React.useState<IApiRes<BookingResponse>>()

  React.useEffect(() => {
    ; (async () => setProps(await bookingAction.findOne(id)))()
  }, [])

  return (
    <Space
      direction="vertical"
      size={defaultSizeSpace}
      style={{ width: '100%' }}
    >
      <Section>
        <DescriptionContainer>
          <Descriptions.Item label="Status">
            <Tag> {props?.data?.status}</Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Nama User">
            <Button href={`${Route.Users}/${props?.data?.user.id}`}>
              {props?.data?.user.name}
            </Button>
          </Descriptions.Item>

          <Descriptions.Item label="Ruangan">
            <Button href={`${Route.Rooms}/${props?.data?.room.id}`}>
              {props?.data?.room.name}
            </Button>
          </Descriptions.Item>

          <Descriptions.Item label="Tujuan">
            {props?.data?.goal}
          </Descriptions.Item>

          <Descriptions.Item label="Deskripsi">
            {props?.data?.description}
          </Descriptions.Item>

          <Descriptions.Item label="Waktu Mulai">
            {props?.data?.startAt.toString()}
          </Descriptions.Item>

          <Descriptions.Item label="Waktu Selesai">
            {props?.data?.endAt.toString()}
          </Descriptions.Item>

          <Descriptions.Item label="Waktu">
            {props?.data?.updatedAt.toString()}
          </Descriptions.Item>
        </DescriptionContainer>
      </Section>
    </Space>
  )
}

export default BookingDetail
