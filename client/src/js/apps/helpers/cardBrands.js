export const getBrand = (brand) => {

    switch (brand) {
        case 'mastercard':
            return 'MasterCard';
        case 'visa':
            return 'Visa';
        case 'amex':
            return 'American Express';
        case 'discover':
            return 'Discover';
        default:
            return brand;
    }

}

export const getWalletProvider = (provider) => {

    switch (provider) {
        case 'google-pay':
        case 'googlePay':
            return 'Google Pay';

        case 'apple-pay':
        case 'applePay':
            return 'Apple Pay';
    }
}