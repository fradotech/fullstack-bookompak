import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from '@server/infrastructure/base/base.service'
import { Repository } from 'typeorm'
import { AppRoom } from './room.entity'
import { IAppRoom } from './room.interface'

@Injectable()
export class RoomService implements BaseService {
  constructor(
    @InjectRepository(AppRoom)
    private readonly roomRepo: Repository<IAppRoom>,
  ) {}

  async create(req: IAppRoom): Promise<IAppRoom> {
    const data = this.roomRepo.create(req)
    return await this.roomRepo.save(data)
  }

  async find(): Promise<IAppRoom[]> {
    return await this.roomRepo.find()
  }

  async findOne(id: string): Promise<IAppRoom> {
    return await this.roomRepo.findOne({ where: { id } })
  }

  async findOneOrFail(id: string): Promise<IAppRoom> {
    return await this.roomRepo.findOneOrFail({ where: { id } })
  }

  async update(req: IAppRoom): Promise<IAppRoom> {
    const data = this.roomRepo.create(req)
    await this.roomRepo.update(data.id, data)
    return await this.findOneOrFail(req.id)
  }

  async remove(id: string): Promise<IAppRoom> {
    const data = (await this.findOneOrFail(id)) as AppRoom
    return await this.roomRepo.remove(data)
  }

  async softRemove(id: string): Promise<IAppRoom> {
    const data = (await this.findOneOrFail(id)) as AppRoom
    return await this.roomRepo.softRemove(data)
  }

  // Another findOneBy() Methods
}
