import { Col, Icon, Layout, Menu, Row } from 'antd';
import startsWith from 'lodash/startsWith';
import React, { Suspense } from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { Route as RouteConfig } from '../../../../common/routing/route';
import Loader from '../../../common/loader/loader';
import { Page, PageProps, PageState } from '../../../common/page';

const css = require('./index.module.scss');

const { Sider, Content } = Layout;
const LoadableProjectDashboardPage = React.lazy(() => import('./dashboard/index'));
const LoadableProjectDataPage = React.lazy(() => import('./data/index'));
const LoadableProjectScriptsPage = React.lazy(() => import('./scripts/index'));
const LoadableProjectSettingsPage = React.lazy(() => import('./settings/index'));

export interface Params {
    id: string;
}

export interface State extends PageState {
    collapsed: boolean;
}

export interface Props extends PageProps<Params> {}

export default class ProjectPage extends Page<Params, Props, State> {
    private readonly __routes: RouteConfig[];

    constructor(props: Props) {
        super(props, {
            collapsed: false,
        });

        this.__handleMenuCollapseChange = this.__handleMenuCollapseChange.bind(this);
        this.__routes = [
            {
                path: `${props.match.url}/dashboard`,
                label: 'Dasboard',
                icon: 'dashboard',
                component: LoadableProjectDashboardPage,
            },
            {
                path: `${props.match.url}/scripts`,
                label: 'Scripts',
                icon: 'file',
                component: LoadableProjectScriptsPage,
            },
            {
                path: `${props.match.url}/data`,
                label: 'Data',
                icon: 'database',
                component: LoadableProjectDataPage,
            },
            {
                path: `${props.match.url}/settings`,
                label: 'Settings',
                icon: 'setting',
                component: LoadableProjectSettingsPage,
            },
        ];

        this.__renderRoutes = this.__renderRoutes.bind(this);
    }

    public render(): any {
        const showText = !this.state.collapsed;
        const selected = this.__currentTabKey();

        return (
            <Layout className={css.layout}>
                <Sider
                    collapsible
                    onCollapse={this.__handleMenuCollapseChange}
                >
                    <Icon type="caret-left" />
                    <Menu
                        theme="dark"
                        className={css.menu}
                        selectedKeys={[selected]}
                    >
                        {this.__routes.map((config: RouteConfig, idx: number) => {
                            const key = idx.toString();

                            return (
                                <Menu.Item key={key}>
                                    <Link to={config.path}>
                                        <Icon type={config.icon} />
                                        {showText ? config.label : null}
                                    </Link>
                                </Menu.Item>
                            );
                        })}
                    </Menu>
                    <Menu theme="dark" className={css.bottomMenu}>
                        <Menu.Item>
                            <Icon type="logout" />
                            <span>Logout</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className={css.contentLayout}>
                    <Content className={css.content}>
                        <Row>
                            <Col lg={24}>
                                {this.__renderRoutes()}
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Layout>
        );
    }

    private __currentTabKey(): string {
        const { location } = this.props;

        const found = this.__routes.findIndex(i => startsWith(location.pathname, i.path));

        return found ? found.toString() : '0';
    }

    private __renderRoutes(): any {
        const { match, location } = this.props;

        let redirect;

        if (location.pathname === match.url) {
            redirect = <Redirect to={`${match.url}/dashboard`} />;
        }

        return (
            <Suspense fallback={<Loader size="large" />}>
                <Switch>
                    {redirect}
                    {this.__routes.map((config: RouteConfig) => {
                        const Component: React.SFC<any> = config.component as any;
                        const projectId = this.getParam('id');

                        return (
                            <Route
                                key={config.path}
                                path={config.path}
                                component={(props: any) => {
                                    return <Component {...props} project={projectId} />;
                                }}
                            />
                        );
                    })}
                </Switch>
            </Suspense>
        );
    }

    private __handleMenuCollapseChange(collapsed: boolean): void {
        this.setState({
            collapsed,
        });
    }
}
