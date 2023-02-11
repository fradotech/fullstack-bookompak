import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppUser } from '../user/infrastructure/user.entity'
import { UserService } from '../user/infrastructure/user.service'
import { JwtModuleOption } from './common/jwt-module.config'
import { JwtStrategy } from './common/jwt.strategy'
import { AuthApp } from './infrastructure/auth.app'
import { AuthService } from './infrastructure/auth.service'
import { AuthPasswordController } from './v1/auth-password.controller'
import { AuthController } from './v1/auth.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([AppUser]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(JwtModuleOption),
  ],
  controllers: [AuthPasswordController, AuthController],
  providers: [UserService, AuthApp, JwtStrategy, AuthService],
  exports: [],
})
export class AuthModule {}
