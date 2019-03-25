import React from 'react';
import { LoadMoreHandler } from '../../../../../common/models/query/loader';
import { Pagination } from '../../../../../common/models/query/pagination';
import { ScriptOutput } from '../../../../../models/api/model/scriptOutput';
import { Column, DataTable } from '../../../../common/table/table';

export interface Props {
    loading: boolean;
    data?: ScriptOutput[];
    pagination: Pagination;
    loadMore: LoadMoreHandler;
    onItemClick: (id: string) => void;
}

export default class ScriptsTable extends React.Component<Props> {
    // tslint:disable-next-line:prefer-array-literal
    private readonly __columns: Array<Column<ScriptOutput>>;

    constructor(props: Props) {
        super(props);

        this.__columns = [
            {
                dataIndex: 'name',
                key: 'name',
                title: 'Name',
            },
            {
                dataIndex: 'createdAt',
                key: 'createdAt',
                title: 'Created at',
            },
            {
                dataIndex: 'updatedAt',
                key: 'updatedAt',
                title: 'Updated at',
            },
        ];
    }

    public render(): any {
        const {
            data,
            loading,
            loadMore,
            pagination,
        } = this.props;

        return (
            <DataTable
                columns={this.__columns}
                data={data}
                loading={loading}
                loadMore={loadMore}
                pagination={pagination}
            />
        );
    }
}
