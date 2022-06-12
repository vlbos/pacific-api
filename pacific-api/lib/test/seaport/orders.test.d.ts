import { Order, UnhashedOrder } from '../../pacific-js/types';
export declare function testMatchingOrder(order: Order, accountAddress: string, testAtomicMatch?: boolean, referrerAddress?: string): Promise<void>;
export declare function testMatchingNewOrder(unhashedOrder: UnhashedOrder, accountAddress: string, counterOrderListingTime?: number): Promise<void>;
