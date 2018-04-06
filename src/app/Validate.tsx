export interface Validate {
    isValid: boolean;
    errorMessage?: string;
}

export default interface InputsValidator {
    id: number;
    packageQuantityValidator: Validate;
    priceValidator: Validate;
}