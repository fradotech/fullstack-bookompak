import { BaseEntity } from '@server/infrastructure/base/base.entity'
import { Column, Entity } from 'typeorm'
import { IAppAgenda } from './agenda.interface'

@Entity()
export class AppAgenda extends BaseEntity implements IAppAgenda {
  @Column()
  name: string

  @Column()
  location: string

  @Column()
  description: string

  @Column()
  startAt: Date

  @Column()
  endAt: Date
}
