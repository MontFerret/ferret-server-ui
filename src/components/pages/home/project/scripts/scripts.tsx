import { Button, Card, notification } from 'antd';
import gql from 'graphql-tag';
import isArray from 'lodash/isArray';
import React, { Fragment } from 'react';
import { Query, QueryResult } from 'react-apollo';
import { fromQuery } from '../../../../../common/models/query/pagination';
import { Query as UrlQuery } from '../../../../../common/models/query/query';
import { ScriptOutput } from '../../../../../models/api/model/scriptOutput';
import { Page, PageProps } from '../../../../common/page';
import PageHeader from '../../../../common/page-header/page-header';
import Table from './table';

const findScriptsQuery = gql`
    query findScripts($projectId: String!, $query: Query) {
        scripts(projectId: $projectId, query: $query)
            @rest(type: "[Script]", path: "/projects/{args.projectId}/scripts?{args.query}" ) {
                id,
                rev,
                createdAt,
                name,
                description
            }
    }
`;

interface QueryResultData {
    scripts: ScriptOutput[];
}

export type Params = never;
export interface Props extends PageProps<Params> {
    projectId: string;
}

export default class ProjectScriptsPage extends Page<Params, Props> {
    constructor(props: Props) {
        super(props);

        this.__loadMoreScripts = this.__loadMoreScripts.bind(this);
        this.__renderScripts = this.__renderScripts.bind(this);
    }

    public render(): any {
        const { projectId } = this.props;
        const urlQuery = fromQuery(this.getQuery());
        const variables = {
            projectId,
            query: urlQuery,
        };

        return (
            <Fragment>
                <Card>
                    <PageHeader
                        title="Scripts"
                    />
                    <Query
                        query={findScriptsQuery}
                        variables={variables}
                        >
                        {this.__renderScripts}
                    </Query>
                </Card>
            </Fragment>
        );
    }

    private __renderScripts({ data, loading, error }: QueryResult<QueryResultData>): any {
        const pagination = fromQuery(this.getQuery());
        const scripts = data ? data.scripts : undefined;

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
            />
        );
    }

    private __loadMoreScripts(q: UrlQuery): any {
        this.navigate(this.getPath(), q.pagination);
    }

    private __renderButtons(): any {
        return [
            <Button key="create">
                Create
            </Button>,
        ];
    }
}
