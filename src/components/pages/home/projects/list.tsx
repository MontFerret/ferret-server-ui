import { Col, Row } from 'antd';
import React, { Fragment } from 'react';
import { SearchResult } from '../../../../common/graphql/query/result';
import { LoadMoreHandler } from '../../../../common/models/query/loader';
import { ProjectOutput } from '../../../../models/api/model/projectOutput';
import { DataList } from '../../../common/list/list';
import { ListItem } from './list-item';

export interface Props {
    loading: boolean;
    result?: SearchResult<ProjectOutput>;
    loadMore: LoadMoreHandler;
    onItemClick: (id: string) => void;
}

export default class PorjectsList extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.__renderItem = this.__renderItem.bind(this);
    }

    public render(): any {
        const { result, loading, loadMore } = this.props;

        return (
            <Fragment>
                <Row type="flex" justify="space-around" align="middle">
                    <Col lg={20}>
                        <DataList
                            hidePanel={true}
                            grid={{ gutter: 16, column: 4 }}
                            data={result ? result.data : undefined}
                            loading={loading}
                            pagination={result ? result.paging : undefined}
                            loadMore={loadMore}
                            renderItem={this.__renderItem}
                        />
                    </Col>
                </Row>
            </Fragment>
        );
    }

    private __renderItem(item: ProjectOutput): any {
        return <ListItem item={item} onClick={this.props.onItemClick} />;
    }
}
