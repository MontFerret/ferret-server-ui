import React from 'react';
import { Link } from 'react-router-dom';
import { SearchResult } from '../../../../../common/graphql/query/result';
import { LoadMoreHandler } from '../../../../../common/models/query/loader';
import { ExecutionOutput } from '../../../../../models/api/model/executionOutput';
import { CauseTag } from '../../../../common/cause/cause';
import { StatusTag } from '../../../../common/status/status';
import { Column, DataTable } from '../../../../common/table/table';

export interface Props {
    baseUrl: string;
    loading: boolean;
    result?: SearchResult<ExecutionOutput>;
    loadMore: LoadMoreHandler;
}

export default class QueueTable extends React.Component<Props> {
    // tslint:disable-next-line:prefer-array-literal
    private readonly __columns: Array<Column<ExecutionOutput>>;

    constructor(props: Props) {
        super(props);

        const ToDetails = (children: any, entity: ExecutionOutput) => {
            return (
                <Link to={`${this.props.baseUrl}/${entity.jobId}`}>
                    {children}
                </Link>
            );
        };

        this.__columns = [
            {
                dataIndex: 'jobId',
                key: 'jobId',
                title: 'Job ID',
                render: ToDetails as any,
            },
            {
                dataIndex: 'scriptId',
                key: 'scriptId',
                title: 'Script ID',
                render: ToDetails as any,
            },
            {
                dataIndex: 'cause',
                key: 'cause',
                title: 'Cause',
                render: (_: string, entity: ExecutionOutput) => {
                    return ToDetails(<CauseTag value={entity.cause} />, entity);
                },
            },
            {
                dataIndex: 'status',
                key: 'status',
                title: 'Status',
                render: (_: string, entity: ExecutionOutput) => {
                    return ToDetails(
                        <StatusTag value={entity.status} />,
                        entity,
                    );
                },
            },
            {
                dataIndex: 'startedAt',
                key: 'startedAt',
                title: 'Started',
                render: ToDetails as any,
            },
            {
                dataIndex: 'endedAt',
                key: 'endedAt',
                title: 'Ended',
                render: ToDetails as any,
            },
        ];
    }

    public render(): any {
        const { result, loading, loadMore } = this.props;

        return (
            <DataTable
                title="Queue"
                columns={this.__columns}
                rowKey="jobId"
                data={result ? result.data : undefined}
                loading={loading}
                loadMore={loadMore}
                pagination={result ? result.paging : undefined}
            />
        );
    }
}
