import { Button, Dropdown, Icon, Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import React from 'react';
const css = require('./panel.module.scss');

const MenuItem = Menu.Item;

function buildAction({
    icon,
    text,
}: Action,           idx: number): any {
    if (isEmpty(icon) === true) {
        return (
            <MenuItem key={idx + 1}>
                <span>{text}</span>
            </MenuItem>
        );
    }

    return (
        <MenuItem key={idx}>
            <Icon type={icon} />
            <span>{text}</span>
        </MenuItem>
    );
}

function buildActionsMenu(actions: Action[], handler: (param: ClickParam) => void): any {
    if (actions == null || actions.length === 0) {
        return null;
    }

    return (
        <Menu onClick={handler}>
            {map(actions, buildAction)}
        </Menu>
    );
}

export type ActionHandler = () => void;

export interface Action {
    id: string;
    text: string;
    icon: string;
}

export interface Props {
    title?: string;
    actions: Action[];
    handlers: { [id: string]: ActionHandler };
}

interface State {
    actionsMenu: any;
}

export default class ActionPanel extends React.Component<Props, State> {
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

    public __renderIcon(): any {
        const {
            title,
        } = this.props;

        if (!title) {
            return <Icon type="ellipsis" />;
        }

        return (
            <React.Fragment>
                {title} <Icon type="ellipsis" />
            </React.Fragment>
        );
    }

    public render(): any {
        const { actionsMenu } = this.state;

        if (actionsMenu == null) {
            return null;
        }

        return (
            <Dropdown
                overlay={actionsMenu}
            >
                <Button
                    className={css.btn}
                >
                    {this.__renderIcon()}
                </Button>
            </Dropdown>
        );
    }

    private __handleActionClick(param: ClickParam): void {
        const idx = parseFloat(param.key);
        const action = this.props.actions[idx];

        if (action != null) {
            const handler = this.props.handlers[action.id];

            if (handler != null) {
                handler();
            }
        }
    }
}
