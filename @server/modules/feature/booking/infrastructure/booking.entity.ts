import { BaseEntity } from '@server/infrastructure/base/base.entity'
import { IAppRoom } from '@server/modules/feature/room/infrastructure/room.interface'
import { AppUser } from '@server/modules/iam/user/infrastructure/user.entity'
import { IAppUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { AppAttachment } from '@server/modules/support/attachment/infrastructure/attachment.entity'
import { IAppAttachment } from '@server/modules/support/attachment/infrastructure/attachment.interface'
import { Column, Entity, ManyToOne } from 'typeorm'
import { AppRoom } from '../../room/infrastructure/room.entity'
import { EBookingStatus } from '../common/booking.enum'
import { IAppBooking } from './booking.interface'

@Entity()
export class AppBooking extends BaseEntity implements IAppBooking {
  @ManyToOne(() => AppUser)
  user: IAppUser

  @ManyToOne(() => AppRoom)
  room: IAppRoom

  @Column({
    type: 'enum',
    enum: EBookingStatus,
    default: EBookingStatus.Pending,
  })
  status: EBookingStatus

  @Column()
  goal: string

  @Column()
  description: string

  @Column()
  startAt: Date

  @Column()
  endAt: Date

  @ManyToOne(() => AppAttachment)
  attachment?: IAppAttachment
}
