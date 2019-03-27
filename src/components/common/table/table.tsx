import { Table } from 'antd';
import {
    ColumnProps,
    PaginationConfig,
    SorterResult,
} from 'antd/lib/table';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import React, { Fragment } from 'react';
import { Entity } from '../../../common/models/entity';
import { LoadMoreHandler } from '../../../common/models/query/loader';
import { fromString } from '../../../common/models/query/order';
import { Pagination } from '../../../common/models/query/pagination';
import Panel, { Action } from '../table/panel';

const ITEMS_UNSELECTED: Action[] = [
    {
        id: 'create',
        text: 'Create',
        icon: 'edit',
    },
];

const ITEMS_SELECTED: Action[] = [
    {
        id: 'delete',
        text: 'Delete',
        icon: 'delete',
    },
];

export type Column<T> = ColumnProps<T>;

export interface Props<T extends Entity> {
    loading?: boolean;
    // tslint:disable-next-line:prefer-array-literal
    columns: Array<Column<T>>;
    pagination: Pagination;
    data?: T[];
    loadMore: LoadMoreHandler;
    onChange?: (selected: string[]) => void;
    onCreate?: () => void;
    onDelete?: (selected: string[]) => void;
}

interface State {
    selectedRows: string[];
}

export class DataTable extends React.PureComponent<Props<any>, State> {
    private readonly __handleRowSelection: any;

    constructor(props: Props<any>) {
        super(props);

        this.state = {
            selectedRows: [],
        };

        this.__getRowKey = this.__getRowKey.bind(this);
        this.__handleAction = this.__handleAction.bind(this);
        this.__handleRowSelection = {
            onChange: (selectedRowKeys: string[]) => {
                if (this.props.onChange != null) {
                    this.props.onChange(selectedRowKeys);
                }

                this.setState({
                    selectedRows: selectedRowKeys,
                });
            },

            getCheckboxProps: (record: any) => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
            }),
        };
    }

    public render(): any {
        const { columns, data, loading, pagination } = this.props;
        const p = {
            current: pagination.page,
            defaultCurrent: 1,
            pageSize: pagination.size,
            total: get(data, 'count', 0),
            showSizeChanger: true,
        };

        const actions = this.__getActions();

        return (
            <Fragment>
                <Panel
                    actions={actions}
                    onAction={this.__handleAction}
                />
                <Table
                    rowKey={this.__getRowKey}
                    columns={columns}
                    dataSource={data}
                    pagination={p}
                    loading={loading}
                    rowSelection={this.__handleRowSelection}
                    onChange={this.__handleTableChange}
                />
            </Fragment>
        );
    }

    private __getActions(): Action[] {
        if (isEmpty(this.state.selectedRows)) {
            return ITEMS_UNSELECTED;
        }

        return ITEMS_SELECTED;
    }

    private __handleAction(idx: number): void {
        const action = this.__getActions()[idx];

        if (action.id === 'create') {
            if (this.props.onCreate != null) {
                this.props.onCreate();
            }
        } else if (action.id === 'delete') {
            if (this.props.onDelete != null) {
                this.props.onDelete(this.state.selectedRows);
            }
        }
    }

    private __handleTableChange(
        pagination: PaginationConfig,
        _: Record<any, string[]>,
        sorter: SorterResult<any>,
    ): void {
        let sorting;

        if (sorter != null) {
            if (isEmpty(sorter.field) === false && isEmpty(sorter.order) === false) {
                sorting = {
                    columns: [
                        {
                            name: sorter.field,
                            order: fromString(sorter.order),
                        },
                    ],
                };
            }
        }

        this.props.loadMore({
            sorting,
            pagination: {
                size: pagination.pageSize || 10,
                page: pagination.current || 1,
            },
        });
    }

    private __getRowKey(row: any): any {
        return row.id;
    }
}
