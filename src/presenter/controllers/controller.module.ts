import { UsecaseProxyModule } from '@infrastructure/usecase-proxy/usecase-proxy.module';
import { Module } from '@nestjs/common';
import { PublisherController } from '@presenter/controllers/publisher/publisher.controller';

@Module({
  imports: [UsecaseProxyModule.register()],
  controllers: [PublisherController],
})
export class ControllerModule {}
