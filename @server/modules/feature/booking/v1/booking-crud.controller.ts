import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { BaseCrudController } from '@server/infrastructure/base/base-crud.controller'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from '@server/infrastructure/interfaces/api.response'
import { AdminGuard } from '@server/modules/iam/auth/common/admin.guard'
import { Modules } from '@server/modules/modules'
import { BookingCrudApp } from '../infrastructure/booking-crud.app'
import {
  BookingIndexRequest,
  BookingRequest,
  BookingUpdateRequest
} from '../infrastructure/booking.request'
import { BookingResponse } from '../infrastructure/booking.response'

const THIS_MODULE = Modules.Bookings

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@UseGuards(AdminGuard)
export class BookingCrudController implements BaseCrudController {
  constructor(private readonly roomCrudApp: BookingCrudApp) {}

  @Get()
  async fetch(
    @Query() req: BookingIndexRequest,
  ): Promise<IApiRes<BookingResponse[]>> {
    const res = await this.roomCrudApp.fetch(req)
    return ApiRes.all(BookingResponse.fromEntities(res.data), res.meta)
  }

  @Post()
  async create(@Body() req: BookingRequest): Promise<IApiRes<BookingResponse>> {
    const data = await this.roomCrudApp.create(req)
    return ApiRes.all(BookingResponse.fromEntity(data))
  }

  @Get(':id')
  async findOneOrFail(@Param('id') id: string): Promise<IApiRes<BookingResponse>> {
    const data = await this.roomCrudApp.findOneOrFail(id)
    return ApiRes.all(BookingResponse.fromEntity(data))
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: BookingUpdateRequest,
  ): Promise<IApiRes<BookingResponse>> {
    const data = await this.roomCrudApp.update(id, req)
    return ApiRes.all(BookingResponse.fromEntity(data))
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IApiRes<BookingResponse>> {
    const data = await this.roomCrudApp.remove(id)
    return ApiRes.all(BookingResponse.fromEntity(data))
  }
}
