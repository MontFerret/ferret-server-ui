import { Button, Layout } from 'antd';
import gql from 'graphql-tag';
import isArray from 'lodash/isArray';
import React from 'react';
import { Mutation, MutationFunc, MutationResult, Query, QueryResult } from 'react-apollo';
import { Link } from 'react-router-dom';
import { LoadMoreHandler } from '../../../../common/models/query/loader';
import { fromQuery } from '../../../../common/models/query/pagination';
import { Query as UrlQuery } from '../../../../common/models/query/query';
import { ProjectCreate } from '../../../../models/api/model/projectCreate';
import { ProjectOutput } from '../../../../models/api/model/projectOutput';
import { Page, PageProps, PageState } from '../../../common/page';
import NewProjectForm from './form';
import List from './list';
const css = require('./index.module.scss');

const { Header, Content } = Layout;
const findQuery = gql`
    query findProjects {
        projects @rest(type: "[Project]", path: "/projects") {
            id
            rev
            createdAt
            updatedAt
            name
        }
    }
`;

// tslint:disable:max-line-length
const createQuery = gql`
    mutation createProject($input: Project!) {
        createProject(input: $input) @rest(
            method: "POST",
            path: "projects"
        ) {
            id
        }
    }
`;

interface QueryResultData {
    projects: ProjectOutput[];
}

interface MutationResultData {
    createProject: {
        id: string;
    };
}

interface QueryVariables {
    criteria: UrlQuery;
}

enum FormState {
    Hidden = 0,
    Visible = 1,
}

interface State extends PageState {
    form: FormState;
}

export type Params = never;

export interface Props extends PageProps<Params> {}

export default class ProjectsIndexPage extends Page<Params, Props, State> {
    public static makeQueryVariables(urlQuery: UrlQuery): QueryVariables {
        return {
            criteria: {
                pagination: fromQuery(urlQuery),
                // sorting: SORTING,
            },
        };
    }

    private readonly __loadMore: LoadMoreHandler;

    constructor(props: Props) {
        super(props, {
            form: FormState.Hidden,
        });

        this.__loadMore = (q: UrlQuery) => {
            this.navigate(this.getPath(), q.pagination);
        };
        this.__renderList = this.__renderList.bind(this);
        this.__renderForm = this.__renderForm.bind(this);
        this.__handleListItemClick = this.__handleListItemClick.bind(this);
        this.__handleNewProjectClick = this.__handleNewProjectClick.bind(this);
        this.__handleNewProjectCreate = this.__handleNewProjectCreate.bind(this);
        this.__handleNewProjectCancel = this.__handleNewProjectCancel.bind(this);
    }

    public render(): any {
        const { match } = this.props;

        return (
            <Layout className={css.layout}>
                <Header className={css.header}>
                    <div>
                        <Link to={match.url} className={css.logo}>Browse projects</Link>
                        <Button
                            className={css.createBtn}
                            type="primary"
                            onClick={this.__handleNewProjectClick}
                        >
                            Create
                        </Button>
                    </div>
                    <Button
                        className={css.logoutBtn}
                        type="danger"
                        icon="logout"
                        role="logout"
                    />
                </Header>
                <Content className={css.content}>
                    <Query query={findQuery}>
                        {this.__renderList}
                    </Query>
                    <Mutation mutation={createQuery}>
                        {this.__renderForm}
                    </Mutation>
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

    private __renderForm(fn: MutationFunc, { error, loading, data }: MutationResult<MutationResultData>): any {
        const { form } = this.state;
        const onCreate = (project: ProjectCreate) => {
            fn({
                variables: { input: project },
            });
        };

        if (!loading && !error && data) {
            this.__handleListItemClick(data.createProject.id);

            return;
        }

        return (
            <NewProjectForm
                visible={form === FormState.Visible}
                loading={loading}
                error={error ? error.message : undefined}
                onCreate={onCreate}
                onCancel={this.__handleNewProjectCancel}
            />
        );
    }

    private __handleListItemClick(itemId: string): void {
        this.navigate(`${this.props.match.url}/${itemId}`);
    }

    private __handleNewProjectClick(): void {
        this.setState({
            form: FormState.Visible,
        });
    }

    private __handleNewProjectCreate(_: ProjectCreate): void {
        this.setState({
            form: FormState.Hidden,
        });
    }

    private __handleNewProjectCancel(): void {
        this.setState({
            form: FormState.Hidden,
        });
    }
}
