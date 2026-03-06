import { UsecaseProxyModule } from '@infrastructure/usecase-proxy/usecase-proxy.module';
import { Module } from '@nestjs/common';
import { AuthorController } from '@presenter/controllers/author/author.controller';
import { PublisherController } from '@presenter/controllers/publisher/publisher.controller';

@Module({
  imports: [UsecaseProxyModule.register()],
  controllers: [
    PublisherController,
    AuthorController,
  ],
})
export class ControllerModule {}
