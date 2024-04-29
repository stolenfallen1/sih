export const useServicesTab = (type:any) => {
    if (type == '1') {
        const items = [
            {
                label: "Item .Service Details",
                icon: "mdi-file-document-edit",
                form: "",
                rule: "",
            },
            {
                label: "Item Composition",
                icon: "mdi-file-document-edit",
                form: "MFItemComposition",
                rule: "",
            },
            {
                label: "Manage Departmental Access",
                icon: "mdi-file-document-edit",
                form: "MFManageDepartmentalAccess",
                rule: "",
            },
            {
                label: "Manage Item Prices",
                icon: "mdi-file-document-edit",
                form: "MFManageItemPrices",
                rule: "",
            },
            {
                label: "Manage Item Discounts",
                icon: "mdi-file-document-edit",
                form: "MFManageItemDiscounts",
                rule: "",
            },
            {
                label: "Update Item Selling Price",
                icon: "mdi-file-document-edit",
                form: "MFUpdateItemSellingPrice",
                rule: "",
            },
            {
                label: "Consultant Reader List",
                icon: "mdi-file-document-edit",
                form: "MFConsultantReaderList",
                rule: "",
            },
            {
                label: "Medical Packages",
                icon: "mdi-file-document-edit",
                form: "MFMedicalPackages",
                rule: "",
            },
            {
                label: "Result Entries per Item",
                icon: "mdi-file-document-edit",
                form: "MFResultEntriesPerItem",
                rule: "",
            },
            {
                label: "Result Entries in General",
                icon: "mdi-file-document-edit",
                form: "MFResultEntriesInGeneral",
                rule: "",
            },
            {
                label: "Item Manufacturer",
                icon: "mdi-file-document-edit",
                form: "MFItemManufacturer",
                rule: "",
            },
        ]
        return items;
    } else if (type == '2') {
        const items = [
            {
                label: "Item .Service Details",
                icon: "mdi-file-document-edit",
                form: "",
                rule: "",
            },
            {
                label: "Item Composition",
                icon: "mdi-file-document-edit",
                form: "MFItemComposition",
                rule: "",
            },
            {
                label: "Manage Departmental Access",
                icon: "mdi-file-document-edit",
                form: "MFManageDepartmentalAccess",
                rule: "",
            },
            {
                label: "Manage Item Prices",
                icon: "mdi-file-document-edit",
                form: "MFManageItemPrices",
                rule: "",
            },
            {
                label: "Manage Item Discounts",
                icon: "mdi-file-document-edit",
                form: "MFManageItemDiscounts",
                rule: "",
            },
            {
                label: "Update Item Selling Price",
                icon: "mdi-file-document-edit",
                form: "MFUpdateItemSellingPrice",
                rule: "",
            },
            {
                label: "Medical Packages",
                icon: "mdi-file-document-edit",
                form: "MFMedicalPackages",
                rule: "",
            },
            {
                label: "Result Entries in General",
                icon: "mdi-file-document-edit",
                form: "MFResultEntriesInGeneral",
                rule: "",
            },
            {
                label: "Item Manufacturer",
                icon: "mdi-file-document-edit",
                form: "MFItemManufacturer",
                rule: "",
            },
        ]
        return items;
    }
}