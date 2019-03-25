import { Col, Row, notification } from 'antd';
import gql from 'graphql-tag';
import isArray from 'lodash/isArray';
import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { fromQuery } from '../../../../../common/models/query/pagination';
import { Query as UrlQuery } from '../../../../../common/models/query/query';
import { ScriptOutput } from '../../../../../models/api/model/scriptOutput';
import { Page, PageProps } from '../../../../common/page';
import Table from './table';

const findScriptsQuery = gql`
    query findScripts($projectId: String!, $query: Query) {
        scripts(projectId: $projectId, query: $query)
            @rest(type: "[Project]", path: "/projects/{args.projectId}/scripts?{args.query}" ) {
                id,
                rev,
                createdAt,
                name
            }
    }
`;

interface QueryResultData {
    scripts: ScriptOutput[];
}

export type Params = never;
export interface Props extends PageProps<Params> {
    project: string;
}

export default class ProjectScriptsPage extends Page<Params, Props> {
    constructor(props: Props) {
        super(props);

        this.__loadMoreScripts = this.__loadMoreScripts.bind(this);
        this.__renderScripts = this.__renderScripts.bind(this);
        this.__handleListItemClick = this.__handleListItemClick.bind(this);
    }

    public render(): any {
        const { project } = this.props;
        const urlQuery = fromQuery(this.getQuery());
        const variables = {
            projectId: project,
            query: urlQuery,
        };

        return (
            <Row>
                <Col lg={24}>
                    <Query
                        query={findScriptsQuery}
                        variables={variables}
                    >
                        {this.__renderScripts}
                    </Query>
                </Col>
            </Row>
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
                data={isArray(scripts) ? scripts : undefined}
                loading={loading}
                pagination={pagination}
                loadMore={this.__loadMoreScripts}
                onItemClick={this.__handleListItemClick}
            />
        );
    }

    private __handleListItemClick(_: string): void {}

    private __loadMoreScripts(q: UrlQuery): any {
        this.navigate(this.getPath(), q.pagination);
    }
}
