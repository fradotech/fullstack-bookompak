import { Module } from '@nestjs/common'
import { AgendaModule } from './agenda/room.module'
import { BookingModule } from './booking/booking.module'
import { RoomModule } from './room/room.module'

@Module({
  imports: [RoomModule, BookingModule, AgendaModule],
  controllers: [],
  providers: [],
})
export class FeatureModule {}
