export interface PaginationParams {
    page: number;
    page_size: number;
}
export interface PaginationQuery extends PaginationParams {
    total_count: number;
}
export interface PaginationMeta<T> {
    data: T;
    pagination: {
        page: number;
        page_size: number;
        total_count: number;
        page_count: number;
        has_previous: boolean;
        has_next: boolean;
        offset: number;
    };
}
