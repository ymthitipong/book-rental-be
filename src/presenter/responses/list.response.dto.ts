/* eslint-disable perfectionist/sort-interfaces */
/* eslint-disable sort-keys */
type ListOrderType = "title_asc" | "title_desc" | "name_asc" | "name_desc";

export interface IListResponse<T> {
  object: "list";
  data: T[];
  limit: number;
  order: ListOrderType;
}

export const toListResponse = <T>(
  data: T[],
  defaultOptions: {
    limit: number;
    order: ListOrderType;
  },
): IListResponse<T> => {
  return {
    object: "list",
    limit: defaultOptions.limit,
    order: defaultOptions.order,
    data,
  };
};
