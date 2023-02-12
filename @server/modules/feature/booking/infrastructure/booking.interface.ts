import { IAppUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { IAppAttachment } from '@server/modules/support/attachment/infrastructure/attachment.interface'
import { IBaseEntity } from '../../../../infrastructure/base/base-entity.interface'
import { IAppRoom } from '../../room/infrastructure/room.interface'
import { EBookingStatus } from '../common/booking.enum'

export interface IAppBooking extends IBaseEntity {
  user: IAppUser
  room: IAppRoom
  status: EBookingStatus
  goal: string
  description: string
  startAt: Date
  endAt: Date
  attachment?: IAppAttachment
}
