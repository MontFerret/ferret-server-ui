import React from 'react';
import { SearchResult } from '../../../../../common/graphql/query/result';
import { LoadMoreHandler } from '../../../../../common/models/query/loader';
import { ExecutionOutput } from '../../../../../models/api/model/executionOutput';
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

        this.__columns = [
            {
                dataIndex: 'jobId',
                key: 'jobId',
                title: 'Job ID',
            },
            {
                dataIndex: 'scriptId',
                key: 'scriptId',
                title: 'Script ID',
            },
            {
                dataIndex: 'cause',
                key: 'cause',
                title: 'Caused by',
            },
            {
                dataIndex: 'status',
                key: 'status',
                title: 'Status',
            },
            {
                dataIndex: 'startedAt',
                key: 'startedAt',
                title: 'Started',
            },
            {
                dataIndex: 'endedAt',
                key: 'endedAt',
                title: 'Ended',
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
