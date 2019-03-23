import { Order } from 'common/models/query/order';

export interface SortingItem {
    name: string;
    order: Order;
}

export interface Sorting {
    readonly columns: SortingItem[];
}
