import { PaginationMeta, PaginationParams, PaginationQuery } from "../interfaces/pagination";

export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

export const validatePaginationParams = (params: Partial<PaginationParams>): PaginationParams => {
  const page = Math.max(1, Math.floor(params.page || 1));
  const page_size = Math.min(
    MAX_PAGE_SIZE,
    Math.max(1, Math.floor(params.page_size || DEFAULT_PAGE_SIZE))
  );
  
  return { page, page_size };
};

export const calculateOffset = (page: number, page_size: number): number => {
  return (page - 1) * page_size;
};

export const createPaginationMeta = <T>(
  data: T,
  params: PaginationQuery
): PaginationMeta<T> => {
  const { page, page_size, total_count } = params;
  const page_count = Math.ceil(total_count / page_size);
  const offset = calculateOffset(page, page_size);
  
  return {
    data,
    pagination: {
      page,
      page_size,
      total_count,
      page_count,
      has_previous: page > 1,
      has_next: page < page_count,
      offset
    }
  };
};
