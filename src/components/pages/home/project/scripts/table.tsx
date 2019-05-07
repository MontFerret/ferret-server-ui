import partial from 'lodash/partial';
import React from 'react';
import { SearchResult } from '../../../../../common/graphql/query/result';
import { LoadMoreHandler } from '../../../../../common/models/query/loader';
import { ScriptOutput } from '../../../../../models/api/model/scriptOutput';
import { LinkToDetails } from '../../../../common/link/details';
import { Column, DataTable } from '../../../../common/table/table';

export interface Props {
    baseUrl: string;
    loading: boolean;
    result?: SearchResult<ScriptOutput>;
    loadMore: LoadMoreHandler;
    onCreate: () => void;
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
        const { result, loading, loadMore, onCreate } = this.props;

        return (
            <DataTable
                title="Scripts"
                columns={this.__columns}
                data={result ? result.data : undefined}
                loading={loading}
                loadMore={loadMore}
                pagination={result ? result.paging : undefined}
                onCreate={onCreate}
            />
        );
    }
}
