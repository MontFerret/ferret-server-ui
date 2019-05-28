import { List } from 'antd';
import { ListGridType } from 'antd/lib/list';
import cn from 'classnames';
import React from 'react';
import { LoadMoreHandler } from '../../../common/models/query/loader';
import { Pagination } from '../../../common/models/query/pagination';
import { PageHeader } from '../page-header/page-header';
import { Pagination as Pager } from '../pagination/pagination';
const css = require('./list.module.scss');

export type ItemRenderer<T> = (item: T) => React.ReactElement;

export interface Props<T = any> {
    title?: string;
    className?: string;
    grid?: ListGridType;
    loading?: boolean;
    pagination?: Pagination;
    data?: T[];
    loadMore: LoadMoreHandler;
    renderItem: ItemRenderer<T>;
    hidePanel?: boolean;
}

export class DataList extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.__renderItem = this.__renderItem.bind(this);
        this.__handlePaginationChange = this.__handlePaginationChange.bind(
            this,
        );
    }

    public render(): any {
        const {
            title,
            data,
            pagination,
            className,
            hidePanel,
            grid,
        } = this.props;

        const panel =
            hidePanel !== true ? <PageHeader title={title || ''} /> : null;

        return (
            <React.Fragment>
                {panel}
                <List
                    grid={grid}
                    className={cn(css.list, className)}
                    dataSource={data}
                    pagination={false}
                    renderItem={this.__renderItem}
                />
                <Pager
                    cursors={pagination ? pagination.cursors : undefined}
                    onChange={this.__handlePaginationChange}
                />
            </React.Fragment>
        );
    }

    private __renderItem(item: any): any {
        return <List.Item>{this.props.renderItem(item)}</List.Item>;
    }

    private __handlePaginationChange(cursor: string): void {
        this.props.loadMore({ cursor });
    }
}
