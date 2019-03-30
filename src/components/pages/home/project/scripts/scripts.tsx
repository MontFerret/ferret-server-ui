import { notification } from 'antd';
import isArray from 'lodash/isArray';
import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { QueryResultDataList } from '../.../../../../../../common/graphql/query/result';
import { fromQuery } from '../../../../../common/models/query/pagination';
import { Query as UrlQuery } from '../../../../../common/models/query/query';
import { ScriptOutput } from '../../../../../models/api/model/scriptOutput';
import { findQuery } from '../../../../../queries/script';
import { Page, PageProps } from '../../../../common/page';
import Table from './table';

export type Params = never;
export interface Props extends PageProps<Params> {
    projectId: string;
}

export default class ProjectScriptsPage extends Page<Params, Props> {
    constructor(props: Props) {
        super(props);

        this.__loadMoreScripts = this.__loadMoreScripts.bind(this);
        this.__renderScripts = this.__renderScripts.bind(this);
        this.__handleCreate = this.__handleCreate.bind(this);
    }

    public render(): any {
        const { projectId } = this.props;
        const urlQuery = fromQuery(this.getQuery());
        const variables = {
            projectId,
            query: urlQuery,
        };

        return (
            <Query
                query={findQuery}
                variables={variables}
                fetchPolicy={'network-only'}
            >
                {this.__renderScripts}
            </Query>
        );
    }

    private __renderScripts({ data, loading, error }: QueryResult<QueryResultDataList<ScriptOutput>>): any {
        const pagination = fromQuery(this.getQuery());
        const scripts = data ? data.entities : undefined;

        if (error != null) {
            notification.error({
                message: error.message,
                type: 'error',
            });
        }

        return (
            <Table
                baseUrl={this.props.location.pathname}
                data={isArray(scripts) ? scripts : undefined}
                loading={loading}
                pagination={pagination}
                loadMore={this.__loadMoreScripts}
                onCreate={this.__handleCreate}
            />
        );
    }

    private __loadMoreScripts(q: UrlQuery): any {
        this.navigate(this.getPath(), q.pagination);
    }

    private __handleCreate(): void {
        this.navigate(`${this.props.match.path}/new`);
    }
}
