import type { ICounterRepository } from "@domain/repositories/counter.repository.interface";
import { CounterTypeormEntity } from "@infrastructure/config/typeorm/entities/counter.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CounterRepository implements ICounterRepository {
  private readonly publisherCounterName = "publisher";
  private readonly authorCounterName = "author";

  constructor(
    @InjectRepository(CounterTypeormEntity)
    private readonly counterTypeormRepository: Repository<CounterTypeormEntity>,
  ) {}

  async getPublisherCounterNumber(): Promise<number | null> {
    const counterPersistenceData = await this.counterTypeormRepository.findOne({
      where: { name: this.publisherCounterName },
    });

    return counterPersistenceData?.counterNumber ?? null;
  }

  async updatePublisherCounterNumber(counterNumber: number): Promise<void> {
    await this.counterTypeormRepository.update(
      { name: this.publisherCounterName },
      { counterNumber },
    );
  }

  async getAuthorCounterNumber(): Promise<number | null> {
    const counterPersistenceData = await this.counterTypeormRepository.findOne({
      where: { name: this.authorCounterName },
    });

    return counterPersistenceData?.counterNumber ?? null;
  }

  async updateAuthorCounterNumber(counterNumber: number): Promise<void> {
    await this.counterTypeormRepository.update(
      { name: this.authorCounterName },
      { counterNumber },
    );
  }
}
