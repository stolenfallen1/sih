export const useSystemUserTab = (type:any) => {
  
    if(type == 'one'){
        const items = [
            {
                label: "Nurse Stations",
                icon: "mdi-file-document",
                path: "/system-settings/system-users/nurse-stations",
            },
            {
                label: "Reports",
                icon: "mdi-file-document",
                path: "/system-settings/system-users/reports",
            },
        ]
        return items;
    }else if(type == 'two'){
       const items = [
            {
                label: "Modules",
                icon: "mdi-table-large",
                path: "/system-settings/system-users/modules",
            },
            {
                label: "Reports",
                icon: "mdi-file-document",
                path: "/system-settings/system-users/reports",
            },
        ]
        return items;
    }
}