export const usePasscode = () => {
    const userDetailsString = localStorage.getItem("user_details");
    
    // Check if userDetailsString is not null
    if (userDetailsString) {
        let userdetails = JSON.parse(userDetailsString);
        return userdetails.passcode;
    }

    // Return undefined or a default value if user_details is not found
    return undefined;
}
