import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreatePublishersTable implements MigrationInterface {
  name: string = 'createPublishersTable1771849326000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'publisher',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'text',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'code',
            type: 'text',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'deleted_at',
            type: 'timestamptz',
            isNullable: true,
          },
        ],
      }),
    );

    // Create index on code for faster lookups
    await queryRunner.createIndex(
      'publisher',
      new TableIndex({
        name: 'IDX_publishers_code',
        columnNames: ['code'],
      }),
    );

    await queryRunner.createIndex(
      'publisher',
      new TableIndex({
        name: 'IDX_publishers_name',
        columnNames: ['name'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('publisher');
  }
}
