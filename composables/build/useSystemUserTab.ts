export const useSystemUserTab = (type:any) => {
    if(type == 'one'){
        const items = [
            {
                label: "Nurse Stations",
                icon: "mdi-file-document",
                form: "NurseStationDialog",
            },
            {
                label: "Reports",
                icon: "mdi-file-document",
                form: "document",
            },
        ]
        return items;
    }else if(type == 'two'){
       const items = [
            {
                label: "Modules",
                icon: "mdi-table-large",
                form: "ModuleDialog",
            },
            {
                label: "Reports",
                icon: "mdi-file-document",
                form: "NurseStationDialog",
            },
        ]
        return items;
    }
}