export default [
    {
        label: "Master Files",
        active: true,
        rule: "browse_menus",
        child: [
            {
                label: "Patients",
                icon: "mdi-account-injury-outline",
                path: "/master-file/patients",
            },
            {
                label: "Consultants",
                icon: "mdi-doctor",
                path: "/master-file/consultants",
            },
            {
                label: "Rooms and Beds",
                icon: "mdi-bed-outline",
                path: "/master-file/rooms-beds",
            },
            {
                label: "Items and Supplies",
                icon: "mdi-invoice-list-outline",
                path: "/master-file/items-supplies",
            },
            {
                label: "Services",
                icon: "mdi-account-wrench-outline",
                path: "/master-file/services",
            },
        ],
    },
    {
        label: "Services",
        active: false,
        rule: "browse_menus",
        child: [
            {
                label: "Out Patients",
                icon: "mdi-account",
                path: "/services/out-patient",
            },
            {
                label: "Emergency",
                icon: "mdi-car-emergency",
                path: "/services/emergency",
            },
            {
                label: "In Patients",
                icon: "mdi-account-check",
                path: "/services/in-patient",
            },
            {
                label: "Ancillary Services",
                icon: "mdi-radar",
                path: "/services/ancillary-services",
            },
            {
                label: "Dietary Services",
                icon: "mdi-food-fork-drink",
                path: "/services/dietary-services",
            },
            {
                label: "Nursing Services",
                icon: "mdi-medical-bag",
                path: "/services/nursing-services",
            },
            {
                label: "Laboratory Services",
                icon: "mdi-needle",
                path: "/services/laboratory-services",
            },
            {
                label: "Radiology Services",
                icon: "mdi-cash-check",
                path: "/services/radiology-services",
            },
        ],
    },
    {
        label: "Transactions",
        active: false,
        rule: "browse_menus",
        child: [
            {
                label: "Billing",
                icon: "mdi-account-credit-card-outline",
                path: "/transactions/billing",
            },
            {
                label: "Cashier",
                icon: "mdi-set-left-center",
                path: "/transactions/cashier",
            },
            {
                label: "Guarantors Billing",
                icon: "mdi-set-left-center",
                path: "/transactions/guarantors-billing",
            },
            {
                label: "Refunds",
                icon: "mdi-set-left-center",
                path: "/transactions/refunds",
            },
        ],
    },
    {
        label: "Settings and Others",
        active: false,
        role: "browse-menus",
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
                subcomponents: [
                    {
                        label: "Report Manager",
                        icon: "mdi-chart-bar",
                        path: "/test",
                    },
                    {
                        label: "Report Manager",
                        icon: "mdi-chart-bar",
                        path: "/system-settings/report-manager",
                    },
                    {
                        label: "Report Manager",
                        icon: "mdi-chart-bar",
                        path: "/system-settings/report-manager",
                    },
                    {
                        label: "Report Manager",
                        icon: "mdi-chart-bar",
                        path: "/system-settings/report-manager",
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
