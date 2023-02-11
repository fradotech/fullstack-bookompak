import { AuthLoginRequest } from "@server/src/modules/iam/auth/infrastructure/auth.request";
import { UserResponse } from "@server/src/modules/iam/user/infrastructure/user.response";
import { Route } from "../Enums/Route";
import { axiosAction } from "./Axios";

export const authAction = {
  loggedUser: (): UserResponse => JSON.parse(localStorage.getItem('user') || 'null'),

  login: async (req: AuthLoginRequest): Promise<UserResponse> => {
    const data = await axiosAction.post(Route.Login, req, false)
    const user = data?.data
    !user && alert('Wrong email or password')
    localStorage.setItem('_accessToken', user._accessToken || '')
    localStorage.setItem('user', JSON.stringify(user))
    return user
  },

  logout: (): boolean => {
    localStorage.removeItem('_accessToken');
    localStorage.removeItem('user');
    return true
  },
};