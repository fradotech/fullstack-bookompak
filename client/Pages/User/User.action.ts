import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { UserIndexRequest } from '@server/modules/iam/user/infrastructure/user.request'
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import { Route } from '../../Enums/Route'
import { axiosAction } from '../../services/axios.service'

export const userAction = {
  fetch: async (
    req?: UserIndexRequest,
  ): Promise<IPaginateResponse<UserResponse>> => {
    return await axiosAction.get(Route.Users, req)
  },

  findOne: async (id: string): Promise<IApiRes<UserResponse>> => {
    return await axiosAction.get(`${Route.Users}/${id}`)
  },
}
