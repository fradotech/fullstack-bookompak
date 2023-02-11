import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '@server/modules/iam/auth/auth.module'
import { RoomCrudApp } from './infrastructure/room-crud.app'
import { RoomIndexService } from './infrastructure/room-index.service'
import { AppRoom } from './infrastructure/room.entity'
import { RoomService } from './infrastructure/room.service'
import { RoomCrudController } from './v1/room-crud.controller'

@Module({
  imports: [TypeOrmModule.forFeature([AppRoom]), AuthModule, HttpModule],
  controllers: [RoomCrudController],
  providers: [RoomService, RoomCrudApp, RoomIndexService],
  exports: [RoomService],
})
export class RoomModule {}
