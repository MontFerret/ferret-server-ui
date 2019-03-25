import { Button, Layout } from 'antd';
import gq from 'graphql-tag';
import isArray from 'lodash/isArray';
import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { Link } from 'react-router-dom';
import { LoadMoreHandler } from '../../../../common/models/query/loader';
import { fromQuery } from '../../../../common/models/query/pagination';
import { Query as UrlQuery } from '../../../../common/models/query/query';
import { ProjectOutput } from '../../../../models/api/model/projectOutput';
import { Page, PageProps } from '../../../common/page';
import List from './list';
const css = require('./index.module.scss');

const { Header, Content } = Layout;
const findQuery = gq`
    query findProjects {
        projects @rest(type: "Project", path: "/projects") {
            id
            rev
            createdAt
            updatedAt
            name
        }
    }
`;

interface QueryResultData {
    projects: ProjectOutput[];
}

interface QueryVariables {
    criteria: UrlQuery;
}

export type Params = never;

export interface Props extends PageProps<Params> {}

export default class ProjectsIndexPage extends Page<Params, Props> {
    public static makeQueryVariables(urlQuery: UrlQuery): QueryVariables {
        return {
            criteria: {
                pagination: fromQuery(urlQuery),
                // sorting: SORTING,
            },
        };
    }

    private readonly __loadMore: LoadMoreHandler;
    private readonly __handleCreate: () => void;
    private readonly __handleDelete: (ids: string[]) => void;

    constructor(props: Props) {
        super(props);

        this.__loadMore = (q: UrlQuery) => {
            this.navigate(this.getPath(), q.pagination);
        };
        this.__handleCreate = () => {
            this.navigate('/dashboard/gov/member');
        };
        this.__handleDelete = async () => {
            // const { deleteUser } = this.props;
            // let err = null;

            // try {
            //     await asyncEach(ids, (id: string) => {
            //         return deleteUser({
            //             variables: {
            //                 id: 'foo',
            //             },
            //             update: (proxy) => {
            //                 const variables = UsersPage.makeQueryVariables(this.getQuery());

            //                 const data: any = proxy.readQuery({
            //                     variables,
            //                     query: findUsersQuery,
            //                 });

            //                 const filtered = filter(data.users.items, i => i.id !== id);

            //                 data.users = filtered;

            //                 proxy.writeQuery({ data, variables, query: findUsersQuery });
            //             },
            //         });
            //     });
            // } catch (e) {
            //     err = e;
            // }

            // if (err != null) {
            //     this.showError(err, 'Failed to delete');

            //     return;
            // }

            // this.showSuccess('Deleted');

            // this.props.findUsers.refetch();
        };
        this.__renderList = this.__renderList.bind(this);
        this.__handleListItemClick = this.__handleListItemClick.bind(this);
    }

    public render(): any {
        const { match } = this.props;

        return (
            <Layout className={css.layout}>
                <Header className={css.header}>
                    <Link to={match.url} className={css.logo}>Projects</Link>
                    <Button
                        className={css.logoutBtn}
                        type="primary"
                        icon="logout"
                        role="logout"
                    />
                </Header>
                <Content className={css.content}>
                    <Query query={findQuery}>
                        {this.__renderList}
                    </Query>
                </Content>
            </Layout>
        );
    }

    private __renderList({ data, loading }: QueryResult<QueryResultData>): any {
        const pagination = fromQuery(this.getQuery());
        const projects = data ? data.projects : undefined;

        return (
            <List
                data={isArray(projects) ? projects : undefined}
                loading={loading}
                pagination={pagination}
                loadMore={this.__loadMore}
                onItemClick={this.__handleListItemClick}
            />
        );
    }

    private __handleListItemClick(itemId: string): void {
        this.navigate(`${this.props.match.url}/${itemId}`);
    }
}
