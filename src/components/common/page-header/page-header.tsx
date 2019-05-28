import { PageHeader as Header } from 'antd';
import { PageHeaderProps } from 'antd/lib/page-header';
import cn from 'classnames';
import React from 'react';
const css = require('./page-header.module.scss');

export interface Props extends PageHeaderProps {}

export const PageHeader = React.memo<Props>((props: Props) => {
    return <Header {...props} className={cn(css.ph, props.className)} />;
});
