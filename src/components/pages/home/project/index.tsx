import { Breadcrumb, Icon, Layout, Menu } from 'antd';
import gql from 'graphql-tag';
import React, { Suspense } from 'react';
import { Query, QueryResult } from 'react-apollo';
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

const projectQuery = gql`
    query projectName($projectId: String!) {
        project(projectId: $projectId) @rest(type: "Project", path: "/projects/{args.projectId}") {
            name
        }
    }
`;

interface ProjectQueryResult {
    project: {
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
    private readonly __routesLookup: { [path: string]: string};

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
        this.__routesLookup = this.__routes.reduce((res: any, curr: RouteConfig, idx: number) => {
            const out = res;
            out[curr.path] = (idx + 1).toString();

            return out;
        },                                         {});
    }

    public render(): any {
        const { match, location } = this.props;
        let redirect;

        if (location.pathname === match.url) {
            redirect = <Redirect to={`${match.url}/dashboard`} />;
        }

        const showText = !this.state.collapsed;
        const selected = this.__routesLookup[location.pathname];
        const variables = {
            projectId: this.getParam('id'),
        };

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
                            const key = idx + 1;

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
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Query query={projectQuery} variables={variables}>
                        {this.__renderBreadcrumb}
                    </Query>
                    <Content>
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
                                            component={(props: any) => <Component {...props} project={projectId} />}
                                        />
                                    );
                                })}
                            </Switch>
                        </Suspense>
                    </Content>
                </Layout>
            </Layout>
        );
    }

    private __renderBreadcrumb({ data }: QueryResult<ProjectQueryResult>): any {
        let name = '?';

        if (data != null && data.project != null) {
            name = data.project.name;
        }

        return (
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><Link to="/home/projects">Projects</Link></Breadcrumb.Item>
                <Breadcrumb.Item>{name}</Breadcrumb.Item>
            </Breadcrumb>
        );
    }

    private __handleMenuCollapseChange(collapsed: boolean): void {
        this.setState({
            collapsed,
        });
    }
}
