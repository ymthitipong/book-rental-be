import { UsecaseProxyModule } from "@infrastructure/usecase-proxy/usecase-proxy.module";
import { Module } from "@nestjs/common";
import { AuthorController } from "@presenter/controllers/author/author.controller";
import { AuthorsController } from "@presenter/controllers/author/authors.controller";
import { BookController } from "@presenter/controllers/book/book.controller";
import { BooksController } from "@presenter/controllers/book/books.controller";
import { PublisherController } from "@presenter/controllers/publisher/publisher.controller";
import { PublishersController } from "@presenter/controllers/publisher/publishers.controller";

@Module({
  controllers: [
    AuthorController,
    AuthorsController,
    BookController,
    BooksController,
    PublisherController,
    PublishersController,
  ],
  imports: [UsecaseProxyModule.register()],
})
export class ControllerModule {}
