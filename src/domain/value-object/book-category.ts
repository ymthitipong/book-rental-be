import { BookCategoryEnum, getBookCategoryDescription } from "@domain/constant/book-category.constant";

export class BookCategory {
  private readonly _value: BookCategoryEnum;

  constructor(value: BookCategoryEnum) {
    this._value = value;
  }

  static create(category: BookCategoryEnum) {
    return new BookCategory(category);
  }

  get code(): string {   
    return this._value.toString();
  }

  get description(): string {
    return getBookCategoryDescription(this._value)
  }
}