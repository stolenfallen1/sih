export const useRevenueCode = () => {
    const revenueCodeString = localStorage.getItem("user_details");
    
    // Check if userDetailsString is not null
    if (revenueCodeString) {
        let revenue_code = JSON.parse(revenueCodeString);
        return revenue_code.RevenueCode;
    }

    // Return undefined or a default value if user_details is not found
    return undefined;
}