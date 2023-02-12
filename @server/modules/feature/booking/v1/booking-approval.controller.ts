import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from '@server/infrastructure/interfaces/api.response'
import { AdminGuard } from '@server/modules/iam/auth/common/admin.guard'
import { Modules } from '@server/modules/modules'
import { BookingCrudApp } from '../infrastructure/booking-crud.app'
import {
  BookingIndexRequest,
  BookingUpdateRequest,
} from '../infrastructure/booking.request'
import { BookingResponse } from '../infrastructure/booking.response'

const THIS_MODULE = Modules.Bookings + '/approval'

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@UseGuards(AdminGuard)
export class BookingApprovalController {
  constructor(private readonly roomCrudApp: BookingCrudApp) {}

  @Get()
  async fetch(
    @Query() req: BookingIndexRequest,
  ): Promise<IApiRes<BookingResponse[]>> {
    const res = await this.roomCrudApp.fetch(req)
    return ApiRes.all(BookingResponse.fromEntities(res.data), res.meta)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: BookingUpdateRequest,
  ): Promise<IApiRes<BookingResponse>> {
    const data = await this.roomCrudApp.update(id, req)
    return ApiRes.all(BookingResponse.fromEntity(data))
  }
}
