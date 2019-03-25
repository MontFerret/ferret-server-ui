export interface Route {
    path: string;
    label: string;
    icon: string;
    component: React.ComponentClass | React.SFC;
}
