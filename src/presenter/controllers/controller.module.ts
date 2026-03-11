import { UsecaseProxyModule } from '@infrastructure/usecase-proxy/usecase-proxy.module';
import { Module } from '@nestjs/common';
import { AuthorController } from '@presenter/controllers/author/author.controller';
import { AuthorsController } from '@presenter/controllers/author/authors.controller';
import { PublisherController } from '@presenter/controllers/publisher/publisher.controller';
import { PublishersController } from '@presenter/controllers/publisher/publishers.controller';

@Module({
  imports: [UsecaseProxyModule.register()],
  controllers: [
    PublisherController,
    PublishersController,
    AuthorController,
    AuthorsController,
  ],
})
export class ControllerModule {}
