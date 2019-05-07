import { Entity } from '../../../models/api/model/entity';
import { Pagination } from '../../models/query/pagination';

export interface SearchResult<T> {
    readonly paging: Pagination;
    readonly data: T[];
}

export interface QueryResultDataList<T extends Entity> {
    readonly output: SearchResult<T>;
}

export interface QueryResultData<T extends Entity> {
    readonly output: T;
}
