import { notification } from 'antd';
import { ApolloError } from 'apollo-client';
import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { QueryResultDataList } from '../.../../../../../../common/graphql/query/result';
import { Query as UrlQuery } from '../../../../../common/models/query/query';
import { ExecutionOutput } from '../../../../../models/api/model/executionOutput';
import { findQuery } from '../../../../../queries/exec';
import { Page, PageProps } from '../../../../common/page';
import Table from './table';

export type Params = never;
export interface Props extends PageProps<Params> {
    projectId: string;
}

export default class ExecutionQueuePage extends Page<Params, Props> {
    private __isPolling: boolean;

    constructor(props: Props) {
        super(props);

        this.__isPolling = false;
        this.__loadMoreScripts = this.__loadMoreScripts.bind(this);
        this.__renderList = this.__renderList.bind(this);
        this.__handleError = this.__handleError.bind(this);
    }

    public render(): any {
        const { projectId } = this.props;
        const variables = {
            projectId,
            query: this.getQuery(),
        };

        return (
            <Query
                query={findQuery}
                variables={variables}
                fetchPolicy={'network-only'}
                onError={this.__handleError}
            >
                {(query: QueryResult<QueryResultDataList<ExecutionOutput>>) => {
                    return this.__renderList(query);
                }}
            </Query>
        );
    }

    private __renderList(
        qr: QueryResult<QueryResultDataList<ExecutionOutput>>,
    ): any {
        const loading = qr.loading;
        const result = qr.data ? qr.data.output : undefined;

        this.__startOrStopPolling(qr);

        return (
            <Table
                baseUrl={this.props.location.pathname}
                result={result}
                loading={loading}
                loadMore={this.__loadMoreScripts}
            />
        );
    }

    private __startOrStopPolling(
        qr: QueryResult<QueryResultDataList<ExecutionOutput>>,
    ): void {
        const result = qr.data ? qr.data.output : undefined;

        if (result == null) {
            if (this.__isPolling) {
                qr.stopPolling();
            }

            return;
        }

        const hasActive = result.data.some(i => i.status === 'running');

        if (hasActive) {
            if (!this.__isPolling) {
                this.__isPolling = true;
                qr.startPolling(1000);
            }

            return;
        }

        if (this.__isPolling) {
            this.__isPolling = false;
            qr.stopPolling();
        }
    }

    private __loadMoreScripts(q: UrlQuery): any {
        this.navigate(this.getPath(), q);
    }

    private __handleError(error: ApolloError): void {
        notification.error({
            message: error.message,
        });
    }
}
