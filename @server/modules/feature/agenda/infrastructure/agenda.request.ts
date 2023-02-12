import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IndexRequest } from '@server/infrastructure/index/index.request'
import { IsDate, IsNotEmpty, IsString } from 'class-validator'
import { IAppAgenda } from './agenda.interface'

export class AgendaIndexRequest extends IndexRequest {}

class AgendaRequest implements IAppAgenda {
  id: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Nanang VIP' })
  name: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Sebelah sana' })
  location: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Bayar woy bayar' })
  description: string

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({ example: new Date() })
  startAt: Date

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({ example: new Date() })
  endAt: Date
}

export class AgendaCreateRequest extends PartialType(AgendaRequest) {}

export class AgendaUpdateRequest extends PartialType(AgendaRequest) {}
