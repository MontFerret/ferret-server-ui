import { Checkbox, Col, Form, Input, Row } from 'antd';
import get from 'lodash/get';
import React, { Fragment } from 'react';
import { ScriptEntity } from '../../../../../../models/api/model/scriptEntity';
import {
    createMutation,
    deleteMutation,
    getQuery,
    updateMutation,
} from '../../../../../../queries/script';
import DescriptionField from '../../../../../common/form/fields/descr';
import NameField from '../../../../../common/form/fields/name';
import Container, { FormContext } from '../../../../../common/form/form';
import { Page, PageProps } from '../../../../../common/page';

const { TextArea } = Input;

export interface Params {
    id: string;
}

export interface Props extends PageProps<Params> {
    projectId: string;
}

export default class ScriptDetailsPage extends Page<Params, Props> {
    public render(): any {
        const { projectId } = this.props;
        const scriptId = this.getParam('id');
        const title = (script?: ScriptEntity) => {
            return script ? script.name : '';
        };
        const onBack = () => {
            this.navigate(this.slicePathBack(1));
        };
        const onCreate = (id: string) => {
            const str = this.slicePathBack(1);

            this.navigate(`${str}/${id}`);
        };

        return (
            <Container
                id={scriptId}
                projectId={projectId}
                title={title}
                fetch={getQuery}
                create={createMutation}
                update={updateMutation}
                delete={deleteMutation}
                onCreate={onCreate}
                onDelete={onBack}
                onBack={onBack}
            >
                {({
                    form,
                    value = {} as ScriptEntity,
                }: FormContext<ScriptEntity>) => {
                    const { getFieldDecorator } = form;

                    return (
                        <Fragment>
                            <Row gutter={16}>
                                <Col lg={12}>
                                    <fieldset>
                                        <legend>General</legend>
                                        <NameField form={form} value={value.name} />
                                        <DescriptionField form={form} value={value.description} />
                                    </fieldset>
                                </Col>
                                <Col lg={12}>
                                    <fieldset>
                                        <legend>Persistence</legend>
                                        <Form.Item>
                                            {getFieldDecorator('persistence.enabled', {
                                                valuePropName: 'checked',
                                                initialValue: get(value, 'persistence.enabled', false),
                                            })(
                                                <Checkbox>Enable</Checkbox>,
                                            )}
                                        </Form.Item>
                                    </fieldset>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={24}>
                                    <fieldset>
                                        <legend>Execution</legend>
                                        <Form.Item
                                            label="Query"
                                        >
                                            {getFieldDecorator('execution.query', {
                                                initialValue: get(value, 'execution.query', ''),
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: 'Input script query',
                                                    },
                                                    {
                                                        min: 8,
                                                    },
                                                ],
                                            })(
                                                <TextArea rows={10} minLength={8} required />,
                                            )}
                                        </Form.Item>
                                    </fieldset>
                                </Col>
                            </Row>
                        </Fragment>
                    );
                }}
            </Container>
        );
    }
}
