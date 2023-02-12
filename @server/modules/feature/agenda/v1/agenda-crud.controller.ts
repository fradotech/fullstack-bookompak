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
import { LoggedInGuard } from '@server/modules/iam/auth/common/logged-in.guard'
import { Modules } from '@server/modules/modules'
import { AgendaCrudApp } from '../infrastructure/agenda-crud.app'
import {
  AgendaCreateRequest,
  AgendaIndexRequest,
  AgendaUpdateRequest,
} from '../infrastructure/agenda.request'
import { AgendaResponse } from '../infrastructure/agenda.response'

const THIS_MODULE = Modules.Agendas

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
export class AgendaCrudController implements BaseCrudController {
  constructor(private readonly roomCrudApp: AgendaCrudApp) {}

  @UseGuards(LoggedInGuard)
  @Get()
  async fetch(
    @Query() req: AgendaIndexRequest,
  ): Promise<IApiRes<AgendaResponse[]>> {
    const res = await this.roomCrudApp.fetch(req)
    return ApiRes.all(AgendaResponse.fromEntities(res.data), res.meta)
  }

  @UseGuards(AdminGuard)
  @Post()
  async create(
    @Body() req: AgendaCreateRequest,
  ): Promise<IApiRes<AgendaResponse>> {
    const data = await this.roomCrudApp.create(req)
    return ApiRes.all(AgendaResponse.fromEntity(data))
  }

  @UseGuards(LoggedInGuard)
  @Get(':id')
  async findOneOrFail(
    @Param('id') id: string,
  ): Promise<IApiRes<AgendaResponse>> {
    const data = await this.roomCrudApp.findOneOrFail(id)
    return ApiRes.all(AgendaResponse.fromEntity(data))
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: AgendaUpdateRequest,
  ): Promise<IApiRes<AgendaResponse>> {
    const data = await this.roomCrudApp.update(id, req)
    return ApiRes.all(AgendaResponse.fromEntity(data))
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IApiRes<AgendaResponse>> {
    const data = await this.roomCrudApp.remove(id)
    return ApiRes.all(AgendaResponse.fromEntity(data))
  }
}
