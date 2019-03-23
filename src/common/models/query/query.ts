import { Pagination } from 'common/models/query/pagination';
import { Sorting } from 'common/models/query/sorting';

export interface Query {
    readonly pagination: Pagination;
    readonly sorting?: Sorting;
}
