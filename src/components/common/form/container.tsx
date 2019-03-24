import { Card, Col, Form, Row, Spin } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React from 'react';
import ActionPanel, { Action } from '../action-panel/panel';
const css = require('./container.module.css');

const ACTIONS_VIEW: Action[] = [
    {
        id: 'edit',
        text: 'Edit',
        icon: 'edit',
    },
    {
        id: 'delete',
        text: 'Delete',
        icon: 'delete',
    },
    {
        id: 'back',
        text: 'Back',
        icon: 'arrow-left',
    },
];

const ACTIONS_EDIT: Action[] = [
    {
        id: 'save',
        text: 'Save',
        icon: 'save',
    },
    {
        id: 'delete',
        text: 'Delete',
        icon: 'delete',
    },
    {
        id: 'cancel',
        text: 'Cancel',
        icon: 'close',
    },
];

export enum FormMode {
    View,
    Edit,
}

export type FormUtils = WrappedFormUtils;

export interface Props<T> {
    title: string;
    loading: boolean;
    data?: T;
    render: (mode: FormMode, helpers: FormUtils, data?: T) => any;
    onSubmit: (data: T) => void;
}

interface InnerProps extends Props<any>, FormComponentProps {}

interface State {
    mode: FormMode;
    actions: Action[];
}

class FormContainer extends React.Component<InnerProps, State> {
    private readonly __actionHandlers: any;
    private readonly __handleSubmit: any;

    constructor(props: InnerProps) {
        super(props);

        this.state = {
            mode: FormMode.View,
            actions: ACTIONS_VIEW,
        };

        this.__actionHandlers = {
            edit: () => {
                this.setState({
                    mode: FormMode.Edit,
                    actions: ACTIONS_EDIT,
                });
            },
            save: () => {
                this.__handleSubmit();
            },
            cancel: () => {
                this.setState({
                    mode: FormMode.View,
                    actions: ACTIONS_VIEW,
                });
            },
        };

        this.__handleSubmit = (evt?: React.FormEvent<any>) => {
            if (evt != null) {
                evt.preventDefault();
            }

            this.props.form.validateFields((err: Error, values: any) => {
                if (!err) {
                    this.props.onSubmit(values);
                }
            });
        };
    }

    public render(): any {
        const {
            title,
            loading,
        } = this.props;

        return (
            <Spin spinning={loading}>
            <Card
                className={css.card}
            >
                <Row type="flex" justify="space-between">
                    <Col
                        lg={4}
                        className={css.header}
                    >
                        <h2>{title}</h2>
                    </Col>
                    <Col
                        lg={4}
                        className={css.actions}
                    >
                        <ActionPanel
                            actions={this.state.actions}
                            handlers={this.__actionHandlers}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col lg={24}>
                        {this.__renderForm()}
                    </Col>
                </Row>
            </Card>
        </Spin>
        );
    }

    private __renderForm(): any {
        const {
            data,
            form,
        } = this.props;
        const {
            mode,
        } = this.state;

        return (
            <Form
                onSubmit={this.__handleSubmit}
            >
                {
                    this.props.render(
                        mode,
                        form,
                        data,
                    )
                }
            </Form>
        );
    }
}

export default (Form.create()(FormContainer as any) as any) as React.ComponentClass<Props<any>>;
