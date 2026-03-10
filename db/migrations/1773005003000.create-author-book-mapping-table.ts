import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAuthorBookMappingTable implements MigrationInterface {
  name: string = 'createAuthorBookMappingTable1773005003000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'author_book_mapping',
        columns: [
          {
            name: 'book_id',
            type: 'integer',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'author_id',
            type: 'integer',
            isNullable: false,
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['book_id'],
            referencedTableName: 'book',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['author_id'],
            referencedTableName: 'author',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
        indices: [
          {
            name: 'IDX_author_book_mapping_author',
            columnNames: ['author_id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('author_book_mapping');
  }
}
