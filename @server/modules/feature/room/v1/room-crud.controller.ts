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
import { LoggedInGuard } from '@server/modules/iam/auth/common/logged-in.guard'
import { Modules } from '@server/modules/modules'
import { RoomCrudApp } from '../infrastructure/room-crud.app'
import {
  RoomCreateRequest, RoomIndexRequest, RoomUpdateRequest
} from '../infrastructure/room.request'
import { RoomResponse } from '../infrastructure/room.response'

const THIS_MODULE = Modules.Rooms

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
export class RoomCrudController implements BaseCrudController {
  constructor(private readonly roomCrudApp: RoomCrudApp) {}

  @UseGuards(LoggedInGuard)
  @Get()
  async fetch(
    @Query() req: RoomIndexRequest,
  ): Promise<IApiRes<RoomResponse[]>> {
    const res = await this.roomCrudApp.fetch(req)
    return ApiRes.all(RoomResponse.fromEntities(res.data), res.meta)
  }

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() req: RoomCreateRequest): Promise<IApiRes<RoomResponse>> {
    const data = await this.roomCrudApp.create(req)
    return ApiRes.all(RoomResponse.fromEntity(data))
  }

  @UseGuards(LoggedInGuard)
  @Get(':id')
  async findOneOrFail(@Param('id') id: string): Promise<IApiRes<RoomResponse>> {
    const data = await this.roomCrudApp.findOneOrFail(id)
    return ApiRes.all(RoomResponse.fromEntity(data))
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: RoomUpdateRequest,
  ): Promise<IApiRes<RoomResponse>> {
    const data = await this.roomCrudApp.update(id, req)
    return ApiRes.all(RoomResponse.fromEntity(data))
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IApiRes<RoomResponse>> {
    const data = await this.roomCrudApp.remove(id)
    return ApiRes.all(RoomResponse.fromEntity(data))
  }
}
