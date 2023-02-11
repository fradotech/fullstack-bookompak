import { Logger } from '@nestjs/common'
import { DataSourceOptions } from '@server/database/config.db'
import { AppRoom } from '@server/modules/feature/room/infrastructure/room.entity'
import { IAppRoom } from '@server/modules/feature/room/infrastructure/room.interface'
import { EntityManager, Repository } from 'typeorm'
import { roomsDummies } from './rooms.dummy'

export const roomSeeder = async (): Promise<boolean> => {
  const data = roomsDummies
  const repo = new Repository<IAppRoom>(
    AppRoom,
    new EntityManager(DataSourceOptions),
  )
  const table = AppRoom.name

  const roomExist = await repo
    .createQueryBuilder(table)
    .where(`${table}.number = :number`, { number: data[0].number })
    .getOne()

  if (roomExist) return false

  await repo.createQueryBuilder(table).insert().values(data).execute()

  Logger.log(
    'Success run rooms seeders ',
    data.map((data) => data.number).toString(),
  )

  return true
}
