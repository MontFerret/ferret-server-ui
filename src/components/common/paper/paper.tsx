import Card, { CardProps } from 'antd/lib/card';
import cn from 'classnames';
import React from 'react';
const css = require('./paper.module.scss');

export interface Props extends CardProps {
    depth?: number;
}

export default class Paper extends React.PureComponent<Props> {
    public getDepthClassName(): string {
        if (this.props.depth == null) {
            return css.depth1;
        }

        const className = css[`depth${this.props.depth}`];

        if (className == null) {
            return css.depth1;
        }

        return className;
    }

    public getClassNames(): string {
        return cn(this.getDepthClassName(), css.paper, this.props.className);
    }

    public render(): any {
        return (
            <Card
                actions={this.props.actions}
                bordered={this.props.bordered}
                bodyStyle={this.props.bodyStyle}
                cover={this.props.cover}
                className={this.getClassNames()}
                extra={this.props.extra}
                hoverable={this.props.hoverable}
                loading={this.props.loading}
                tabList={this.props.tabList}
                title={this.props.title}
                type={this.props.type}
                onTabChange={this.props.onTabChange}
            >
                {this.props.children}
            </Card>
        );
    }
}
