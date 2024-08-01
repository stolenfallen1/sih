export const useStatus = async (Status: String) => {
    const response = await useMethod("get", "get-his-status", "", "");
    if (response) {
        const filteredResponse = response.filter((item: any) => item.Status_description === Status);
        return filteredResponse;
    }
    return [];
}