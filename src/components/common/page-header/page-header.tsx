import { PageHeader } from 'antd';
import { PageHeaderProps } from 'antd/lib/page-header';
import cn from 'classnames';
import React from 'react';
const css = require('./page-header.module.scss');

export default (props: PageHeaderProps) => {
    return <PageHeader {...props} className={cn(css.ph, props.className)} />;
};
