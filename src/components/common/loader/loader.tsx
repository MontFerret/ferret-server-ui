import { Spin } from 'antd';
import React from 'react';
const css = require('./loader.module.scss');

export interface Props {
    show?: boolean;
    size?: 'small' | 'default' |'large';
}

export default ({ size, show: loading = true }: Props) => {
    return (
        <div className="background">
            <Spin className={css.spinner} spinning={loading} size={size} />
        </div>
    );
};
