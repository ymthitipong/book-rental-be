import { bookCopyStatusDesciption, BookCopyStatusEnum } from "@domain/constant/book-copy-status.constant";

export class BookCopyStatus {
  private constructor(private readonly _value: BookCopyStatusEnum) {}

  static createAvailable() {
    return new BookCopyStatus(BookCopyStatusEnum.AVAILABLE);
  }

  static createBorrowed() {
    return new BookCopyStatus(BookCopyStatusEnum.BORROWED);
  }

  static createUnavailable() {
    return new BookCopyStatus(BookCopyStatusEnum.UNAVAILABLE);
  }

  get value(): BookCopyStatusEnum {
    return this._value;
  }

  get description(): string {
    return bookCopyStatusDesciption[this._value];
  }

  static borrow(current: BookCopyStatus) {
    if (current.value !== BookCopyStatusEnum.AVAILABLE) {
      throw new Error('Book copy is not available');
    }

    return this.createBorrowed();
  }

  static return(current: BookCopyStatus): BookCopyStatus {
    if (current.value !== BookCopyStatusEnum.BORROWED) {
      throw new Error('Book copy is not borrowed');
    }

    return this.createAvailable();
  }

  static repair(current: BookCopyStatus) {
    if (current.value !== BookCopyStatusEnum.AVAILABLE) {
      throw new Error('Book copy is not available');
    }

    return this.createUnavailable();
  }

  static restore(current: BookCopyStatus) {
    if (current.value !== BookCopyStatusEnum.UNAVAILABLE) {
      throw new Error('Book copy is not unavailable');
    }

    return this.createAvailable();
  }
};
