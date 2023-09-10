export enum OrderStatus {
    CANCELED="CANCELED",
    PENDING="PENDING",
    VALIDATED="VALIDATED",
}
export const orderStatusArray = Object.keys(OrderStatus).map(key=>OrderStatus[key]);