import { InjectRepository } from '@nestjs/typeorm'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { IPaginateResponse } from '../../../../infrastructure/index/index.interface'
import { BaseIndexService } from '../../../../infrastructure/index/index.service'
import { AppAgenda } from './agenda.entity'
import { IAppAgenda } from './agenda.interface'
import { AgendaIndexRequest } from './agenda.request'

export class AgendaIndexService extends BaseIndexService {
  constructor(
    @InjectRepository(AppAgenda)
    private readonly roomRepo: Repository<IAppAgenda>,
  ) {
    super()
  }

  additionalQuery(
    query: SelectQueryBuilder<IAppAgenda>,
    req: AgendaIndexRequest,
  ): SelectQueryBuilder<IAppAgenda> {
    req
    // Do Additional Query
    return query
  }

  async fetch(req: AgendaIndexRequest): Promise<IPaginateResponse<IAppAgenda>> {
    const tableName = AppAgenda.name
    const tableKey = Object.keys(new AppAgenda())

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
