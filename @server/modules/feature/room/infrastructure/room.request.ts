import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IndexRequest } from '@server/infrastructure/index/index.request'
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { ERoomType } from './room.enum'
import { IAppRoom } from './room.interface'

export class RoomIndexRequest extends IndexRequest {}

export class RoomRequest implements IAppRoom {
  id: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Nanang VIP' })
  name: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '12345' })
  number: string

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: true })
  isReady: boolean

  @IsNotEmpty()
  @IsEnum(ERoomType)
  @ApiProperty({ example: ERoomType.Biasa })
  type: ERoomType

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Sebelah sana' })
  location: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Bayar woy bayar' })
  description?: string
}

export class RoomUpdateRequest extends PartialType(RoomRequest) {}
