import { PartialType } from '@nestjs/swagger'
import { AppRoom } from './room.entity'
import { IAppRoom } from './room.interface'

export class RoomResponse extends PartialType(AppRoom) {
  id: string

  static fromEntity(data: IAppRoom): RoomResponse {
    const res = new RoomResponse()

    res.id = data.id
    res.name = data.name
    res.number = data.number
    res.isReady = data.isReady
    res.type = data.type
    res.location = data.location
    res.description = data.description
    res.updatedAt = data.updatedAt

    return res
  }

  static fromEntities(data: IAppRoom[]): RoomResponse[] {
    return data.map((data) => this.fromEntity(data))
  }
}
