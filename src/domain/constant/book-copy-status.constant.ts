export enum BookCopyStatusEnum {
  AVAILABLE = 'A',
  BORROWED = 'B',
  UNAVAILABLE = 'U',
}

export const bookCopyStatusDesciption: Record<BookCopyStatusEnum, string> = {
  [BookCopyStatusEnum.AVAILABLE]: 'Available',
  [BookCopyStatusEnum.BORROWED]: 'Borrowed',
  [BookCopyStatusEnum.UNAVAILABLE]: 'Unavailable',
};
