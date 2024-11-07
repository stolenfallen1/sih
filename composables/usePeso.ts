export const usePeso = (price: any, currencyCode = 'PHP', locale = 'en-PH') => {
    const amount = typeof price === 'number' ? price : parseFloat(price);
    
    if (isNaN(amount)) {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currencyCode,
        }).format(0); 
    }
    
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
    });
    return formatter.format(amount);
};
