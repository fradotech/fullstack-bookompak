import { Injectable } from '@nestjs/common'
import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { RoomIndexService } from './room-index.service'
import { AppRoom } from './room.entity'
import { IAppRoom } from './room.interface'
import {
  RoomCreateRequest, RoomIndexRequest, RoomUpdateRequest
} from './room.request'
import { RoomService } from './room.service'

@Injectable()
export class RoomCrudApp {
  constructor(
    private readonly roomIndexApp: RoomIndexService,
    private readonly roomService: RoomService,
  ) {}

  async fetch(req: RoomIndexRequest): Promise<IPaginateResponse<IAppRoom>> {
    req.perPage = 10000
    const res = await this.roomIndexApp.fetch(req)
    return res
  }

  async create(req: RoomCreateRequest): Promise<IAppRoom> {
    const data = new AppRoom()
    Object.assign(data, req)

    return await this.roomService.create(data)
  }

  async find(): Promise<IAppRoom[]> {
    return await this.roomService.find()
  }

  async findOneOrFail(id: string): Promise<IAppRoom> {
    return await this.roomService.findOneOrFail(id)
  }

  async update(id: string, req: RoomUpdateRequest): Promise<IAppRoom> {
    const data = await this.roomService.findOneOrFail(id)
    Object.assign(data, req)
    return await this.roomService.update(data)
  }

  async remove(id: string): Promise<IAppRoom> {
    const data = this.roomService.findOneOrFail(id)
    await this.roomService.remove(id)
    return data
  }

  async softRemove(id: string): Promise<IAppRoom> {
    const data = this.roomService.findOneOrFail(id)
    await this.roomService.softRemove(id)
    return data
  }
}
