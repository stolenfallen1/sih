export const usePeso = (price: any, currencyCode = 'PHP', locale = 'en-PH') => {
    const amount = typeof price === 'number' ? price : parseFloat(price);
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
    });
    return formatter.format(amount);
}