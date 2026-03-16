import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCopyCountOnBookTable implements MigrationInterface {
  name: string = 'addCopyCountOnBookTable1773620904000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('book', [
      new TableColumn({
        name: 'total_copy_count',
        type: 'integer',
        default: 0,
        isNullable: false,
      }),
      new TableColumn({
        name: 'available_copy_count',
        type: 'integer',
        default: 0,
        isNullable: false,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('book', 'total_copy_count');
    await queryRunner.dropColumn('book', 'available_copy_count');
  }
}
