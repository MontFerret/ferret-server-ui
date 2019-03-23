export default interface Class {
    [prop: string]: any;
    name: string;
    new (...args: any[]): any;
}
