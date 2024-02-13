export default [
    {
        label: "Master Files",
        active: true,
        rule: "browse_masterfiles",
        child: [
            {
                label: "Patients",
                icon: "mdi-account-injury-outline",
                path: "/master-file/patients",
                rule: "browse_patients",
                subcomponents: [],
            },
            {
                label: "Consultants",
                icon: "mdi-doctor",
                path: "/master-file/consultants",
                rule: "browse_consultants",
                subcomponents: [],
            },
            {
                label: "Rooms and Beds",
                icon: "mdi-bed-outline",
                path: "/master-file/rooms-beds",
                rule: "browse_roomsandbeds",
                subcomponents: [
                    {
                        label: "Room Details",
                        icon: "mdi-file-document-edit",
                        path: "/system-settings/system-users/modules",
                        rule: "browse_roomdetails",
                    },
                    {
                        label: "Room Occupants",
                        icon: "mdi-file-document-edit",
                        path: "/system-settings/system-users/modules",
                        rule: "browse_roomoccupants",
                    },
                ],
                processing_and_queries: [],
                table_and_template: [
                    {
                        label: "Buildings & Floor",
                        icon: "mdi-file-document-edit",
                        path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "browse_roomdetails",
                    },
                    {
                        label: "Nursing Station & Ward",
                        icon: "mdi-file-document-edit",
                        path: "/master-file/rooms-beds/table-template/stations-wards",
                        rule: "browse_roomoccupants",
                    },
                    // {
                    //     label: "Room Occupants",
                    //     icon: "mdi-file-document-edit",
                    //     path: "/system-settings/system-users/modules",
                    //     rule: "browse_roomoccupants",
                    // },
                    {
                        label: "Room Types",
                        icon: "mdi-file-document-edit",
                        path: "/master-file/rooms-beds/table-template/room-types",
                        rule: "browse_roomoccupants",
                    },
                    {
                        label: "Room Charge",
                        icon: "mdi-file-document-edit",
                        path: "/master-file/rooms-beds/table-template/room-charge",
                        rule: "browse_roomoccupants",
                    },
                    {
                        label: "Room Price",
                        icon: "mdi-file-document-edit",
                        path: "/master-file/rooms-beds/table-template/room-price",
                        rule: "browse_roomoccupants",
                    },
                    {
                        label: "Room Status",
                        icon: "mdi-file-document-edit",
                        path: "/master-file/rooms-beds/table-template/room-status",
                        rule: "browse_roomoccupants",
                    },
                    {
                        label: "Room Usage",
                        icon: "mdi-file-document-edit",
                        path: "/master-file/rooms-beds/table-template/room-usage",
                        rule: "browse_roomoccupants",
                    },
                    {
                        label: "Bed Status",
                        icon: "mdi-file-document-edit",
                        path: "/master-file/rooms-beds/table-template/bed-status",
                        rule: "browse_roomoccupants",
                    },
                ],
            },
            {
                label: "Services",
                icon: "mdi-account-wrench-outline",
                path: "/master-file/services",
                rule: "browse_proceduresandservices",
                subcomponents: [
                    {
                        label: "Item .Service Details",
                        icon: "mdi-file-document-edit",
                        // path: "/system-settings/system-users/modules",
                        rule: "",
                    },
                    {
                        label: "Item Composition",
                        icon: "mdi-file-document-edit",
                        // path: "/system-settings/system-users/modules",
                        rule: "",
                    },
                    {
                        label: "Manage Departmental Access",
                        icon: "mdi-file-document-edit",
                        // path: "/system-settings/system-users/modules",
                        rule: "",
                    },
                    {
                        label: "Manage Item Prices",
                        icon: "mdi-file-document-edit",
                        // path: "/system-settings/system-users/modules",
                        rule: "",
                    },
                    {
                        label: "Manage Item Discounts",
                        icon: "mdi-file-document-edit",
                        // path: "/system-settings/system-users/modules",
                        rule: "",
                    },
                    {
                        label: "Update Item Selling Price",
                        icon: "mdi-file-document-edit",
                        // path: "/system-settings/system-users/modules",
                        rule: "",
                    },
                    {
                        label: "Medical Packages",
                        icon: "mdi-file-document-edit",
                        // path: "/system-settings/system-users/modules",
                        rule: "",
                    },
                    {
                        label: "Item Manufacturer",
                        icon: "mdi-file-document-edit",
                        // path: "/system-settings/system-users/modules",
                        rule: "",
                    },
                ],
                processing_and_queries: [
                    {
                        label: "Borrowed Items",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Generate Prices and Discounts",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/stations-wards",
                        rule: "",
                    },
                    {
                        label: "EDPMS Drug Code Mapping",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/room-types",
                        rule: "",
                    },
                ],
                table_and_template: [
                    {
                        label: "Billing Report Categories",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Collection Report Main Header",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Collection Report Group Header",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "CPT Modifiers",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "CPT Sections",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "CPT Sub-Sections",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Department Groups",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "DEpartment .Warehouses",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Dosages",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Drug Administration Group",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "DOH Drug List",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "DX Medical Packages",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Generic Names",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Indications",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Indications",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Item Categories",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Item Price Groups",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Item Pricing Schemes",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Item Templates",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Item Units",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Medication Durations",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Medication Frequencies",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Medication Preparations",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Routes",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "PHIC Item Categories",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Unit of Measures",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Modalities",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Specimens",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Others",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                ],
            },
            {
                label: "Items and Supplies",
                icon: "mdi-invoice-list-outline",
                path: "/master-file/items-supplies",
                rule: "browse_itemsandsupplies",
                subcomponents: [
                    {
                        label: "Item .Service Details",
                        icon: "mdi-file-document-edit",
                        // path: "/system-settings/system-users/modules",
                        rule: "",
                    },
                    {
                        label: "Manage Department Access",
                        icon: "mdi-file-document-edit",
                        // path: "/system-settings/system-users/modules",
                        rule: "",
                    },
                    {
                        label: "Manage Item Prices",
                        icon: "mdi-file-document-edit",
                        // path: "/system-settings/system-users/modules",
                        rule: "",
                    },
                    {
                        label: "Manage Item Discounts",
                        icon: "mdi-file-document-edit",
                        // path: "/system-settings/system-users/modules",
                        rule: "",
                    },
                    {
                        label: "Update Item Selling Price",
                        icon: "mdi-file-document-edit",
                        // path: "/system-settings/system-users/modules",
                        rule: "",
                    },
                    {
                        label: "Medical Packages",
                        icon: "mdi-file-document-edit",
                        // path: "/system-settings/system-users/modules",
                        rule: "",
                    },
                    {
                        label: "Item Manufacturer",
                        icon: "mdi-file-document-edit",
                        // path: "/system-settings/system-users/modules",
                        rule: "",
                    },
                ],
                processing_and_queries: [
                    {
                        label: "Borrowed Items",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Generate Prices and Discounts",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/stations-wards",
                        rule: "",
                    },
                    {
                        label: "EDPMS Drug Code Mapping",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/room-types",
                        rule: "",
                    },
                ],
                table_and_template: [
                    {
                        label: "Billing Report Categories",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Collection Report Main Header",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Collection Report Group Header",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "CPT Modifiers",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "CPT Sections",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "CPT Sub-Sections",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Department Groups",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "DEpartment .Warehouses",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Dosages",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Drug Administration Group",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "DOH Drug List",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "DX Medical Packages",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Generic Names",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Indications",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Indications",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Item Categories",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Item Price Groups",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Item Pricing Schemes",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Item Templates",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Item Units",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Medication Durations",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Medication Frequencies",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Medication Preparations",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Routes",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "PHIC Item Categories",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Unit of Measures",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Modalities",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Specimens",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                    {
                        label: "Others",
                        icon: "mdi-file-document-edit",
                        // path: "/master-file/rooms-beds/table-template/buildings-floors",
                        rule: "",
                    },
                ],
            },
        ],
    },
    {
        label: "Services",
        active: true,
        rule: "browse_services",
        child: [
            {
                label: "Out Patients",
                icon: "mdi-account",
                path: "/services/out-patient",
                rule: "browse_outpatients",
                subcomponents: [],
            },
            {
                label: "Emergency",
                icon: "mdi-ambulance",
                path: "/services/emergency",
                rule: "browse_emergencies",
                subcomponents: [],
            },
            {
                label: "In Patients",
                icon: "mdi-account-check",
                path: "/services/in-patient",
                rule: "browse_inpatients",
                subcomponents: [],
            },
            {
                label: "Ancillary Services",
                icon: "mdi-radar",
                path: "/services/ancillary-services",
                // rule: "browse_ancillaryservices", no rule like this yet
                subcomponents: [],
            },
            {
                label: "Dietary Services",
                icon: "mdi-food-fork-drink",
                path: "/services/dietary-services",
                rule: "browse_dietaryservices",
                subcomponents: [],
            },
            {
                label: "Nursing Services",
                icon: "mdi-medical-bag",
                path: "/services/nursing-services",
                rule: "browse_nursingservices",
                subcomponents: [],
            },
            {
                label: "Laboratory Services",
                icon: "mdi-needle",
                path: "/services/laboratory-services",
                rule: "browse_laboratorservices",
                subcomponents: [],
            },
            {
                label: "Radiology Services",
                icon: "mdi-skull-scan-outline",
                path: "/services/radiology-services",
                rule: "browse_radiologyservices",
                subcomponents: [],
            },
        ],
    },
    {
        label: "Transactions",
        active: true,
        rule: "browse_menus",
        child: [
            {
                label: "Billing",
                icon: "mdi-cash-check",
                path: "/transactions/billing",
                rule: "browse_billing",
                subcomponents: [],
            },
            {
                label: "Cashier",
                icon: "mdi-cash-register",
                path: "/transactions/cashier",
                rule: "browse_cashier",
                subcomponents: [],
            },
            {
                label: "Guarantors Billing",
                icon: "mdi-account-child",
                path: "/transactions/guarantors-billing",
                rule: "browse_guarantorsbilling",
                subcomponents: [],
            },
            {
                label: "Refunds",
                icon: "mdi-cash-edit",
                path: "/transactions/refunds",
                rule: "browse_refunds",
                subcomponents: [],
            },
        ],
    },
    {
        label: "Settings and Others",
        active: true,
        rule: "browse_settingsandothers",
        child: [
            {
                label: "Setup and Options",
                icon: "mdi-server-network",
                path: "/system-settings/setup-options",
                rule: "browse_settingsandothers",
                subcomponents: [],
            },
            {
                label: "System Users",
                icon: "mdi-account-group-outline",
                path: "/system-settings/system-users",
                rule: "browse_users",
                subcomponents: [
                    // {
                    //     label: "Modules",
                    //     icon: "mdi-table-large",
                    //     path: "/system-settings/system-users/modules",
                    // },
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
                ],
                table_and_template:[]
            },
            {
                label: "Report Manager",
                icon: "mdi-chart-bar",
                path: "/system-settings/report-manager",
                // rule: "browse_reports", no rule like this yet
                rule: "browse_settings", // for now so that I can access the page
                subcomponents: [],
            },
        ],
    },
];
