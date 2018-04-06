export interface Order {
    id: number;
    date: string;
    packageQuantity: number;
    price: number;
    type: string;
}

export default interface OrderExt extends Order {
    checked: boolean;
}