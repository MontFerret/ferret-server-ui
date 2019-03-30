import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';

export interface Props extends FormComponentProps {
    value?: string;
    type?: string;
}

export default function NameField({ form, value = '', type = '' }: Props): any {

    return (
        <Form.Item
            label="Name"
        >
            {form.getFieldDecorator('name', {
                initialValue: value,
                rules: [
                    {
                        required: true, message: `Please input ${type} name!`,
                    },
                    {
                        min: 3,
                    },
                ],
            })(
                <Input />,
            )}
        </Form.Item>
    );
}
