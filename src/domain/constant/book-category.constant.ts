export enum BookCategoryEnum {
  COMPUTER_SCIENCE = '000',
  PHILOSOPHY = '100',
  RELIGION = '200',
  SOCIAL_SCIENCES = '300',
  LANGUAGE = '400',
  SCIENCE = '500',
  TECHNOLOGY = '600',
  ARTS = '700',
  LITERATURE = '800',
  HISTORY = '900',
  OTHER = '999',
}

/* 
Main Category
000 – Computer science, information and general works
100 – Philosophy and psychology
200 – Religion
300 – Social sciences
400 – Language
500 – Pure science
600 – Technology
700 – Arts and recreation
800 – Literature
900 – History and geography 
*/

const categoryDescription: Record<BookCategoryEnum, string> = {
    [BookCategoryEnum.COMPUTER_SCIENCE]: 'Computer Science, Information & General Works',
    [BookCategoryEnum.PHILOSOPHY]: 'Philosophy & Psychology',
    [BookCategoryEnum.RELIGION]: 'Religion',
    [BookCategoryEnum.SOCIAL_SCIENCES]: 'Social Sciences',
    [BookCategoryEnum.LANGUAGE]: 'Language',
    [BookCategoryEnum.SCIENCE]: 'Pure Science',
    [BookCategoryEnum.TECHNOLOGY]: 'Technology',
    [BookCategoryEnum.ARTS]: 'Arts & Recreation',
    [BookCategoryEnum.LITERATURE]: 'Literature',
    [BookCategoryEnum.HISTORY]: 'History & Geography',
    [BookCategoryEnum.OTHER]: 'Other'
  };

export const getBookCategoryDescription = 
  (category: BookCategoryEnum): string =>
    categoryDescription[category] || 'Unknown'