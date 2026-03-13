export enum BookCopyStatus {
  AVAILABLE = 'A',
  BORROWED = 'B',
  UNAVAILABLE = 'U',
}

export const getBookCopyStatusName = (status: BookCopyStatus): string => {
  const statusNames = {
    [BookCopyStatus.AVAILABLE]: 'Available',
    [BookCopyStatus.BORROWED]: 'Borrowed',
    [BookCopyStatus.UNAVAILABLE]: 'Unavailable',
  };
  
  return statusNames[status] || 'Unknown';
};
