import InputsValidator from './Validate';
import Order from './IOrder';

export const orders: Order[] = [
    {
        id: 1,
        date: '12.10.2011',
        type: 'mix',
        packageQuantity: 9,
        price: 10.14,
        checked: false,
    },
    {
        id: 2,
        date: '13.11.2011',
        type: 'standard',
        packageQuantity: 7,
        price: 15.63,
        checked: false,
    },
    {
        id: 3,
        date: '02.03.2011',
        type: 'mix',
        packageQuantity: 22,
        price: 10.14,
        checked: false,
    },
    {
        id: 4,
        date: '23.06.2011',
        type: 'standard',
        packageQuantity: 19,
        price: 11.11,
        checked: false,
    },
];

export const initialValidatorState: InputsValidator[] = [
    {
        id: 1,
        packageQuantityValidator: {isValid: true},
        priceValidator: {isValid: true},
    },
    {
        id: 2,
        packageQuantityValidator: {isValid: true},
        priceValidator: {isValid: true},
    },
    {
        id: 3,
        packageQuantityValidator: {isValid: true},
        priceValidator: {isValid: true},
    },
    {
        id: 4,
        packageQuantityValidator: {isValid: true},
        priceValidator: {isValid: true},
    },
];