import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { BaseCrudController } from '@server/infrastructure/base/base-crud.controller'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from '@server/infrastructure/interfaces/api.response'
import { AdminGuard } from '@server/modules/iam/auth/common/admin.guard'
import { Modules } from '@server/modules/modules'
import { RoomCrudApp } from '../infrastructure/room-crud.app'
import {
  RoomIndexRequest,
  RoomRequest,
  RoomUpdateRequest,
} from '../infrastructure/room.request'
import { RoomResponse } from '../infrastructure/room.response'

const THIS_MODULE = Modules.Rooms

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@UseGuards(AdminGuard)
export class RoomCrudController implements BaseCrudController {
  constructor(private readonly roomCrudApp: RoomCrudApp) {}

  @Get()
  async fetch(
    @Query() req: RoomIndexRequest,
  ): Promise<IApiRes<RoomResponse[]>> {
    const res = await this.roomCrudApp.fetch(req)
    return ApiRes.all(RoomResponse.fromEntities(res.data), res.meta)
  }

  @Post()
  async create(@Body() req: RoomRequest): Promise<IApiRes<RoomResponse>> {
    const data = await this.roomCrudApp.create(req)
    return ApiRes.all(RoomResponse.fromEntity(data))
  }

  @Get(':id')
  async findOneOrFail(@Param('id') id: string): Promise<IApiRes<RoomResponse>> {
    const data = await this.roomCrudApp.findOneOrFail(id)
    return ApiRes.all(RoomResponse.fromEntity(data))
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: RoomUpdateRequest,
  ): Promise<IApiRes<RoomResponse>> {
    const data = await this.roomCrudApp.update(id, req)
    return ApiRes.all(RoomResponse.fromEntity(data))
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IApiRes<RoomResponse>> {
    const data = await this.roomCrudApp.remove(id)
    return ApiRes.all(RoomResponse.fromEntity(data))
  }
}
