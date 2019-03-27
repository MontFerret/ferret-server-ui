import { Button, Col, Row } from 'antd';
import React from 'react';

const css = require('./panel.module.scss');

export default class FormPanel extends React.Component {
    public render(): any {
        return (
            <Row>
                <Col lg={24}>
                    <Button
                        className={css.button}
                        icon="close"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        className={css.button}
                        icon="save"
                    >
                        Save
                    </Button>
                </Col>
            </Row>
        );
    }
}
