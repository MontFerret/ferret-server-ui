import { Pagination } from './pagination';
import { Sorting } from './sorting';

export interface Query {
    readonly pagination: Pagination;
    readonly sorting?: Sorting;
}
