import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CLIENT_KAFKA',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'api.services',
            brokers: ['localhost:9092'],
          },
          // consumer: {
          //   groupId: 'api.services',
          // },
          producer: {
            allowAutoTopicCreation: true,
            // createPartitioner: () => (args) => 3,
          },
        },
      },
    ]),
  ],
  controllers: [ServicesController],
  providers: [
    ServicesService,
    {
      provide: 'KAFKA_PRODUCER',
      useFactory: async (kafkaClient: ClientKafka) => {
        return kafkaClient.connect();
      },
      inject: ['CLIENT_KAFKA'],
    },
  ],
})
export class ServicesModule {}
