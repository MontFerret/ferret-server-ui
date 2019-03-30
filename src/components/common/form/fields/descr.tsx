import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';

const { TextArea } = Input;

export interface Props extends FormComponentProps {
    value?: string;
}

export default function DescriptionField({ form, value = '' }: Props): any {

    return (
        <Form.Item
            label="Description"
        >
            {form.getFieldDecorator('description', {
                initialValue: value,
                rules: [
                    {
                        min: 10,
                    },
                ],
            })(
                <TextArea rows={3} />,
            )}
        </Form.Item>
    );
}
