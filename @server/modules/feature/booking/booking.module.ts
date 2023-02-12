import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '@server/modules/iam/auth/auth.module'
import { BookingApprovalApp } from './infrastructure/booking-approval.app'
import { BookingCrudApp } from './infrastructure/booking-crud.app'
import { BookingIndexService } from './infrastructure/booking-index.service'
import { AppBooking } from './infrastructure/booking.entity'
import { BookingService } from './infrastructure/booking.service'
import { BookingApprovalController } from './v1/booking-approval.controller'
import { BookingCrudController } from './v1/booking-crud.controller'

@Module({
  imports: [TypeOrmModule.forFeature([AppBooking]), AuthModule, HttpModule],
  controllers: [BookingApprovalController, BookingCrudController],
  providers: [
    BookingService,
    BookingCrudApp,
    BookingIndexService,
    BookingApprovalApp,
  ],
  exports: [BookingService],
})
export class BookingModule {}
