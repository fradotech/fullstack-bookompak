import { PartialType } from '@nestjs/swagger'
import { AppAgenda } from './agenda.entity'
import { IAppAgenda } from './agenda.interface'

export class AgendaResponse extends PartialType(AppAgenda) {
  id: string

  static fromEntity(data: IAppAgenda): AgendaResponse {
    const res = new AgendaResponse()

    res.id = data.id
    res.name = data.name
    res.location = data.location
    res.description = data.description
    res.startAt = data.startAt
    res.endAt = data.endAt
    res.updatedAt = data.updatedAt

    return res
  }

  static fromEntities(data: IAppAgenda[]): AgendaResponse[] {
    return data.map((data) => this.fromEntity(data))
  }
}
