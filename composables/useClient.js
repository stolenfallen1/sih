// composables/useClient.js
export const useClient = () => {
    return {
        isClient: process.client,
    };
};
