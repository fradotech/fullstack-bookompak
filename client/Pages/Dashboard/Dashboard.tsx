import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { RoomResponse } from '@server/modules/feature/room/infrastructure/room.response'
import { Row } from 'antd'
import React from 'react'
import CardImage from '../../Components/Molecules/Card/Card'
import { Route } from '../../Enums/Route'
import { roomAction } from '../Room/Room.action'

const Dashboard: React.FC = () => {
  const [props, setProps] = React.useState<IPaginateResponse<RoomResponse>>()

  React.useEffect(() => {
    ;(async () => setProps(await roomAction.fetch()))()
  }, [])

  return (
    <Row gutter={16}>
      {props?.data?.map((data) => {
        return (
          <CardImage
            title={data.name}
            description={data.description}
            href={`${Route.BookingCreate}/${data.id}`}
          />
        )
      })}
    </Row>
  )
}

export default Dashboard
