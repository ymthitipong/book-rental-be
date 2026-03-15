type ListOrderType = 'title_asc' | 'title_desc' | 'name_asc' | 'name_desc';

export interface IListResponse<T> {
  object: 'list';
  total: number;
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
    total: data.length,
    data,
  };
}