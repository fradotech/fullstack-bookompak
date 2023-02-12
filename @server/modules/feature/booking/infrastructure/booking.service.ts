import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from '@server/infrastructure/base/base.service'
import { Repository } from 'typeorm'
import { AppBooking } from './booking.entity'
import { IAppBooking } from './booking.interface'

@Injectable()
export class BookingService implements BaseService {
  constructor(
    @InjectRepository(AppBooking)
    private readonly bookingRepo: Repository<IAppBooking>,
  ) {}

  async create(req: IAppBooking): Promise<IAppBooking> {
    const data = this.bookingRepo.create(req)
    return await this.bookingRepo.save(data)
  }

  async find(): Promise<IAppBooking[]> {
    return await this.bookingRepo.find()
  }

  async findOne(id: string): Promise<IAppBooking> {
    return await this.bookingRepo.findOne({
      where: { id },
      relations: ['user', 'room']
    })
  }

  async findOneOrFail(id: string): Promise<IAppBooking> {
    return await this.bookingRepo.findOneOrFail({
      where: { id },
      relations: ['user', 'room']
    })
  }

  async update(req: IAppBooking): Promise<IAppBooking> {
    const data = this.bookingRepo.create(req)
    await this.bookingRepo.update(data.id, data)
    return await this.findOneOrFail(req.id)
  }

  async remove(id: string): Promise<IAppBooking> {
    const data = (await this.findOneOrFail(id)) as AppBooking
    return await this.bookingRepo.remove(data)
  }

  async softRemove(id: string): Promise<IAppBooking> {
    const data = (await this.findOneOrFail(id)) as AppBooking
    return await this.bookingRepo.softRemove(data)
  }

  // Another findOneBy() Methods
}
