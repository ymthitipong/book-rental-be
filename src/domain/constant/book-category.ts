export enum BookCategory {
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

const categoryNames: Record<BookCategory, string> = {
    [BookCategory.COMPUTER_SCIENCE]: 'Computer Science, Information & General Works',
    [BookCategory.PHILOSOPHY]: 'Philosophy & Psychology',
    [BookCategory.RELIGION]: 'Religion',
    [BookCategory.SOCIAL_SCIENCES]: 'Social Sciences',
    [BookCategory.LANGUAGE]: 'Language',
    [BookCategory.SCIENCE]: 'Pure Science',
    [BookCategory.TECHNOLOGY]: 'Technology',
    [BookCategory.ARTS]: 'Arts & Recreation',
    [BookCategory.LITERATURE]: 'Literature',
    [BookCategory.HISTORY]: 'History & Geography',
    [BookCategory.OTHER]: 'Other'
  };

export const getBookCategoryName = (category: BookCategory): string => categoryNames[category] || 'Unknown'
