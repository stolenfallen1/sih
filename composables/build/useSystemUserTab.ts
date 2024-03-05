export const useSystemUserTab = (type:any) => {
  
    if(type == 'one'){
        const items = [
            {
                label: "Nurse Stations",
                icon: "mdi-file-document",
                path: "/system-settings/system-users/nurse-stations",
                form: "NurseStationDialog",
            },
            {
                label: "Reports",
                icon: "mdi-file-document",
                path: "/system-settings/system-users/reports",
                form: "NurseStationDialog",
            },
        ]
        return items;
    }else if(type == 'two'){
       const items = [
            {
                label: "Modules",
                icon: "mdi-table-large",
                form: "ModuleDialog",
                path: "/system-settings/system-users/modules",
            },
            {
                label: "Reports",
                icon: "mdi-file-document",
                path: "/system-settings/system-users/reports",
                form: "NurseStationDialog",
            },
        ]
        return items;
    }
}