import { Alert, Form, Input, Modal, Spin } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
// import every from 'lodash/every';
// import isEmpty from 'lodash/isEmpty';
import React from 'react';
import { ProjectCreate } from '../../../../models/api/model/projectCreate';

const { TextArea } = Input;

interface InnerProps extends Props, FormComponentProps {}

export interface Props {
    visible: boolean;
    loading: boolean;
    error?: string;
    onCreate: (data: ProjectCreate) => void;
    onCancel: () => void;
}

class NewProjectForm extends React.Component<InnerProps> {
    constructor(props: InnerProps) {
        super(props);

        this.__handleOkClick = this.__handleOkClick.bind(this);
        this.__handleCancelClick = this.__handleCancelClick.bind(this);
    }

    public render(): any {
        const { visible, loading, form, error } = this.props;

        const { getFieldDecorator } = form;
        // const isValid = every(getFieldsError(), isEmpty);

        return (
            <Modal
                title="New project"
                centered
                visible={visible}
                okText="Create"
                onOk={this.__handleOkClick}
                onCancel={this.__handleCancelClick}
                okButtonDisabled={loading}
                cancelButtonDisabled={loading}
            >
                <Spin spinning={loading}>
                    {error ? <Alert message={error} type="error" /> : null}
                    <Form>
                        <Form.Item label="Name">
                            {getFieldDecorator('name', {
                                rules: [
                                    {
                                        min: 3,
                                        max: 255,
                                    },
                                    {
                                        required: true,
                                        message: 'Please input project name!',
                                    },
                                ],
                            })(
                                <Input
                                    disabled={loading}
                                    placeholder="Project name"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="Description">
                            {getFieldDecorator('description', {
                                rules: [
                                    {
                                        min: 10,
                                        max: 255,
                                    },
                                ],
                            })(
                                <TextArea
                                    disabled={loading}
                                    placeholder="Project name"
                                />,
                            )}
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        );
    }

    private __handleOkClick(): void {
        const { form } = this.props;

        form.validateFieldsAndScroll((errors: any, values: ProjectCreate) => {
            if (errors == null) {
                this.props.onCreate(values);
            }
        });
    }

    private __handleCancelClick(): void {
        const { form } = this.props;

        form.resetFields();
        this.props.onCancel();
    }
}

export default (Form.create({ name: 'new_project_form' })(
    NewProjectForm,
) as any) as React.SFC<Props>;
