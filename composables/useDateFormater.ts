export const useCurrencyFormatter = (value:any) => {
    return value.toLocaleString('en-PH', {
        style: 'currency',
        currency: 'PHP'
    });
};