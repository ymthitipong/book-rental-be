import { Author } from '@domain/entities/author.entity';

export interface IAuthorResponse {
  object: 'author';
  code: string;
  name: string;
  yearOfBirth: number;
}

export const toAuthorResponse = (author: Author): IAuthorResponse => {
  return {
    object: 'author',
    code: author.code.value,
    name: author.name.value,
    yearOfBirth: author.yearOfBirth,
  };
}