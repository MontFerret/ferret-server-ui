import { Pagination } from '../../models/query/pagination';

export interface SearchResult<T> {
    readonly paging: Pagination;
    readonly data: T[];
}

export interface QueryResultDataList<T> {
    readonly output: SearchResult<T>;
}

export interface QueryResultData<T> {
    readonly output: T;
}
