import { Icon, Layout, Menu } from 'antd';
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loader from '../../../common/loader/loader';
import { Page, PageProps } from '../../../common/page';
const css = require('./index.module.scss');

const { Sider, Content } = Layout;
const LoadableProjectDashboardPage = React.lazy(() => import('./dashboard/index'));
const LoadableProjectDatabasePage = React.lazy(() => import('./database/index'));
const LoadableProjectScriptsPage = React.lazy(() => import('./scripts/index'));
const LoadableProjectSettingsPage = React.lazy(() => import('./settings/index'));

export interface Params {
    id: string;
}

export interface Props extends PageProps<Params> {}

export default class ProjectDetailsPage extends Page<Params, Props> {
    public render(): any {
        const { match, location } = this.props;
        let redirect;

        if (location.pathname === match.url) {
            redirect = <Redirect to={`${match.url}/dashboard`} />;
        }

        return (
            <Layout className={css.layout}>
                <Sider
                    collapsible
                >
                    <div className="logo" />
                    <Menu theme="dark">
                        <Menu.Item>
                            <Icon type="dashboard" />
                            <span>General</span>
                        </Menu.Item>
                        <Menu.Item>
                            <Icon type="file" />
                            <span>Scripts</span>
                        </Menu.Item>
                        <Menu.Item>
                            <Icon type="database" />
                            <span>Data</span>
                        </Menu.Item>
                        <Menu.Item>
                            <Icon type="setting" />
                            <span>Settings</span>
                        </Menu.Item>
                    </Menu>
                    <Menu theme="dark" className={css.bottomMenu}>
                        <Menu.Item>
                            <Icon type="logout" />
                            <span>Logout</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Content>
                    <Suspense fallback={<Loader />}>
                    <Switch>
                        {redirect}
                        <Route
                            path={`${match.url}/dashboard`}
                            component={LoadableProjectDashboardPage}
                        />
                        <Route
                            path={`${match.url}/scripts`}
                            component={LoadableProjectScriptsPage}
                        />
                        <Route
                            path={`${match.url}/data`}
                            component={LoadableProjectDatabasePage}
                        />
                        <Route
                            path={`${match.url}/settings`}
                            component={LoadableProjectSettingsPage}
                        />
                    </Switch>
                </Suspense>
                </Content>
            </Layout>
        );
    }
}
