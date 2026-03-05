import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import type { ICounterRepository } from "../../../domain/repositories/counter.repository";
import { CounterTypeormEntity } from "../../config/typeorm/entities/counter.entity";

@Injectable()
export class CounterRepository implements ICounterRepository {
  private readonly publisherCounterName = "publisher";

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
}
