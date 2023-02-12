import { Injectable } from '@nestjs/common'
import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { EBookingStatus } from '../common/booking.enum'
import { BookingIndexService } from './booking-index.service'
import { IAppBooking } from './booking.interface'
import { BookingApprovalRequest, BookingIndexRequest } from './booking.request'
import { BookingService } from './booking.service'

@Injectable()
export class BookingCrudApp {
  constructor(
    private readonly bookingIndexApp: BookingIndexService,
    private readonly bookingService: BookingService,
  ) {}

  async fetch(
    req: BookingIndexRequest,
  ): Promise<IPaginateResponse<IAppBooking>> {
    req.perPage = 10000
    req.filterStatus = EBookingStatus.Pending

    return await this.bookingIndexApp.fetch(req)
  }

  async update(id: string, req: BookingApprovalRequest): Promise<IAppBooking> {
    const data = await this.bookingService.findOneOrFail(id)
    data.status = req.status
    return await this.bookingService.update(data)
  }
}
