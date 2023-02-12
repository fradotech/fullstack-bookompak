import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IndexRequest } from '@server/infrastructure/index/index.request'
import { IsDate, IsNotEmpty, IsObject, IsString } from 'class-validator'
import { AppRoom } from '../../room/infrastructure/room.entity'
import { IAppRoom } from '../../room/infrastructure/room.interface'
import { IAppBooking } from './booking.interface'

export class BookingIndexRequest extends IndexRequest {}

export class BookingRequest implements Omit<IAppBooking,
  'user' |
  'status'
> {
  id: string

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

  // @IsNotEmpty()
  // @IsString()
  // @ApiProperty({ example: 'Nanang' })
  // attachment: IAppAttachment

}

export class BookingUpdateRequest extends PartialType(BookingRequest) {}
