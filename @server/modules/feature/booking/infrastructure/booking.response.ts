import { PartialType } from '@nestjs/swagger'
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import { AppBooking } from './booking.entity'
import { IAppBooking } from './booking.interface'

export class BookingResponse extends PartialType(AppBooking) {
  id: string

  static fromEntity(data: IAppBooking): BookingResponse {
    const res = new BookingResponse()

    res.id = data.id
    res.user = UserResponse.fromEntity(data.user)
    res.room = data.room
    res.goal = data.goal
    res.description = data.description
    res.startAt = data.startAt
    res.endAt = data.endAt
    res.updatedAt = data.updatedAt
    res.attachment = data.attachment

    return res
  }

  static fromEntities(data: IAppBooking[]): BookingResponse[] {
    return data.map((data) => this.fromEntity(data))
  }
}
