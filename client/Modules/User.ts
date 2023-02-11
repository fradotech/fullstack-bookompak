import { IPaginateResponse } from '@server/src/infrastructure/index/index.interface';
import { UserIndexRequest } from '@server/src/modules/iam/user/infrastructure/user.request';
import { UserResponse } from '@server/src/modules/iam/user/infrastructure/user.response';
import { Route } from 'client/Enums/Route';
import { axiosAction } from './Axios';

export const userAction = {
  fetch: async (req?: UserIndexRequest): Promise<IPaginateResponse<UserResponse>> => {
    return await axiosAction.get(Route.User, req)
  },
};
