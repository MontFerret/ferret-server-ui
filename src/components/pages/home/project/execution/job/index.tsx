import { Descriptions, Spin, notification } from 'antd';
import { ApolloError } from 'apollo-client';
import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { QueryResultData } from '../../../../../../common/graphql/query/result';
import { ExecutionOutputDetailed } from '../../../../../../models/api/model/executionOutputDetailed';
import { getQuery } from '../../../../../../queries/exec';
import { CauseTag } from '../../../../../common/cause/cause';
import { DateTime } from '../../../../../common/date-time/date-time';
import { FormCard } from '../../../../../common/form/card';
import { Page, PageProps } from '../../../../../common/page';
import { PageHeader } from '../../../../../common/page-header/page-header';
import { StatusTag } from '../../../../../common/status/status';

export interface Params {
    id: string;
}

export interface Props extends PageProps<Params> {
    projectId: string;
}

export default class JobDetailsPage extends Page<Params, Props> {
    constructor(props: Props) {
        super(props);

        this.__renderForm = this.__renderForm.bind(this);
        this.__renderDescription = this.__renderDescription.bind(this);
        this.__handleError = this.__handleError.bind(this);
    }

    public render(): any {
        const { projectId } = this.props;
        const id = this.getParam('id');

        const variables = {
            id,
            projectId,
        };

        return (
            <Query
                query={getQuery}
                variables={variables}
                onError={this.__handleError}
            >
                {this.__renderForm}
            </Query>
        );
    }

    private __renderForm(
        qr: QueryResult<QueryResultData<ExecutionOutputDetailed>>,
    ): any {
        const loading = qr.loading;
        const data = qr.data ? qr.data.output : undefined;
        const onBack = () => {
            this.navigate(this.slicePathBack(1));
        };

        return (
            <Spin spinning={loading}>
                <FormCard>
                    <PageHeader
                        title={data ? data.jobId : ''}
                        onBack={onBack}
                    />
                    {data ? this.__renderDescription(data) : null}
                </FormCard>
            </Spin>
        );
    }

    private __renderDescription(data: ExecutionOutputDetailed): any {
        return (
            <>
                <Descriptions title="Job result summary">
                    <Descriptions.Item label="Script">
                        <span>{data.scriptId}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="Status">
                        <StatusTag value={data.status} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Cause">
                        <CauseTag value={data.cause} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Started">
                        <DateTime value={data.startedAt} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Ended">
                        <DateTime value={data.endedAt} />
                    </Descriptions.Item>
                </Descriptions>

                <hr />
                <h3>Logs</h3>
                {data.logs}
            </>
        );
    }

    private __handleError(error: ApolloError): void {
        notification.error({
            message: error.message,
        });
    }
}
