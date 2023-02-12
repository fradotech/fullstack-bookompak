import { Injectable } from '@nestjs/common'
import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { AgendaIndexService } from './agenda-index.service'
import { AppAgenda } from './agenda.entity'
import { IAppAgenda } from './agenda.interface'
import {
  AgendaCreateRequest,
  AgendaIndexRequest,
  AgendaUpdateRequest,
} from './agenda.request'
import { AgendaService } from './agenda.service'

@Injectable()
export class AgendaCrudApp {
  constructor(
    private readonly agendaIndexApp: AgendaIndexService,
    private readonly agendaService: AgendaService,
  ) {}

  async fetch(req: AgendaIndexRequest): Promise<IPaginateResponse<IAppAgenda>> {
    req.perPage = 10000
    const res = await this.agendaIndexApp.fetch(req)
    return res
  }

  async create(req: AgendaCreateRequest): Promise<IAppAgenda> {
    const data = new AppAgenda()
    Object.assign(data, req)

    return await this.agendaService.create(data)
  }

  async find(): Promise<IAppAgenda[]> {
    return await this.agendaService.find()
  }

  async findOneOrFail(id: string): Promise<IAppAgenda> {
    return await this.agendaService.findOneOrFail(id)
  }

  async update(id: string, req: AgendaUpdateRequest): Promise<IAppAgenda> {
    const data = await this.agendaService.findOneOrFail(id)
    Object.assign(data, req)
    return await this.agendaService.update(data)
  }

  async remove(id: string): Promise<IAppAgenda> {
    const data = this.agendaService.findOneOrFail(id)
    await this.agendaService.remove(id)
    return data
  }

  async softRemove(id: string): Promise<IAppAgenda> {
    const data = this.agendaService.findOneOrFail(id)
    await this.agendaService.softRemove(id)
    return data
  }
}
