import { Button, Card, Col, Form, Input, Row, Spin } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import get from 'lodash/get';
import React from 'react';
import { ScriptEntity } from '../../../../../../models/api/model/scriptEntity';
import PageHeader from '../../../../../common/page-header/page-header';
const css = require('./form.module.scss');

const { TextArea } = Input;

export interface Props extends FormComponentProps {
    loading: boolean;
    script?: ScriptEntity;
}

class ScriptEditForm extends React.Component<Props> {
    public render(): any {
        const { form, loading, script = { name: 'New script' } as ScriptEntity } = this.props;
        const { getFieldDecorator } = form;

        return (
            <Spin spinning={loading}>
                <Form>
                    <Card>
                        <PageHeader
                            className={css.ph}
                            title={get(script, 'name')}
                            onBack={() => null}
                            extra={this.__renderButtons()}
                        />
                        <Row>
                            <Col lg={6}>
                                <Form.Item
                                    label="Name"
                                >
                                    {getFieldDecorator('name', {
                                        initialValue: script.name,
                                        rules: [],
                                    })(
                                        <Input />,
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={16}>
                                <Form.Item
                                        label="Description"
                                    >
                                        {getFieldDecorator('description', {
                                            initialValue: script.description,
                                            rules: [],
                                        })(
                                            <TextArea rows={3} />,
                                        )}
                                    </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                    <Card className={css.section}>
                        <Row>
                            <Col lg={24}>
                                <Form.Item
                                        label="Query"
                                    >
                                        {getFieldDecorator('execution.query', {
                                            initialValue: get(script, 'execution.query'),
                                            rules: [],
                                        })(
                                            <TextArea rows={10} />,
                                        )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Form>
            </Spin>
        );
    }

    private __renderButtons(): any {
        return [
            <Button
                key="cancel"
                className={css.button}
                icon="close"
            >
                Cancel
            </Button>,
            <Button
                key="save"
                type="primary"
                className={css.button}
                icon="save"
            >
                Save
            </Button>,
            <Button
                key="delete"
                type="danger"
                className={css.button}
                icon="delete"
            >
                Delete
            </Button>,
        ];
    }
}

export default Form.create({ name: 'script_edit_form ' })(ScriptEditForm);
