import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import {
  BookingApprovalRequest,
  BookingIndexRequest,
} from '@server/modules/feature/booking/infrastructure/booking.request'
import { BookingResponse } from '@server/modules/feature/booking/infrastructure/booking.response'
import { Route } from '../../Enums/Route'
import { axiosService } from '../../services/axios.service'

export const bookingApprovalAction = {
  fetch: async (
    req?: BookingIndexRequest,
  ): Promise<IPaginateResponse<BookingResponse>> => {
    return await axiosService.get(Route.BookingsApproval, req)
  },

  updateStatus: async (
    id: string,
    data: BookingApprovalRequest,
  ): Promise<IApiRes<BookingResponse>> => {
    return await axiosService.put(`${Route.BookingsApproval}/${id}`, data)
  },
}
