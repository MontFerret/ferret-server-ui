import { Order } from './order';

export interface SortingItem {
    name: string;
    order: Order;
}

export interface Sorting {
    readonly columns: SortingItem[];
}
