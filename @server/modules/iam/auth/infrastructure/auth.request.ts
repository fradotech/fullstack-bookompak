import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { Match } from '../../../../infrastructure/swagger/decorators/match.decorator'
import { UserRequest } from '../../user/infrastructure/user.request'

export class AuthRegisterRequest extends PickType(UserRequest, [
  'email',
  'password',
  'passwordConfirmation',
]) {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Frado' })
  name: string

  @Match('password')
  passwordConfirmation!: string
}

export class AuthLoginRequest extends PickType(UserRequest, ['email']) {
  @IsNotEmpty()
  @ApiProperty({ example: 'Admin123' })
  password!: string
}

export class AuthEmailRequest extends PickType(UserRequest, ['email']) {}

export class AuthChangePasswordRequest extends PickType(UserRequest, [
  'password',
  'passwordConfirmation',
  'token',
]) {
  @Match('password')
  passwordConfirmation!: string
}
