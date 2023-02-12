import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '@server/modules/iam/auth/auth.module'
import { BookingCrudApp } from './infrastructure/booking-crud.app'
import { BookingIndexService } from './infrastructure/booking-index.service'
import { AppBooking } from './infrastructure/booking.entity'
import { BookingService } from './infrastructure/booking.service'
import { BookingCrudController } from './v1/booking-crud.controller'

@Module({
  imports: [TypeOrmModule.forFeature([AppBooking]), AuthModule, HttpModule],
  controllers: [BookingCrudController],
  providers: [BookingService, BookingCrudApp, BookingIndexService],
  exports: [BookingService],
})
export class BookingModule {}
