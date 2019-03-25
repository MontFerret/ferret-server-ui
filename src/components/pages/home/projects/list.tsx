import { Col, Row } from 'antd';
import React, { Fragment } from 'react';
import { LoadMoreHandler } from '../../../../common/models/query/loader';
import { Pagination } from '../../../../common/models/query/pagination';
import { ProjectOutput } from '../../../../models/api/model/projectOutput';
import { DataList } from '../../../common/list/list';
import { ListItem } from './list-item';

export interface Props {
    loading: boolean;
    data?: ProjectOutput[];
    pagination: Pagination;
    loadMore: LoadMoreHandler;
    onItemClick: (id: string) => void;
}

export default class PorjectsList extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.__renderItem = this.__renderItem.bind(this);
    }

    public render(): any {
        const {
            data,
            loading,
            pagination,
            loadMore,
        } = this.props;

        return (
            <Fragment>
                <Row
                    type="flex"
                    justify="space-around"
                    align="middle"
                >
                    <Col
                        lg={20}
                    >
                        <DataList
                            hidePanel={true}
                            data={data}
                            loading={loading}
                            pagination={pagination}
                            loadMore={loadMore}
                            renderItem={this.__renderItem}
                        />
                    </Col>
                </Row>
            </Fragment>
        );
    }

    private __renderItem(item: ProjectOutput): any {
        return (
            <ListItem
                item={item}
                onClick={this.props.onItemClick}
            />
        );
    }
}
