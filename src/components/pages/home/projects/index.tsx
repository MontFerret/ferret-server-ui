import { Button, Layout } from 'antd';
import React from 'react';
import {
    Mutation,
    MutationFunc,
    MutationResult,
    Query,
    QueryResult,
} from 'react-apollo';
import { Link } from 'react-router-dom';
import { MutationResultData } from '../../../../common/graphql/mutation/result';
import { QueryResultDataList } from '../../../../common/graphql/query/result';
import { LoadMoreHandler } from '../../../../common/models/query/loader';
import { Query as UrlQuery } from '../../../../common/models/query/query';
import { ProjectCreate } from '../../../../models/api/model/projectCreate';
import { ProjectOutput } from '../../../../models/api/model/projectOutput';
import { createMutation, findQuery } from '../../../../queries/project';
import { Page, PageProps, PageState } from '../../../common/page';
import NewProjectForm from './form';
import List from './list';
const css = require('./index.module.scss');

const { Header, Content } = Layout;

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
    private readonly __loadMore: LoadMoreHandler;

    constructor(props: Props) {
        super(props, {
            form: FormState.Hidden,
        });

        this.__loadMore = (q: UrlQuery) => {
            this.navigate(this.getPath(), q);
        };
        this.__renderList = this.__renderList.bind(this);
        this.__renderForm = this.__renderForm.bind(this);
        this.__handleListItemClick = this.__handleListItemClick.bind(this);
        this.__handleNewProjectClick = this.__handleNewProjectClick.bind(this);
        this.__handleNewProjectCreate = this.__handleNewProjectCreate.bind(
            this,
        );
        this.__handleNewProjectCancel = this.__handleNewProjectCancel.bind(
            this,
        );
    }

    public render(): any {
        const { match } = this.props;
        const variables = {
            query: this.getQuery(),
        };

        return (
            <Layout className={css.layout}>
                <Header className={css.header}>
                    <div>
                        <Link to={match.url} className={css.logo}>
                            Browse projects
                        </Link>
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
                    <Query query={findQuery} variables={variables}>
                        {this.__renderList}
                    </Query>
                    <Mutation mutation={createMutation}>
                        {this.__renderForm}
                    </Mutation>
                </Content>
            </Layout>
        );
    }

    private __renderList({
        data,
        loading,
    }: QueryResult<QueryResultDataList<ProjectOutput>>): any {
        const output = data ? data.output : undefined;

        return (
            <List
                result={output}
                loading={loading}
                loadMore={this.__loadMore}
                onItemClick={this.__handleListItemClick}
            />
        );
    }

    private __renderForm(
        fn: MutationFunc,
        { error, loading, data }: MutationResult<MutationResultData>,
    ): any {
        const { form } = this.state;
        const onCreate = (project: ProjectCreate) => {
            fn({
                variables: { input: project },
            });
        };

        if (!loading && !error && data) {
            this.__handleListItemClick(data.output.id);

            return null;
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
