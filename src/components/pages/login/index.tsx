import { Card, Col, Row, Spin } from 'antd';
import React from 'react';
import { Page, PageProps } from '../../common/page';
import Form from './form';
const css = require('./index.module.scss');

export interface Props extends PageProps {}

export default class LoginPage extends Page<never, Props> {
    constructor(props: Props) {
        super(props);

        this.__onSubmit = this.__onSubmit.bind(this);
    }

    public render(): any {
        return (
            <div className={css.wrapper}>
                <Row
                    type="flex"
                    align="middle"
                    justify="center"
                    className={css.row}
                >
                    <Col span={5} className={css.column}>
                        <Spin spinning={false}>
                            <Card
                                className={css.card}
                            >
                                <Form
                                    username={''}
                                    onSubmit={this.__onSubmit}
                                />
                            </Card>
                        </Spin>
                    </Col>
                </Row>
            </div>
        );
    }

    private __onSubmit(): void {
        // this.props.context.executeAction(login, cred);
    }
}
