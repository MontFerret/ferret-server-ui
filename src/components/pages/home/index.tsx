import { Button, Layout } from 'antd';
import React, { Suspense } from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import Loader from '../../common/loader/loader';
import { Page, PageProps, PageState } from '../../common/page';
const css = require('./index.module.scss');

const { Header, Content } = Layout;
const LoadableProjectsListPage = React.lazy(() => import('./projects/index'));
const LoadableProjectDetailsPage = React.lazy(() => import('./project/index'));

export interface State extends PageState {
    collapsed: boolean;
}

export interface Props extends PageProps {}

export default class HomePage extends Page<never, Props, State> {
    public render(): any {
        const { match, location } = this.props;

        let redirect;

        if (location.pathname === match.url) {
            redirect = <Redirect to={`${match.url}/projects`} />;
        }

        return (
            <Layout className={css.layout}>
                <Header className={css.header}>
                    <Link to={match.url} className={css.logo}>Ferret</Link>
                    <Button
                        className={css.logoutBtn}
                        type="primary"
                        icon="logout"
                        role="logout"
                    />
                </Header>
                <Content className={css.content}>
                    <Suspense fallback={<Loader />}>
                        <Switch>
                            {redirect}
                            <Route
                                path={`${match.url}/projects/:id`}
                                component={LoadableProjectDetailsPage}
                            />
                            <Route
                                path={`${match.url}/projects`}
                                component={LoadableProjectsListPage}
                            />
                        </Switch>
                    </Suspense>
                </Content>
            </Layout>
        );
    }
}
