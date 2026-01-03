import { PaginationMeta, PaginationParams, PaginationQuery } from "../interfaces/pagination";
export declare const DEFAULT_PAGE_SIZE = 10;
export declare const MAX_PAGE_SIZE = 100;
export declare const validatePaginationParams: (params: Partial<PaginationParams>) => PaginationParams;
export declare const calculateOffset: (page: number, page_size: number) => number;
export declare const createPaginationMeta: <T>(data: T, params: PaginationQuery) => PaginationMeta<T>;
