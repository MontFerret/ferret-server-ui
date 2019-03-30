import { Alert, Col, Form, Input, Row, Spin } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import get from 'lodash/get';
import React from 'react';
import { ScriptEntity } from '../../../../../../models/api/model/scriptEntity';
import DescriptionField from '../../../../../common/form/fields/descr';
import NameField from '../../../../../common/form/fields/name';
import FormContainer from '../../../../../common/form/form';

const { TextArea } = Input;

export interface Props extends FormComponentProps {
    loading: boolean;
    script?: ScriptEntity;
    error?: Error;
    onBack?: () => void;
    onSave?: (newValues: ScriptEntity) => void;
    onDelete?: () => void;
}

interface State {
    rev?: string;
}

class ScriptEditForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            rev: props.script ? props.script.rev : undefined,
        };
    }

    public render(): any {
        const {
            form,
            error,
            loading,
            script = { name: 'New script' } as ScriptEntity,
            onBack,
            onSave,
            onDelete,
        } = this.props;
        const { getFieldDecorator } = form;

        return (
            <Spin spinning={loading}>
                <FormContainer
                    id={script ? script.id : 'new'}
                    rev={script ? script.rev : ''}
                    form={form}
                    error={error}
                    title={script ? script.name : 'New script'}
                    onBack={onBack}
                    onSave={onSave}
                    onDelete={onDelete}
                >
                    <Row gutter={16}>
                        <Col lg={12}>
                            <fieldset>
                                <legend>General</legend>
                                <NameField form={form} value={script.name} />
                                <DescriptionField form={form} value={script.description} />
                            </fieldset>
                        </Col>
                        <Col lg={12}>
                            <fieldset>
                                <legend>Persistence</legend>
                                <Form.Item label="Enable">
                                    {getFieldDecorator('persistence.enabled', {
                                        initialValue: get(script, 'persistence.enabled', false),
                                    })(
                                        <Input type="checkbox" />,
                                    )}
                                </Form.Item>
                            </fieldset>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={24}>
                            <Form.Item
                                label="Query"
                            >
                                {getFieldDecorator('execution.query', {
                                    initialValue: get(script, 'execution.query'),
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Input script query',
                                        },
                                    ],
                                })(
                                    <TextArea rows={10} />,
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </FormContainer>
            </Spin>
        );
    }
}

export default Form.create({ name: 'script_edit_form ' })(ScriptEditForm);
