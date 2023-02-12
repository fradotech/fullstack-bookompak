import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import {
  AgendaCreateRequest,
  AgendaIndexRequest
} from '@server/modules/feature/agenda/infrastructure/agenda.request'
import { AgendaResponse } from '@server/modules/feature/agenda/infrastructure/agenda.response'
import { Route } from '../../Enums/Route'
import { axiosService } from '../../services/axios.service'

export const agendaAction = {
  fetch: async (
    req?: AgendaIndexRequest,
  ): Promise<IPaginateResponse<AgendaResponse>> => {
    return await axiosService.get(Route.Agendas, req)
  },

  create: async (data: AgendaCreateRequest): Promise<IApiRes<AgendaResponse>> => {
    return await axiosService.post(Route.Agendas, data)
  },

  findOne: async (id: string): Promise<IApiRes<AgendaResponse>> => {
    return await axiosService.get(`${Route.Agendas}/${id}`)
  },

  remove: async (id: string): Promise<IApiRes<AgendaResponse>> => {
    return await axiosService.delete(`${Route.Agendas}/${id}`)
  },
}
