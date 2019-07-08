import { Button } from 'antd';
import partial from 'lodash/partial';
import React from 'react';
import { SearchResult } from '../../../../../common/graphql/query/result';
import { Entity } from '../../../../../common/models/entity';
import { LoadMoreHandler } from '../../../../../common/models/query/loader';
import { ScriptOutput } from '../../../../../models/api/model/scriptOutput';
import { LinkToDetails } from '../../../../common/link/details';
import { Column, DataTable } from '../../../../common/table/table';
import { DateTime } from '../../../../common/date-time/date-time';
import { Link } from 'react-router-dom';

export interface Props {
    baseUrl: string;
    loading: boolean;
    result?: SearchResult<ScriptOutput>;
    loadMore: LoadMoreHandler;
    onCreate: () => void;
    onRun: (entity: Entity) => void;
}

export default class ScriptsTable extends React.Component<Props> {
    // tslint:disable-next-line:prefer-array-literal
    private readonly __columns: Array<Column<ScriptOutput>>;

    constructor(props: Props) {
        super(props);

        const baseUrl = props.baseUrl;
        const onRun = props.onRun;
        const ToDetails = partial(LinkToDetails, props.baseUrl);
        const RunButton = (_: string, entity: Entity) => {
            return (
                <Button
                    type="link"
                    icon="right-circle"
                    shape="circle"
                    onClick={partial(onRun, entity)}
                />
            );
        };
        const TimeStamp = (value: string, entity: Entity) => {
            return (
                <Link to={`${baseUrl}/${entity.id}`}>
                    <DateTime value={value} />
                </Link>
            );
        };

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
                render: TimeStamp,
            },
            {
                dataIndex: 'updatedAt',
                key: 'updatedAt',
                title: 'Updated',
                render: TimeStamp,
            },
            {
                dataIndex: '',
                key: '$run',
                title: 'Run',
                render: RunButton,
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
