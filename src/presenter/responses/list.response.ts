export interface IListResponse<T> {
  object: 'list';
  data: T[];
}

export const toListResponse = <T>(data: T[]): IListResponse<T> => {
  return {
    object: 'list',
    data,
  };
}