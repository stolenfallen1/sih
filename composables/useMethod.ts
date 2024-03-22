export const useMethod = async (method:any, url:any, payload:any, params:any = null, id:any = null) => {

    let apiurl = useApiUrl() + "/" + url;
    
    if(method == 'get'){
        const response = await $fetch(apiurl + params, {
            headers: {
                Authorization: `Bearer ` + useToken(),
            },
        });
        return response;
    }

    if(method == 'post'){
        const response = await $fetch(apiurl, {
            method: "post",
            headers: {
                Authorization: `Bearer `+ useToken(),
                "Content-Type": "application/json",
            },
            body: {
                payload: payload,
            },
        });
        return response;
    }

    if(method == 'put'){
        const response = await $fetch(apiurl+"/"+id, {
            method: "put",
            headers: {
                Authorization: `Bearer `+ useToken(),
                "Content-Type": "application/json",
                },
            body: {
                payload: payload,
            },
        });
        return response;
    }

    if(method == 'delete'){
        const response = await $fetch(apiurl+"/"+id, {
            method: "delete",
            headers: {
                Authorization: `Bearer `+ useToken(),
                "Content-Type": "application/json",
                },
            body: {
                payload: payload,
            },
        });
        return response;
    }
}