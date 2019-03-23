export enum Order {
    Asc = 'ASC',
    Desc = 'DESC',
}

export function fromString(value: string): Order {
    if (value === 'descend') {
        return Order.Desc;
    }

    return Order.Asc;
}
