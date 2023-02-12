import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '@server/modules/iam/auth/auth.module'
import { AgendaCrudApp } from './infrastructure/agenda-crud.app'
import { AgendaIndexService } from './infrastructure/agenda-index.service'
import { AppAgenda } from './infrastructure/agenda.entity'
import { AgendaService } from './infrastructure/agenda.service'
import { AgendaCrudController } from './v1/agenda-crud.controller'

@Module({
  imports: [TypeOrmModule.forFeature([AppAgenda]), AuthModule, HttpModule],
  controllers: [AgendaCrudController],
  providers: [AgendaService, AgendaCrudApp, AgendaIndexService],
  exports: [AgendaService],
})
export class AgendaModule {}
