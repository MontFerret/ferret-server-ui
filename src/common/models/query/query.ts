import isPlainObject from 'lodash/isPlainObject';
import qs from 'qs';
import { Sorting } from './sorting';

export interface Query {
    readonly cursor?: string;
    readonly sorting?: Sorting;
}

export function fromUrl(input: string | object): Query {
    const values = isPlainObject(input) ? input : qs.parse(input as string);

    return values as Query;
}
