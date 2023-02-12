import { InjectRepository } from '@nestjs/typeorm'
import { IAppUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { IPaginateResponse } from '../../../../infrastructure/index/index.interface'
import { BaseIndexService } from '../../../../infrastructure/index/index.service'
import { AppBooking } from './booking.entity'
import { IAppBooking } from './booking.interface'
import { BookingIndexRequest } from './booking.request'

export class BookingIndexService extends BaseIndexService {
  constructor(
    @InjectRepository(AppBooking)
    private readonly bookingRepo: Repository<IAppBooking>,
  ) {
    super()
  }

  additionalQuery(
    query: SelectQueryBuilder<IAppBooking>,
    req: BookingIndexRequest,
    tableName: string,
    user?: IAppUser
  ): SelectQueryBuilder<IAppBooking> {
    req

    query.leftJoinAndSelect(`${tableName}.user`, 'user')

    user &&
      query.andWhere(`user.id = :userId`, {
        userId: user.id,
      })

    req.filterStatus &&
      query.andWhere(`${tableName}.status = :status`, {
        status: req.filterStatus,
      })

    return query
  }

  async fetch(
    req: BookingIndexRequest,
    user?: IAppUser
  ): Promise<IPaginateResponse<IAppBooking>> {
    const tableName = AppBooking.name
    const tableKey = Object.keys(new AppBooking())

    const query = this.additionalQuery(
      this.bookingRepo.createQueryBuilder(tableName),
      req,
      tableName,
      user
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
