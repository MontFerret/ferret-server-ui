import { DataProxy } from 'apollo-cache';
import { DocumentNode } from 'apollo-link';
import { FetchResult } from 'react-apollo';
import { MutationResultData } from './result';

export function updateFormCache(
    key: string,
    query: DocumentNode,
    cache: DataProxy,
    mutationResult: FetchResult<MutationResultData>,
): void {
    const q = cache.readQuery<any>({ query });
    const current = q[key] as object;
    const entity = mutationResult.data;
    const next = { ...current, entity };

    cache.writeQuery<any>({
        query,
        data: {
            [key]: next,
        },
    });
}

export function createFormCacheUpdator(key: string, query: DocumentNode): any {
    return (
        cache: DataProxy,
        mutationResult: FetchResult<MutationResultData>,
    ) => {
        return updateFormCache(key, query, cache, mutationResult);
    };
}
