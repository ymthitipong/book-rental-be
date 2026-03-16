import { AuthorSummary } from '@application/summary/author.summary';

export interface IAuthorResponse {
  object: 'author';
  code: string;
  name: string;
  year_of_birth: number;
}

export const toAuthorResponse = (author: AuthorSummary): IAuthorResponse => {
  return {
    object: 'author',
    code: author.code,
    name: author.name,
    year_of_birth: author.yearOfBirth,
  };
}