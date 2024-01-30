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
                rule: "browse_masterfiles",
                subcomponents: [],
            },
            {
                label: "Consultants",
                icon: "mdi-doctor",
                path: "/master-file/consultants",
                subcomponents: [],
            },
            {
                label: "Rooms and Beds",
                icon: "mdi-bed-outline",
                path: "/master-file/rooms-beds",
                subcomponents: [],
            },
            {
                label: "Items and Supplies",
                icon: "mdi-invoice-list-outline",
                path: "/master-file/items-supplies",
                subcomponents: [],
            },
            {
                label: "Services",
                icon: "mdi-account-wrench-outline",
                path: "/master-file/services",
                subcomponents: [],
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
                subcomponents: [],
            },
            {
                label: "Emergency",
                icon: "mdi-ambulance",
                path: "/services/emergency",
                subcomponents: [],
            },
            {
                label: "In Patients",
                icon: "mdi-account-check",
                path: "/services/in-patient",
                subcomponents: [],
            },
            {
                label: "Ancillary Services",
                icon: "mdi-radar",
                path: "/services/ancillary-services",
                subcomponents: [],
            },
            {
                label: "Dietary Services",
                icon: "mdi-food-fork-drink",
                path: "/services/dietary-services",
                subcomponents: [],
            },
            {
                label: "Nursing Services",
                icon: "mdi-medical-bag",
                path: "/services/nursing-services",
                subcomponents: [],
            },
            {
                label: "Laboratory Services",
                icon: "mdi-needle",
                path: "/services/laboratory-services",
                subcomponents: [],
            },
            {
                label: "Radiology Services",
                icon: "mdi-skull-scan-outline",
                path: "/services/radiology-services",
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
                rule:'browse_billing',
                subcomponents: [],
            },
            {
                label: "Cashier",
                icon: "mdi-cash-register",
                path: "/transactions/cashier",
                subcomponents: [],
            },
            {
                label: "Guarantors Billing",
                icon: "mdi-account-child",
                path: "/transactions/guarantors-billing",
                rule: 'browse_guarantorsbilling',
                subcomponents: [],
            },
            {
                label: "Refunds",
                icon: "mdi-cash-edit",
                path: "/transactions/refunds",
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
                subcomponents: [],
            },
            {
                label: "System Users",
                icon: "mdi-account-group-outline",
                path: "/system-settings/system-users",
                rule: "browse_users",
                subcomponents: [
                    {
                        label: "Modules",
                        icon: "mdi-table-large",
                        path: "/system-settings/system-users/modules",
                    },
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
            },
            {
                label: "Report Manager",
                icon: "mdi-chart-bar",
                path: "/system-settings/report-manager",
                subcomponents: [],
            },
        ],
    },
];
