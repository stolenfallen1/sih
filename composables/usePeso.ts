export const usePeso = (price: any, currencyCode = 'PHP', locale = 'en-PH') => {
    const amount = typeof price === 'number' ? price : parseFloat(price);

    // Format the amount without rounding
    const formattedAmount = amount.toLocaleString(locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2, 
    });

    return formattedAmount;
}
