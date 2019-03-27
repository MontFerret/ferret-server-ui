import { Button, Col, Dropdown, Form, Icon, Menu, Row } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import React from 'react';
import Search from '../search/search';
const css = require('./panel.module.scss');

const FormItem = Form.Item;
const MenuItem = Menu.Item;

function buildAction(item: Action, index: number): any {
    if (isEmpty(item.icon) === true) {
        return (
            <MenuItem key={index + 1}>
                <span>{item.text}</span>
            </MenuItem>
        );
    }

    return (
        <MenuItem key={index + 1}>
            <Icon type={item.icon} />
            <span>    {item.text}</span>
        </MenuItem>
    );
}

function buildActionsMenu(actions?: Action[], handler?: (param: ClickParam) => void): any {
    if (actions == null || actions.length === 0) {
        return null;
    }

    return (
        <Menu onClick={handler}>
            {map(actions, buildAction)}
        </Menu>
    );
}

export type ActionHandler = (idx: number) => void;

export interface Action {
    id: string;
    text: string;
    icon: string;
}

export interface Props {
    className?: string;
    actions?: Action[];
    onAction?: ActionHandler;
    onSearch?: (value: string) => any;
}

interface State {
    actionsMenu: any;
}

export default class Panel extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.__handleActionClick = this.__handleActionClick.bind(this);
        this.state = {
            actionsMenu: buildActionsMenu(props.actions, this.__handleActionClick),
        };
    }

    public componentWillReceiveProps(nextProps: Props): void {
        if (this.props.actions !== nextProps.actions) {
            this.setState({
                actionsMenu: buildActionsMenu(nextProps.actions, this.__handleActionClick),
            });
        }
    }

    public renderActions(): any {
        const { actionsMenu } = this.state;

        if (actionsMenu == null) {
            return null;
        }

        return (
            <Dropdown overlay={actionsMenu}>
                <Button>
                    Actions <Icon type="down" />
                </Button>
            </Dropdown>
        );
    }

    public render(): any {
        return (
            <Row
                className={css.panel}
                type="flex"
                align="top"
                justify="space-between"
            >
                <Col lg={6}>
                    <Search
                        placeholder="Search"
                        dataSource={[]}
                        onSearch={this.props.onSearch}
                    />
                </Col>
                <Col lg={2}>
                    {this.renderActions()}
                </Col>
            </Row>
        );
    }

    private __handleActionClick(param: ClickParam): void {
        if (this.props.onAction != null) {
            this.props.onAction(parseFloat(param.key) - 1);
        }
    }
}
