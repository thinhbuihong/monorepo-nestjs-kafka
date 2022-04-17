import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesController } from './services/services.controller';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [AppController, ServicesController],
  providers: [AppService],
})
export class AppModule {}
