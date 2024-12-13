export const useNodeAPI = () => {
    const config = useRuntimeConfig();
    return config.public.nodeAPI;
}