import { Pagination as ApiPagination } from '../../../models/api/model/pagination';
import { PaginationCursors as ApiPaginationCursors } from '../../../models/api/model/paginationCursors';

export interface Pagination extends ApiPagination {}

export interface PaginationCursors extends ApiPaginationCursors {}
