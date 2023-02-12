import { Module } from '@nestjs/common'
import { BookingModule } from './booking/booking.module'
import { RoomModule } from './room/room.module'

@Module({
  imports: [RoomModule, BookingModule],
  controllers: [],
  providers: [],
})
export class FeatureModule {}
