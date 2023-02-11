import { BaseEntity } from '@server/infrastructure/base/base.entity'
import { Column, Entity } from 'typeorm'
import { ERoomType } from './room.enum'
import { IAppRoom } from './room.interface'

@Entity()
export class AppRoom extends BaseEntity implements IAppRoom {
  @Column()
  name: string

  @Column({ unique: true })
  number: string

  @Column({ default: true })
  isReady: boolean

  @Column({ type: 'enum', enum: ERoomType, default: ERoomType.Biasa })
  type: ERoomType

  @Column()
  location: string

  @Column()
  description?: string
}
