import { Card } from 'antd';
import capitalize from 'lodash/capitalize';
import React from 'react';
import { ProjectOutput } from '../../../../models/api/model/projectOutput';

export interface Props {
    item: ProjectOutput;
    onClick: (id: string) => void;
}

export class ListItem extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.__handleClick = this.__handleClick.bind(this);
    }

    public render(): any {
        const { item } = this.props;

        const desc = item.description || `${capitalize(item.name)} project`;

        return (
            <Card
                title={item.name}
                hoverable={true}
                onClick={this.__handleClick}
            >
                {desc}
            </Card>
        );
    }
    private __handleClick(): void {
        this.props.onClick(this.props.item.id);
    }
}
