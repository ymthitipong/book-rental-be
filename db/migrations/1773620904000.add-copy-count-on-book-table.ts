import {
  MigrationInterface, QueryRunner, TableColumn
} from 'typeorm';

export class AddCopyCountOnBookTable implements MigrationInterface {
  name: string = 'addCopyCountOnBookTable1773620904000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('book', [
      new TableColumn({
        default: 0,
        isNullable: false,
        name: 'total_copy_count',
        type: 'integer',
      }),
      new TableColumn({
        default: 0,
        isNullable: false,
        name: 'available_copy_count',
        type: 'integer',
      }),
      new TableColumn({
        default: null,
        isNullable: true,
        name: 'last_copy_no',
        type: 'integer',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('book', 'total_copy_count');
    await queryRunner.dropColumn('book', 'available_copy_count');
    await queryRunner.dropColumn('book', 'last_copy_no');
  }
}
