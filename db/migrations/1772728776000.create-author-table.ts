import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAuthorsTable implements MigrationInterface {
  name: string = 'createAuthorTable1772728776000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'author',
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
          },
          {
            name: 'code',
            type: 'char',
            length: '8',
            isNullable: false,
          },
          {
            name: 'year_of_birth',
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
        uniques: [
          {
            name: 'UQ_author_name_and_year_of_birth',
            columnNames: ['name', 'year_of_birth'],
          },
        ],
        indices: [
          {
            name: 'IDX_authors_name',
            columnNames: ['name'],
          },
          {
            name: 'IDX_authors_code',
            columnNames: ['code'],
            isUnique: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('author');
  }
}
