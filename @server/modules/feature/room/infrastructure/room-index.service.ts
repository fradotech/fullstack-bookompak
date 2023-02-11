import { InjectRepository } from '@nestjs/typeorm'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { IPaginateResponse } from '../../../../infrastructure/index/index.interface'
import { BaseIndexService } from '../../../../infrastructure/index/index.service'
import { AppRoom } from './room.entity'
import { IAppRoom } from './room.interface'
import { RoomIndexRequest } from './room.request'

export class RoomIndexService extends BaseIndexService {
  constructor(
    @InjectRepository(AppRoom)
    private readonly roomRepo: Repository<IAppRoom>,
  ) {
    super()
  }

  additionalQuery(
    query: SelectQueryBuilder<IAppRoom>,
    req: RoomIndexRequest,
  ): SelectQueryBuilder<IAppRoom> {
    req
    // Do Additional Query
    return query
  }

  async fetch(req: RoomIndexRequest): Promise<IPaginateResponse<IAppRoom>> {
    const tableName = AppRoom.name
    const tableKey = Object.keys(new AppRoom())

    const query = this.additionalQuery(
      this.roomRepo.createQueryBuilder(tableName),
      req,
    )

    req.search &&
      query.where(this.querySearch(tableName, tableKey), {
        search: `%${req.search.toLowerCase()}%`,
      })

    query.orderBy(
      this.orderByKey(tableName, tableKey, req.sort),
      this.getOrder(req.order),
    )
    query.take(this.take(req.perPage))
    query.skip(this.countOffset(req))

    const [data, count] = await query.getManyAndCount()

    return {
      data,
      meta: this.mapMeta(count, req),
    }
  }
}
