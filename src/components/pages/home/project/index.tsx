import { Breadcrumb, Col, Icon, Layout, Menu, Row } from 'antd';
import startsWith from 'lodash/startsWith';
import React, { Suspense } from 'react';
import { Query, QueryResult } from 'react-apollo';
import {
    Link,
    Redirect,
    Route,
    RouteComponentProps,
    Switch,
} from 'react-router-dom';
import { Route as RouteConfig } from '../../../../common/routing/route';
import { getQuery } from '../../../../queries/project';
import Loader from '../../../common/loader/loader';
import { Page, PageProps, PageState } from '../../../common/page';

const css = require('./index.module.scss');

const { Sider, Content } = Layout;
const DashboardPage = React.lazy(() => import('./dashboard/index') as any);
const DataPage = React.lazy(() => import('./data/index') as any);
const ScriptsPage = React.lazy(() => import('./scripts/index') as any);
const SettingsPage = React.lazy(() => import('./settings/index') as any);
const ExecutionPage = React.lazy(() => import('./execution/index') as any);

interface ProjectQueryResult {
    output: {
        name: string;
    };
}

export interface Params {
    id: string;
}

export interface State extends PageState {
    collapsed: boolean;
}

export interface Props extends PageProps<Params> {}

export default class ProjectPage extends Page<Params, Props, State> {
    private readonly __routes: RouteConfig[];
    private readonly __routeNames: { [path: string]: string };

    constructor(props: Props) {
        super(props, {
            collapsed: false,
        });

        this.__handleMenuCollapseChange = this.__handleMenuCollapseChange.bind(
            this,
        );
        this.__routes = [
            {
                path: `${props.match.url}/dashboard`,
                label: 'Dasboard',
                icon: 'dashboard',
                component: DashboardPage,
            },
            {
                path: `${props.match.url}/scripts`,
                label: 'Scripts',
                icon: 'file',
                component: ScriptsPage,
            },
            {
                path: `${props.match.url}/exec`,
                label: 'Execution',
                icon: 'rocket',
                component: ExecutionPage,
            },
            {
                path: `${props.match.url}/data`,
                label: 'Data',
                icon: 'database',
                component: DataPage,
            },
            {
                path: `${props.match.url}/settings`,
                label: 'Settings',
                icon: 'setting',
                component: SettingsPage,
            },
        ];
        this.__routeNames = {
            '/home/projects': 'Projects',
            [props.match.url]: props.match.params.id,
            [`${props.match.url}/dashboard`]: 'Dasboard',
            [`${props.match.url}/scripts`]: 'Scripts',
            [`${props.match.url}/exec`]: 'Execution',
            [`${props.match.url}/data`]: 'Data',
            [`${props.match.url}/settings`]: 'Settings',
        };

        this.__renderBreadcrumb = this.__renderBreadcrumb.bind(this);
        this.__renderRoutes = this.__renderRoutes.bind(this);
    }

    public render(): any {
        const showText = !this.state.collapsed;
        const selected = this.__currentTabKey();
        const variables = {
            id: this.getParam('id'),
        };

        return (
            <Layout className={css.layout}>
                <Sider collapsible onCollapse={this.__handleMenuCollapseChange}>
                    <Icon type="caret-left" />
                    <Menu
                        theme="dark"
                        className={css.menu}
                        selectedKeys={[selected]}
                    >
                        {this.__routes.map(
                            (config: RouteConfig, idx: number) => {
                                const key = idx.toString();

                                return (
                                    <Menu.Item key={key}>
                                        <Link to={config.path}>
                                            <Icon type={config.icon} />
                                            {showText ? config.label : null}
                                        </Link>
                                    </Menu.Item>
                                );
                            },
                        )}
                    </Menu>
                    <Menu theme="dark" className={css.bottomMenu}>
                        <Menu.Item>
                            <Icon type="logout" />
                            <span>Logout</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className={css.contentLayout}>
                    <Query query={getQuery} variables={variables}>
                        {this.__renderBreadcrumb}
                    </Query>
                    <Content className={css.content}>
                        <Row>
                            <Col lg={24}>{this.__renderRoutes()}</Col>
                        </Row>
                    </Content>
                </Layout>
            </Layout>
        );
    }

    private __currentTabKey(): string {
        const { location } = this.props;

        const found = this.__routes.findIndex(i =>
            startsWith(location.pathname, i.path),
        );

        return found ? found.toString() : '0';
    }

    private __renderBreadcrumb({ data }: QueryResult<ProjectQueryResult>): any {
        const props = this.props;

        const BreadcrumbsItem = ({ match }: RouteComponentProps) => {
            let title =
                this.__routeNames[match.url] || (match.params as any).path;
            let item;

            if (props.match.params.id === title && data && data.output) {
                title = data.output.name;
            }

            if (match.isExact) {
                item = title;
            } else {
                item = <Link to={match.url}>{title}</Link>;
            }

            return (
                <>
                    <Breadcrumb.Item>{item}</Breadcrumb.Item>
                    <Route
                        path={`${match.url}/:path`}
                        component={BreadcrumbsItem}
                    />
                </>
            );
        };

        return (
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Route path="/home/:path" component={BreadcrumbsItem} />
            </Breadcrumb>
        );
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
                        const Component: React.SFC<
                            any
                        > = config.component as any;
                        const projectId = this.getParam('id');

                        return (
                            <Route
                                key={config.path}
                                path={config.path}
                                component={(props: any) => {
                                    return (
                                        <Component
                                            {...props}
                                            project={projectId}
                                        />
                                    );
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
