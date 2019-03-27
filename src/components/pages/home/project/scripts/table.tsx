import partial from 'lodash/partial';
import React from 'react';
import { LoadMoreHandler } from '../../../../../common/models/query/loader';
import { Pagination } from '../../../../../common/models/query/pagination';
import { ScriptOutput } from '../../../../../models/api/model/scriptOutput';
import { LinkToDetails } from '../../../../common/link/details';
import { Column, DataTable } from '../../../../common/table/table';

export interface Props {
    baseUrl: string;
    loading: boolean;
    data?: ScriptOutput[];
    pagination: Pagination;
    loadMore: LoadMoreHandler;
}

export default class ScriptsTable extends React.Component<Props> {
    // tslint:disable-next-line:prefer-array-literal
    private readonly __columns: Array<Column<ScriptOutput>>;

    constructor(props: Props) {
        super(props);

        const ToDetails = partial(LinkToDetails, props.baseUrl);

        this.__columns = [
            {
                dataIndex: 'name',
                key: 'name',
                title: 'Name',
                render: ToDetails,
            },
            {
                dataIndex: 'description',
                key: 'description',
                title: 'Description',
                render: ToDetails,
            },
            {
                dataIndex: 'createdAt',
                key: 'createdAt',
                title: 'Created',
                render: ToDetails,
            },
            {
                dataIndex: 'updatedAt',
                key: 'updatedAt',
                title: 'Updated',
                render: ToDetails,
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
