import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("counter")
export abstract class CounterTypeormEntity {
  @PrimaryGeneratedColumn({
    type: "integer",
  })
  id!: number;

  @Column("text")
  name!: string;

  @Column("integer", {
    name: "counter_number",
  })
  counterNumber!: number;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt!: Date;
}
