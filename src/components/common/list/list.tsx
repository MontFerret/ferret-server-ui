import { List } from 'antd';
import React from 'react';
import { LoadMoreHandler } from '../../../common/models/query/loader';
import { Pagination } from '../../../common/models/query/pagination';

export type ItemRenderer<T> = (item: T) => React.ReactElement;

export interface Props<T = any> {
    className?: string;
    loading?: boolean;
    pagination: Pagination;
    data?: T[];
    loadMore: LoadMoreHandler;
    renderItem: ItemRenderer<T>;
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
        } = this.props;
        const p = {
            current: pagination.page,
            defaultCurrent: 1,
            pageSize: pagination.size,
            hideOnSinglePage: true,
        };

        return (
            <div>
                <List
                    className={className}
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
