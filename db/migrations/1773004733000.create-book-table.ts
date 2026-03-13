import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAuthorsTable implements MigrationInterface {
  name: string = 'createBookTable1773004733000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'book',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'code',
            type: 'char',
            length: '8',
            isNullable: false,
          },
          {
            name: 'category',
            type: 'char',
            length: '3',
            isNullable: false,
          },
          {
            name: 'publication_date',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'publisher_id',
            type: 'integer',
            isNullable: true,
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
            columnNames: ['publisher_id'],
            referencedTableName: 'publisher',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
        indices: [
          {
            name: 'IDX_book_code',
            columnNames: ['code'],
            isUnique: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('book');
  }
}
