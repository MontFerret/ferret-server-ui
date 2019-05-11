import { Button, Card, Table } from 'antd';
import { ColumnProps, PaginationConfig, SorterResult } from 'antd/lib/table';
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import { Entity } from '../../../common/models/entity';
import { LoadMoreHandler } from '../../../common/models/query/loader';
import { fromString } from '../../../common/models/query/order';
import { Pagination } from '../../../common/models/query/pagination';
import PageHeader from '../page-header/page-header';
import { Pagination as Pager } from '../pagination/pagination';

const css = require('./table.module.scss');

export type Column<T> = ColumnProps<T>;

export interface Props<T extends Entity> {
    title?: string;
    loading?: boolean;
    // tslint:disable-next-line:prefer-array-literal
    columns: Array<Column<T>>;
    pagination?: Pagination;
    rowKey?: string;
    data?: T[];
    loadMore: LoadMoreHandler;
    onChange?: (selected: string[]) => void;
    onCreate?: () => void;
    onClone?: (id: string) => void;
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
        this.__handleTableChange = this.__handleTableChange.bind(this);
        this.__handleCloneClick = this.__handleCloneClick.bind(this);
        this.__handleDeleteClick = this.__handleDeleteClick.bind(this);
        this.__handlePaginationChange = this.__handlePaginationChange.bind(
            this,
        );
    }

    public render(): any {
        const { columns, data, loading, pagination, title } = this.props;

        return (
            <Card>
                <PageHeader title={title} extra={this.__renderButtons()} />
                <Table
                    className={css.table}
                    rowKey={this.__getRowKey}
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    loading={loading}
                    rowSelection={this.__handleRowSelection}
                    onChange={this.__handleTableChange}
                />
                <Pager
                    cursors={pagination ? pagination.cursors : undefined}
                    onChange={this.__handlePaginationChange}
                />
            </Card>
        );
    }

    private __renderButtons(): any[] {
        const { selectedRows } = this.state;
        const { onCreate, onClone, onDelete } = this.props;
        const buttons = [];

        if (typeof onCreate === 'function') {
            buttons.push(
                <Button
                    type="primary"
                    key="create"
                    icon="plus"
                    disabled={!isEmpty(selectedRows)}
                    onClick={onCreate}
                >
                    Create
                </Button>,
            );
        }

        if (typeof onClone === 'function') {
            buttons.push(
                <Button
                    type="default"
                    key="copy"
                    icon="copy"
                    disabled={
                        selectedRows.length > 1 || selectedRows.length < 1
                    }
                    onClick={this.__handleCloneClick}
                >
                    Clone
                </Button>,
            );
        }

        if (typeof onDelete === 'function') {
            buttons.push(
                <Button
                    type="danger"
                    key="delete"
                    icon="delete"
                    disabled={isEmpty(selectedRows)}
                    onClick={this.__handleDeleteClick}
                >
                    Delete
                </Button>,
            );
        }

        return buttons;
    }

    private __handleTableChange(
        _: PaginationConfig,
        __: Record<any, string[]>,
        sorter: SorterResult<any>,
    ): void {
        let sorting;

        if (sorter != null) {
            if (
                isEmpty(sorter.field) === false &&
                isEmpty(sorter.order) === false
            ) {
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
        });
    }

    private __handlePaginationChange(cursor: string): void {
        this.props.loadMore({
            cursor,
        });
    }

    private __handleCloneClick(): void {
        const { onClone } = this.props;
        const { selectedRows } = this.state;

        if (isEmpty(selectedRows)) {
            return;
        }

        if (typeof onClone === 'function') {
            onClone(selectedRows[0]);
        }
    }

    private __handleDeleteClick(): void {
        const { onDelete } = this.props;
        const { selectedRows } = this.state;

        if (isEmpty(selectedRows)) {
            return;
        }

        if (typeof onDelete === 'function') {
            onDelete(selectedRows);
        }
    }

    private __getRowKey(row: any): any {
        return row[this.props.rowKey || 'id'];
    }
}
