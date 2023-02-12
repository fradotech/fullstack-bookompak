import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger'
import { IndexRequest } from '@server/infrastructure/index/index.request'
import { IAppUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { AppAttachment } from '@server/modules/support/attachment/infrastructure/attachment.entity'
import { IAppAttachment } from '@server/modules/support/attachment/infrastructure/attachment.interface'
import { IsDate, IsEnum, IsNotEmpty, IsObject, IsString } from 'class-validator'
import { AppRoom } from '../../room/infrastructure/room.entity'
import { IAppRoom } from '../../room/infrastructure/room.interface'
import { EBookingStatus } from '../common/booking.enum'
import { IAppBooking } from './booking.interface'

export class BookingIndexRequest extends IndexRequest {
  filterStatus: EBookingStatus
}

class BookingRequest implements IAppBooking {
  id: string
  user: IAppUser

  @IsNotEmpty()
  @IsEnum(EBookingStatus)
  @ApiProperty({ example: 'Push sampai glory' })
  status: EBookingStatus

  @IsNotEmpty()
  @IsObject()
  @ApiProperty({ example: new AppRoom() })
  room: IAppRoom

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Push sampai glory' })
  goal: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Maniac savage victory' })
  description: string

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({ example: new Date() })
  startAt: Date

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({ example: new Date() })
  endAt: Date

  @IsNotEmpty()
  @IsObject()
  @ApiProperty({ example: new AppAttachment() })
  attachment: IAppAttachment
}

export class BookingCreateRequest extends OmitType(BookingRequest, [
  'user',
  'status',
  'attachment',
]) {}

export class BookingUpdateRequest extends PartialType(BookingCreateRequest) {}

export class BookingApprovalRequest extends PickType(BookingRequest, [
  'status',
]) {}
