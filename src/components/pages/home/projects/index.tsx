import gq from 'graphql-tag';
import isArray from 'lodash/isArray';
import partial from 'lodash/partial';
import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { Link } from 'react-router-dom';
import { fromQuery } from '../../../../common/models/query/pagination';
import { Query as UrlQuery } from '../../../../common/models/query/query';
import { ProjectOutput } from '../../../../models/api/model/projectOutput';
import { Page, PageProps } from '../../../common/page';
import { Column, DataTable } from '../../../common/table/table';

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

interface QueryResultProjects {
    projects: ProjectOutput[];
}

const LinkToDetails = (
    url: string,
    text: string,
    record: ProjectOutput,
) => <Link to={`${url}/${record.id}`}>{text}</Link>;

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

    private readonly __fetch: (q: UrlQuery) => void;
    private readonly __handleCreate: () => void;
    private readonly __handleDelete: (ids: string[]) => void;
    // tslint:disable-next-line:prefer-array-literal
    private readonly __columns: Array<Column<ProjectOutput>>;

    constructor(props: Props) {
        super(props);

        const ToDetails = partial(LinkToDetails, props.match.url);
        this.__columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: ToDetails,
            },
            {
                title: 'Created',
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: ToDetails,
            },
            {
                title: 'Updated',
                dataIndex: 'updatedAt',
                key: 'updatedAt',
                render: ToDetails,
            },
        ];
        this.__fetch = (q: UrlQuery) => {
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
        this.__renderResults = this.__renderResults.bind(this);
    }

    public render(): any {
        return (
            <Query query={findQuery}>
                {this.__renderResults}
            </Query>
        );
    }

    private __renderResults({ data, loading }: QueryResult<QueryResultProjects>): any {
        const pagination = fromQuery(this.getQuery());

        return (
            <DataTable
                columns={this.__columns}
                data={data ? data.projects : undefined}
                loading={loading}
                pageNum={pagination.page}
                pageSize={pagination.size}
                fetch={this.__fetch}
            />
        );
    }
}
