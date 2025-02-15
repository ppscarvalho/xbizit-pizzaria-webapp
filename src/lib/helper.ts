import { OrderItemProps } from '../providers/order';

export function calculateTotalOrder(order: OrderItemProps[]) {
    return order.reduce((total, item) => {
        return total + parseFloat(item.product.price) * Number(item.amount);
    }, 0);
}