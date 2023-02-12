import { IBaseEntity } from '../../../../infrastructure/base/base-entity.interface'

export interface IAppAgenda extends IBaseEntity {
  name: string
  location: string
  description: string
  startAt: Date
  endAt: Date
}
