import { Button, Icon, Layout, Menu } from 'antd';
import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
const css = require('./sidebar.module.scss');

const { Sider } = Layout;
const { SubMenu } = Menu;

export interface Props {
    baseUrl: string;
}

export default class Sidebar extends React.PureComponent<Props> {
    public render(): any {
        const { baseUrl } = this.props;

        return (
            <Sider className={css.sider}>
                <Menu
                    theme="dark"
                    mode="inline"
                    className={css.siderMenu}
                    defaultSelectedKeys={['4']}
                    defaultOpenKeys={['gov']}
                >
                    <SubMenu key="catalog" title={<span><Icon type="book" />Catalog</span>}>
                        <Menu.Item key="1">
                            <Link to={`${baseUrl}/catalog/brands`}>
                                Brands
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={`${baseUrl}/catalog/products`}>
                                Products
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to={`${baseUrl}/catalog/chemicals`}>
                                Chemicals
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="4">
                        <Link to={`${baseUrl}/users`}>
                            <Icon type="idcard" />
                            Users
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}
