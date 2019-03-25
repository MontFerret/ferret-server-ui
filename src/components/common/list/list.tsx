import { List } from 'antd';
import { ListGridType } from 'antd/lib/list';
import cn from 'classnames';
import React from 'react';
import { LoadMoreHandler } from '../../../common/models/query/loader';
import { Pagination } from '../../../common/models/query/pagination';
import Panel from '../table/panel';
const css = require('./list.module.scss');

export type ItemRenderer<T> = (item: T) => React.ReactElement;

export interface Props<T = any> {
    className?: string;
    grid?: ListGridType;
    loading?: boolean;
    pagination: Pagination;
    data?: T[];
    loadMore: LoadMoreHandler;
    renderItem: ItemRenderer<T>;
    hidePanel?: boolean;
}

export class DataList extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.__renderItem = this.__renderItem.bind(this);
    }

    public render(): any {
        const {
            data,
            pagination,
            className,
            hidePanel,
            grid,
        } = this.props;
        const p = {
            current: pagination.page,
            defaultCurrent: 1,
            pageSize: pagination.size,
            hideOnSinglePage: true,
        };

        const panel = hidePanel !== true ? <Panel /> : null;

        return (
            <div>
                {panel}
                <List
                    grid={grid}
                    className={cn(css.list, className)}
                    dataSource={data}
                    pagination={p}
                    renderItem={this.__renderItem}
                />
            </div>
        );
    }

    private __renderItem(item: any): any {
        return (
            <List.Item>
                {this.props.renderItem(item)}
            </List.Item>
        );
    }
}
