import { Controller, Logger, ValidationPipe } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  CreateServiceDto,
  DeleteServiceDto,
  UpdateServiceDto,
  KafkaServiceDto,
} from 'n/common-dto';

@Controller('services')
export class ServicesController {
  constructor(private eventEmitter: EventEmitter2) {}

  @EventPattern('services')
  serviceEvent(@Payload(new ValidationPipe()) { value }: KafkaServiceDto) {
    Logger.debug(value, 'servicesController -service event');
    this.eventEmitter.emit(value.eventType, value);
  }

  @OnEvent('ServiceCreate')
  handleServiceCreatedEvent(createServiceDto: CreateServiceDto) {
    Logger.debug(
      createServiceDto,
      'ServicesController - handleServicesCreatedEvent',
    );
  }

  @OnEvent('ServiceUpdated')
  handleServiceUpdatedEvent(updateServiceDto: UpdateServiceDto) {
    Logger.debug(
      updateServiceDto,
      'ServicesController - handleServiceUpdatedEvent',
    );
  }

  @OnEvent('ServiceDeleted')
  handleServiceDeletedEvent(deleteServiceDto: DeleteServiceDto) {
    Logger.debug(
      deleteServiceDto,
      'ServicesController - handleServiceDeletedEvent',
    );
  }
}
