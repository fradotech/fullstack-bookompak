import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import {
  BookingCreateRequest,
  BookingIndexRequest,
} from '@server/modules/feature/booking/infrastructure/booking.request'
import { BookingResponse } from '@server/modules/feature/booking/infrastructure/booking.response'
import { Route } from '../../Enums/Route'
import { axiosAction } from '../../services/axios.service'

export const bookingAction = {
  fetch: async (
    req?: BookingIndexRequest,
  ): Promise<IPaginateResponse<BookingResponse>> => {
    return await axiosAction.get(Route.Bookings, req)
  },

  create: async (
    data: BookingCreateRequest,
  ): Promise<IApiRes<BookingResponse>> => {
    return await axiosAction.post(Route.Bookings, data)
  },

  findOne: async (id: string): Promise<IApiRes<BookingResponse>> => {
    return await axiosAction.get(`${Route.Bookings}/${id}`)
  },

  remove: async (id: string): Promise<IApiRes<BookingResponse>> => {
    return await axiosAction.delete(`${Route.Bookings}/${id}`)
  },
}
