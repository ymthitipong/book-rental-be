import { Author } from "@domain/entities/author.entity";

export interface AuthorSummary {
  code: string;
  name: string;
  yearOfBirth: number;
}

export const AuthorSummaryMapper = {
  toSummary: (author: Author): AuthorSummary => {
    return {
      code: author.code.value,
      name: author.name.value,
      yearOfBirth: author.yearOfBirth,
    };
  },
  toListSummary: (authors: Author[]): AuthorSummary[] => {
    return authors.map((author) => AuthorSummaryMapper.toSummary(author));
  },
};


