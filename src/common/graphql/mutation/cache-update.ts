import { DataProxy } from 'apollo-cache';
import { DocumentNode } from 'apollo-link';
import { FetchResult, MutationUpdaterFn } from 'react-apollo';
import { MutationResultData } from './result';

export function updateFormCache(
    key: string,
    query: DocumentNode,
    variables: any,
    values: any,
    cache: DataProxy,
    mutationResult: FetchResult<MutationResultData>,
): void {
    // not new item
    if (values.id != null) {
        const q = cache.readQuery<any>({ query, variables });
        const current = q[key] as object;
        const metadata = mutationResult.data ? mutationResult.data.output : {};
        const next = { ...current, ...metadata, ...values };

        cache.writeQuery<any>({
            query,
            data: {
                [key]: next,
            },
        });
    }
}

export function createFormCacheUpdator(
    key: string,
    query: DocumentNode,
    variables: any,
    values?: any,
): MutationUpdaterFn<any> {
    return (
        cache: DataProxy,
        mutationResult: FetchResult<MutationResultData>,
    ) => {
        return updateFormCache(
            key,
            query,
            variables,
            values,
            cache,
            mutationResult,
        );
    };
}
