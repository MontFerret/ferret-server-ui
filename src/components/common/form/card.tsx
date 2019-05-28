import { Card } from 'antd';
import cn from 'classnames';
import React from 'react';

const css = require('./card.module.scss');

export interface Props extends React.Props<any> {
    className?: string;
}

export const FormCard = React.memo<Props>(({ children, className }: Props) => {
    return <Card className={cn(css.card, className)}>{children}</Card>;
});
