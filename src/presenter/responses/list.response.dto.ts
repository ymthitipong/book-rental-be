type ListOrderType = 'title_asc' | 'title_desc' | 'name_asc' | 'name_desc';

export interface IListResponse<T> {
  object: 'list';
  limit: number;
  order: ListOrderType;
  data: T[];
}

export const toListResponse = <T>(data: T[], defaultOptions: {
  limit: number;
  order: ListOrderType;
}): IListResponse<T> => {
  return {
    object: 'list',
    limit: defaultOptions.limit,
    order: defaultOptions.order,
    data,
  };
}