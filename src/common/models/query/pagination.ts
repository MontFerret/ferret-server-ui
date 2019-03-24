import get from 'lodash/get';
import qs from 'qs';

const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 10;

export interface Pagination {
    readonly size: number;
    readonly page: number;
}

export function fromUrl(query: string): Pagination {
    return fromQuery(qs.parse(query));
}

export function fromQuery(query: any = {}): Pagination {
    return {
        page: parseFloat(get(query, 'page', DEFAULT_PAGE)),
        size: parseFloat(get(query, 'size', DEFAULT_SIZE)),
    };
}
