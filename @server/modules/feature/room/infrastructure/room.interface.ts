import { IBaseEntity } from '../../../../infrastructure/base/base-entity.interface'
import { ERoomType } from './room.enum'

export interface IAppRoom extends IBaseEntity {
  name: string
  number: string
  isReady: boolean
  type: ERoomType
  location: string
  description?: string
}
