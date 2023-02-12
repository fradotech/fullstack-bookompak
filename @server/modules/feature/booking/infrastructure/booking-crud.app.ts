import { Injectable } from '@nestjs/common'
import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { ERole } from '@server/modules/iam/role/infrastructure/role.enum'
import { IAppUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { BookingIndexService } from './booking-index.service'
import { AppBooking } from './booking.entity'
import { IAppBooking } from './booking.interface'
import {
  BookingCreateRequest,
  BookingIndexRequest,
  BookingUpdateRequest
} from './booking.request'
import { BookingService } from './booking.service'

@Injectable()
export class BookingCrudApp {
  constructor(
    private readonly bookingIndexApp: BookingIndexService,
    private readonly bookingService: BookingService,
  ) {}

  async fetch(
    req: BookingIndexRequest,
    user?: IAppUser,
  ): Promise<IPaginateResponse<IAppBooking>> {
    req.perPage = 10000
    const res = await this.bookingIndexApp.fetch(
      req,
      user.role == ERole.User ? user : null,
    )
    return res
  }

  async create(
    req: BookingCreateRequest,
    user: IAppUser,
  ): Promise<IAppBooking> {
    const data = new AppBooking()
    Object.assign(data, req)
    data.user = user

    return await this.bookingService.create(data)
  }

  async find(): Promise<IAppBooking[]> {
    return await this.bookingService.find()
  }

  async findOneOrFail(id: string): Promise<IAppBooking> {
    return await this.bookingService.findOneOrFail(id)
  }

  async update(id: string, req: BookingUpdateRequest): Promise<IAppBooking> {
    const data = await this.bookingService.findOneOrFail(id)
    Object.assign(data, req)
    return await this.bookingService.update(data)
  }

  async remove(id: string): Promise<IAppBooking> {
    const data = this.bookingService.findOneOrFail(id)
    await this.bookingService.remove(id)
    return data
  }

  async softRemove(id: string): Promise<IAppBooking> {
    const data = this.bookingService.findOneOrFail(id)
    await this.bookingService.softRemove(id)
    return data
  }
}
