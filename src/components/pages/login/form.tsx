import { Button, Form, Icon, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import { Credentials } from '../../../models/auth/credentials';
const css = require('./form.module.scss');

const FormItem = Form.Item;

function hasErrors(fieldsError: any): boolean {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

interface InnerProps extends Props, FormComponentProps {}

export interface Props {
    username: string;
    onSubmit: (cred: Credentials) => void;
}

class LoginForm extends React.Component<InnerProps> {
    constructor(props: InnerProps) {
        super(props);

        this.__onSubmit = this.__onSubmit.bind(this);
    }

    public __renderUsernameInput(): any {
        return (
            <Input
                prefix={<Icon type="user" className={css.inputIcon} />}
                placeholder="Username"
            />
        );
    }

    public __renderPasswordInput(): any {
        return (
            <Input
                prefix={<Icon type="lock" className={css.inputIcon} />}
                type="password"
                placeholder="Password"
            />
        );
    }

    public render(): any {
        const {
            getFieldDecorator,
            getFieldError,
            getFieldsError,
            isFieldTouched,
        } = this.props.form;

        // Only show error after a field is touched.
        const userNameError =
            isFieldTouched('username') && getFieldError('username');
        const passwordError =
            isFieldTouched('password') && getFieldError('password');

        return (
            <Form className={css.form} onSubmit={this.__onSubmit}>
                <FormItem
                    validateStatus={userNameError ? 'error' : 'success'}
                    help={userNameError || ''}
                >
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ],
                    })(this.__renderUsernameInput())}
                </FormItem>

                <FormItem
                    validateStatus={passwordError ? 'error' : 'success'}
                    help={passwordError || ''}
                >
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ],
                    })(this.__renderPasswordInput())}
                </FormItem>

                <FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className={css.button}
                        disabled={hasErrors(getFieldsError())}
                    >
                        Log in
                    </Button>
                </FormItem>
            </Form>
        );
    }

    private __onSubmit(e: React.SyntheticEvent): void {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values);
            }
        });
    }
}

export default (Form.create()(LoginForm) as any) as React.SFC<Props>;
