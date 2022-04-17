import { Inject, Injectable } from '@nestjs/common';
import { Producer } from 'kafkajs';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(@Inject('KAFKA_PRODUCER') private kafkaProducer: Producer) {}

  async sendKafkaEvent(key: string, value) {
    await this.kafkaProducer
      .send({
        topic: 'services',
        messages: [{ key, value: JSON.stringify(value) }],
      })
      .then((d) => console.log('=========', d));
  }

  async create(createServiceDto: CreateServiceDto) {
    const id = Math.floor(Math.random() * 100);
    await this.sendKafkaEvent(id + '', {
      eventType: 'ServiceCreated',
      id,
      ...createServiceDto,
    });

    return 'this action adds a new service';
  }

  findAll() {
    return `This action returns all services`;
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    updateServiceDto.id = id;
    this.sendKafkaEvent(id + '', {
      eventType: 'ServiceUpdated',
      ...updateServiceDto,
    });
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
