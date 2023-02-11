import { IAppUser } from '@server/modules/iam/user/infrastructure/user.interface'

export interface IBaseEntity {
  id: string
  createdAt?: Date
  createdBy?: IAppUser
  updatedAt?: Date
  updatedBy?: IAppUser
  deletedAt?: Date
  deletedBy?: IAppUser
}
