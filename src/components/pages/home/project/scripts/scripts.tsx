import { notification } from 'antd';
import { ApolloError } from 'apollo-client';
import React from 'react';
import {
    Mutation,
    MutationFunc,
    MutationResult,
    Query,
    QueryResult,
} from 'react-apollo';
import { QueryResultDataList } from '../.../../../../../../common/graphql/query/result';
import { Entity } from '../../../../../common/models/entity';
import { Query as UrlQuery } from '../../../../../common/models/query/query';
import { ExecutionInput } from '../../../../../models/api/model/executionInput';
import { ScriptOutput } from '../../../../../models/api/model/scriptOutput';
import { findQuery, runMutation } from '../../../../../queries/script';
import { Page, PageProps } from '../../../../common/page';
import Table from './table';

interface MutationVariables {
    projectId: string;
    input: ExecutionInput;
}

interface MutationResultData {
    jobId: string;
}

export type Params = never;
export interface Props extends PageProps<Params> {
    projectId: string;
}

export default class ProjectScriptsPage extends Page<Params, Props> {
    constructor(props: Props) {
        super(props);

        this.__loadMoreScripts = this.__loadMoreScripts.bind(this);
        this.__renderList = this.__renderList.bind(this);
        this.__handleCreate = this.__handleCreate.bind(this);
        this.__handleRun = this.__handleRun.bind(this);
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
                {(query: QueryResult<QueryResultDataList<ScriptOutput>>) => {
                    return (
                        <Mutation
                            mutation={runMutation}
                            variables={variables}
                            // onCompleted={this.__handleCompletedMutation}
                            onError={this.__handleError}
                        >
                            {(
                                fn: MutationFunc,
                                mr: MutationResult<MutationResultData>,
                            ) => {
                                return this.__renderList(query, fn, mr);
                            }}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }

    private __renderList(
        qr: QueryResult<QueryResultDataList<ScriptOutput>>,
        mutate: MutationFunc,
        mr: MutationResult<MutationResultData>,
    ): any {
        const loading = qr.loading || mr.loading;
        const result = qr.data ? qr.data.output : undefined;

        return (
            <Table
                baseUrl={this.props.location.pathname}
                result={result}
                loading={loading}
                loadMore={this.__loadMoreScripts}
                onCreate={this.__handleCreate}
                onRun={this.__handleRun.bind(this, mutate)}
            />
        );
    }

    private __loadMoreScripts(q: UrlQuery): any {
        this.navigate(this.getPath(), q);
    }

    private __handleCreate(): void {
        this.navigate(`${this.props.match.path}/new`);
    }

    private __handleRun(
        mutate: MutationFunc<any, MutationVariables>,
        entity: Entity,
    ): void {
        mutate({
            variables: {
                projectId: this.props.projectId,
                input: {
                    scriptId: entity.id,
                },
            },
        });
    }

    private __handleError(error: ApolloError): void {
        notification.error({
            message: error.message,
        });
    }
}
