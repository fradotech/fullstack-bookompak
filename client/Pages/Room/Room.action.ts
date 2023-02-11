import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import {
  RoomIndexRequest,
  RoomRequest,
} from '@server/modules/feature/room/infrastructure/room.request'
import { RoomResponse } from '@server/modules/feature/room/infrastructure/room.response'
import { Route } from '../../Enums/Route'
import { axiosAction } from '../../services/axios.service'

export const roomAction = {
  fetch: async (
    req?: RoomIndexRequest,
  ): Promise<IPaginateResponse<RoomResponse>> => {
    return await axiosAction.get(Route.Rooms, req)
  },

  create: async (data: RoomRequest): Promise<IApiRes<RoomResponse>> => {
    return await axiosAction.post(Route.Rooms, data)
  },

  findOne: async (id: string): Promise<IApiRes<RoomResponse>> => {
    return await axiosAction.get(`${Route.Rooms}/${id}`)
  },

  remove: async (id: string): Promise<IApiRes<RoomResponse>> => {
    return await axiosAction.delete(`${Route.Rooms}/${id}`)
  },
}
