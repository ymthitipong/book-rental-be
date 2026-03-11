export interface IListResponse<T> {
  object: 'list';
  total: number;
  data: T[];
}

export const toListResponse = <T>(data: any[]): IListResponse<T> => {
  return {
    object: 'list',
    total: data.length,
    data,
  };
}