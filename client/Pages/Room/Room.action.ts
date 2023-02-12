import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import {
  RoomCreateRequest, RoomIndexRequest
} from '@server/modules/feature/room/infrastructure/room.request'
import { RoomResponse } from '@server/modules/feature/room/infrastructure/room.response'
import { Route } from '../../Enums/Route'
import { axiosService } from '../../services/axios.service'

export const roomAction = {
  fetch: async (
    req?: RoomIndexRequest,
  ): Promise<IPaginateResponse<RoomResponse>> => {
    return await axiosService.get(Route.Rooms, req)
  },

  create: async (data: RoomCreateRequest): Promise<IApiRes<RoomResponse>> => {
    return await axiosService.post(Route.Rooms, data)
  },

  findOne: async (id: string): Promise<IApiRes<RoomResponse>> => {
    return await axiosService.get(`${Route.Rooms}/${id}`)
  },

  remove: async (id: string): Promise<IApiRes<RoomResponse>> => {
    return await axiosService.delete(`${Route.Rooms}/${id}`)
  },
}
