import { Dropdown, Icon, Menu } from 'antd';
import React, { SFC } from 'react';

// interface Props {

// }

function FormToolbar(_: any): any {
    const items: Array<React.ReactElement<any>> = [];
    const menu = (
        <Menu>
            {items}
        </Menu>
    );

    return (
        <Dropdown
            overlay={menu}
        >
            Actions <Icon type="ellipsis" />
        </Dropdown>
    );
}

export default FormToolbar as SFC;
