import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { AuthLoginRequest, AuthRegisterRequest } from '@server/modules/iam/auth/infrastructure/auth.request'
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import { Route } from '../../Enums/Route'
import { axiosService } from '../../services/axios.service'

export const authAction = {
  loggedUser: (): UserResponse =>
    JSON.parse(localStorage.getItem('user') || 'null'),

  login: async (req: AuthLoginRequest): Promise<UserResponse> => {
    const data = await axiosService.post(Route.Login, req, false)
    const user = data?.data
    !user && alert('Wrong email or password')
    localStorage.setItem('_accessToken', user._accessToken || '')
    localStorage.setItem('user', JSON.stringify(user))
    return user
  },

  register: async (req: AuthRegisterRequest): Promise<IApiRes<UserResponse>> => {
    const res = await axiosService.post(Route.Register, req)
    !res.data && alert(res.response.data.message)
    return res
  },

  logout: (): boolean => {
    localStorage.removeItem('_accessToken')
    localStorage.removeItem('user')
    return true
  },
}
