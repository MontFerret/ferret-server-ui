import { Button } from 'antd';
import React from 'react';
import { PageHeader } from '../page-header/page-header';

const css = require('./panel.module.scss');

export interface Props {
    className?: string;
    title: string;
    touched?: boolean;
    valid?: boolean;
    onBack?: () => void;
    onCancel?: () => void;
    onSave?: (input: any) => void;
    onDelete?: () => void;
}

export default class FormPanel extends React.PureComponent<Props> {
    public render(): any {
        const { title, onBack } = this.props;

        return (
            <PageHeader
                title={title}
                onBack={onBack}
                extra={this.__renderButtons()}
            />
        );
    }

    private __renderButtons(): any {
        const { onCancel, onSave, onDelete, touched, valid } = this.props;

        const buttons = [];

        if (typeof onCancel === 'function') {
            buttons.push(
                <Button
                    key="cancel"
                    className={css.button}
                    icon="close"
                    disabled={!touched}
                    onClick={onCancel}
                >
                    Cancel
                </Button>,
            );
        }

        if (typeof onSave === 'function') {
            buttons.push(
                <Button
                    key="save"
                    type="primary"
                    className={css.button}
                    icon="save"
                    disabled={!touched || !valid}
                    onClick={onSave}
                >
                    Save
                </Button>,
            );
        }

        if (typeof onDelete === 'function') {
            buttons.push(
                <Button
                    key="delete"
                    type="danger"
                    className={css.button}
                    icon="delete"
                    onClick={onDelete}
                >
                    Delete
                </Button>,
            );
        }

        return buttons;
    }
}
