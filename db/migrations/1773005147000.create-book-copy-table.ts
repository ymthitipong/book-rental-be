import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBookCopyTable implements MigrationInterface {
  name: string = 'createBookCopyTable1773005147000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'book_copy',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'no',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'char',
            length: '1',
            isNullable: false,
          },
          {
            name: 'book_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deleted_at',
            type: 'timestamptz',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['book_id'],
            referencedTableName: 'book',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
        uniques: [
          {
            name: 'UQ_book_copy_book_id_and_no',
            columnNames: ['book_id', 'no'],
          },
        ],
        indices: [
          {
            name: 'IDX_book_copy_book_id',
            columnNames: ['book_id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('book_copy');
  }
}
