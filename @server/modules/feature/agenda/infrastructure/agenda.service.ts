import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from '@server/infrastructure/base/base.service'
import { Repository } from 'typeorm'
import { AppAgenda } from './agenda.entity'
import { IAppAgenda } from './agenda.interface'

@Injectable()
export class AgendaService implements BaseService {
  constructor(
    @InjectRepository(AppAgenda)
    private readonly agendaRepo: Repository<IAppAgenda>,
  ) {}

  async create(req: IAppAgenda): Promise<IAppAgenda> {
    const data = this.agendaRepo.create(req)
    return await this.agendaRepo.save(data)
  }

  async find(): Promise<IAppAgenda[]> {
    return await this.agendaRepo.find()
  }

  async findOne(id: string): Promise<IAppAgenda> {
    return await this.agendaRepo.findOne({ where: { id } })
  }

  async findOneOrFail(id: string): Promise<IAppAgenda> {
    return await this.agendaRepo.findOneOrFail({ where: { id } })
  }

  async update(req: IAppAgenda): Promise<IAppAgenda> {
    const data = this.agendaRepo.create(req)
    await this.agendaRepo.update(data.id, data)
    return await this.findOneOrFail(req.id)
  }

  async remove(id: string): Promise<IAppAgenda> {
    const data = (await this.findOneOrFail(id)) as AppAgenda
    return await this.agendaRepo.remove(data)
  }

  async softRemove(id: string): Promise<IAppAgenda> {
    const data = (await this.findOneOrFail(id)) as AppAgenda
    return await this.agendaRepo.softRemove(data)
  }

  // Another findOneBy() Methods
}
