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
                subcomponents: [
                    {
                        label: "Outpatient Case History",
                        icon: "mdi-file-document-edit",
                        form: "OutpatientCaseHistory",
                        rule: "",
                    },
                    {
                        label: "Emergency Case History",
                        icon: "mdi-file-document-edit",
                        form: "EmergencyCaseHistory",
                        rule: "",
                    },
                    {
                        label: "Inpatient Case History",
                        icon: "mdi-file-document-edit",
                        form: "InpatientCaseHistory",
                        rule: "",
                    },
                    {
                        label: "Hold/Release Account",
                        icon: "mdi-file-document-edit",
                        form: "HoldReleaseAccount",
                        rule: "",
                    },
                    // {
                    //     label: "Medical Records Summary",
                    //     icon: "mdi-file-document-edit",
                    //     form: "MedicalRecordsSummary",
                    //     rule: "",
                    // },
                    {
                        label: "View HS7 Historical Data",
                        icon: "mdi-file-document-edit",
                        form: "ViewHs7HistoricalData",
                        rule: "",
                    },
                    {
                        label: "Viewing of Result Image",
                        icon: "mdi-file-document-edit",
                        form: "ViewingOfResultImage",
                        rule: "",
                    },
                    {
                        label: "Diet Counseling",
                        icon: "mdi-file-document-edit",
                        form: "DietCounseling",
                        rule: "",
                    },
                ],
                processing_and_queries: [
                    {
                        label: "Document Archives",
                        icon: "mdi-file-document-edit",
                        form: "DocumentArchives",
                        rule: "",
                    },
                    {
                        label: "Reissue Privilege Card",
                        icon: "mdi-file-document-edit",
                        form: "ReissuePrivilegeCard",
                        rule: "",
                    },
                ],
                table_and_template: [
                    {
                        label: "Discount Schemes",
                        icon: "mdi-file-document-edit",
                        form: "DiscountSchemes",
                        rule: "",
                    },
                    {
                        label: "Medical Service Types",
                        icon: "mdi-file-document-edit",
                        form: "MedicalServiceTypes",
                        rule: "",
                    },
                    {
                        label: "Medical Sub-Service Types",
                        icon: "mdi-file-document-edit",
                        form: "MedicalSubServiceTypes",
                        rule: "",
                    },
                    {
                        label: "Price Schemes",
                        icon: "mdi-file-document-edit",
                        form: "PriceSchemes",
                        rule: "",
                    },
                    {
                        label: "Price Group",
                        icon: "mdi-file-document-edit",
                        form: "PriceGroup",
                        rule: "",
                    },
                    {
                        label: "Document Categories",
                        icon: "mdi-file-document-edit",
                        form: "DocumentCategories",
                        rule: "",
                    },
                    {
                        label: "Patient Additional Information",
                        icon: "mdi-file-document-edit",
                        form: "PatientAddtionalInformation",
                        rule: "",
                    },
                    {
                        label: "Bad Habits",
                        icon: "mdi-file-document-edit",
                        form: "BadHabits",
                        rule: "",
                    },
                    {
                        label: "ID Types",
                        icon: "mdi-file-document-edit",
                        form: "IDTypes",
                        rule: "",
                    },
                    {
                        label: "Authorities",
                        icon: "mdi-file-document-edit",
                        form: "Authorities",
                        rule: "",
                    },
                    {
                        label: "Employment Information Positions",
                        icon: "mdi-file-document-edit",
                        form: "EmploymentInformationPositions",
                        rule: "",
                    },
                    {
                        label: "Employer Name",
                        icon: "mdi-file-document-edit",
                        form: "EmployerName",
                        rule: "",
                    },
                    {
                        label: "Other Specialist",
                        icon: "mdi-file-document-edit",
                        form: "OtherSpecialist",
                        rule: "",
                    },
                    {
                        label: "Facilities",
                        icon: "mdi-file-document-edit",
                        form: "Facilities",
                        rule: "",
                    },
                    {
                        label: "LOA Department",
                        icon: "mdi-file-document-edit",
                        form: "LoaDepartment",
                        rule: "",
                    },
                    {
                        label: "Military Classification",
                        icon: "mdi-file-document-edit",
                        form: "MilitaryClassification",
                        rule: "",
                    },
                ]
            },
            {
                label: "Consultants",
                icon: "mdi-doctor",
                path: "/master-file/consultants",
                rule: "browse_consultants",
                subcomponents: [
                    {
                        label: "Consultant Profile",
                        icon: "mdi-file-document-edit",
                        rule: "",
                    },
                    {
                        label: "Item Examinations",
                        icon: "mdi-file-document-edit",
                        form: "MFListOfItemExaminations",
                        rule: "",
                    },
                    {
                        label: "List of Patients",
                        icon: "mdi-file-document-edit",
                        form: "MFListOfPatients",
                        rule: "",
                    },
                    {
                        label: "Get Doctor's PHIC Accredition No.",
                        icon: "mdi-file-document-edit",
                        form: "MFGetDoctorAccreditationNo",
                        rule: "",
                    },
                    // {
                    //     label: "Doctor's Accreditation Check",
                    //     icon: "mdi-file-document-edit",
                    //     form: "MFDoctorsAccreditationCheck",
                    //     rule: "",
                    // },
                ],
                processing_and_queries: [
                    {
                        label: "PF Items/Services Per Service Type",
                        icon: "mdi-file-document-edit",
                        form: "PFItemsPerServiceType",
                        rule: "",
                    },
                    {
                        label: "Doctors with Expiring License",
                        icon: "mdi-file-document-edit",
                        form: "DoctorsWithExpiringLicense",
                        rule: "",
                    },
                ],
                table_and_template: [
                    {
                        label: "Consultant Specializations",
                        icon: "mdi-file-document-edit",

                        form: "ConsultantSpecializations",
                        rule: "",
                    },
                    {
                        label: "Medical Service Types",
                        icon: "mdi-file-document-edit",

                        form: "MedicalServiceTypes",
                        rule: "",
                    },
                    {
                        label: "Medical Sub-Service Types",
                        icon: "mdi-file-document-edit",

                        form: "MedicalSubServiceTypes",
                        rule: "",
                    },
                    {
                        label: "Consultant Role Types",
                        icon: "mdi-file-document-edit",

                        form: "ConsultantRoleTypes",
                        rule: "",
                    },
                    {
                        label: "Doctors Department",
                        icon: "mdi-file-document-edit",

                        form: "DoctorsDepartment",
                        rule: "",
                    },
                    {
                        label: "Doctor Category",
                        icon: "mdi-file-document-edit",

                        form: "DoctorCategory",
                        rule: "",
                    },
                    {
                        label: "Doctor's Rebate Category",
                        icon: "mdi-file-document-edit",

                        form: "DoctorsRebateCategory",
                        rule: "",
                    },
                ]
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
                        rule: "",
                    },
                    {
                        label: "Room Occupants",
                        icon: "mdi-file-document-edit",
                        form: "MFRoomOccupants",
                        rule: "",
                    },
                ],
                processing_and_queries: [],
                table_and_template: [
                    {
                        label: "Buildings & Floor",
                        icon: "mdi-file-document-edit",
                        form: "BuildingsFloors",
                        rule: "",
                    },
                    {
                        label: "Nursing Station & Ward",
                        icon: "mdi-file-document-edit",
                        form: "NursingStationsWards",
                        rule: "",
                    },
                    {
                        label: "Room Classifications",
                        icon: "mdi-file-document-edit",
                        form: "RoomClassificationTypes",
                        rule: "",
                    },
                    {
                        label: "Room Charge Settings",
                        icon: "mdi-file-document-edit",
                        form: "RoomChargeSettings",
                        rule: "",
                    },
                    {
                        label: "Room Price Schemes",
                        icon: "mdi-file-document-edit",
                        form: "RoomPriceSchemes",
                        rule: "",
                    },
                    {
                        label: "Room Status",
                        icon: "mdi-file-document-edit",
                        form: "RoomStatus",
                        rule: "",
                    },
                    {
                        label: "Room Usage Types",
                        icon: "mdi-file-document-edit",
                        form: "RoomUsageTypes",
                        rule: "",
                    },
                    {
                        label: "Bed Status",
                        icon: "mdi-file-document-edit",
                        form: "BedStatus",
                        rule: "",
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
                        form: "MFItemServicesDetails",
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
                        // form: "MFMedicalPackages",
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
                ],
                processing_and_queries: [
                    {
                        label: "Borrowed Items",
                        icon: "mdi-file-document-edit",
                        form: "BorrowedItems",
                        rule: "",
                    },
                    {
                        label: "Generate Prices and Discounts",
                        icon: "mdi-file-document-edit",
                        form: "GeneratePricesAndDiscounts",
                        rule: "",
                    },
                    // {
                    //     label: "EDPMS Drug Code Mapping",
                    //     icon: "mdi-file-document-edit",
                    //     rule: "",
                    // },
                ],
                table_and_template: [
                    {
                        label: "Billing Report Categories",
                        icon: "mdi-file-document-edit",
                        form: "BillingReportCategory",
                        rule: "",
                    },
                    {
                        label: "Collection Report Main Header",
                        icon: "mdi-file-document-edit",
                        form: "CollectionReportMainHeader",
                        rule: "",
                    },
                    {
                        label: "Collection Report Group Header",
                        icon: "mdi-file-document-edit",
                        form: "CollectionReportGroupHeader",
                        rule: "",
                    },
                    {
                        label: "CPT Modifiers",
                        icon: "mdi-file-document-edit",
                        form: "CptModifiers",
                        rule: "",
                    },
                    {
                        label: "CPT Sections",
                        icon: "mdi-file-document-edit",
                        form: "CptSections",
                        rule: "",
                    },
                    {
                        label: "CPT Sub-Sections",
                        icon: "mdi-file-document-edit",
                        form: "CptSubSections",
                        rule: "",
                    },
                    {
                        label: "Department Groups",
                        icon: "mdi-file-document-edit",
                        form: "DepartmentGroups",
                        rule: "",
                    },
                    {
                        label: "Department .Warehouses",
                        icon: "mdi-file-document-edit",
                        form: "DepartmentWarehouses",
                        rule: "",
                    },
                    {
                        label: "Dosages",
                        icon: "mdi-file-document-edit",
                        form: "Dosages",
                        rule: "",
                    },
                    {
                        label: "Drug Administration Group",
                        icon: "mdi-file-document-edit",
                        form: "DrugAdminGroups",
                        rule: "",
                    },
                    {
                        label: "DOH Drug List",
                        icon: "mdi-file-document-edit",
                        form: "DohDrugLists",
                        rule: "",
                    },
                    {
                        label: "Generic Names",
                        icon: "mdi-file-document-edit",
                        form: "GenericNames",
                        rule: "",
                    },
                    {
                        label: "Indications",
                        icon: "mdi-file-document-edit",
                        form: "Indications",
                        rule: "",
                    },
                    {
                        label: "Item Categories",
                        icon: "mdi-file-document-edit",
                        form: "ItemCategories",
                        rule: "",
                    },
                    {
                        label: "Item Price Groups",
                        icon: "mdi-file-document-edit",
                        form: "PriceGroup",
                        rule: "",
                    },
                    {
                        label: "Item Pricing Schemes",
                        icon: "mdi-file-document-edit",
                        form: "ItemPricingSchemes",
                        rule: "",
                    },
                    {
                        label: "Item Templates",
                        icon: "mdi-file-document-edit",
                        form: "ItemTemplates",
                        rule: "",
                    },
                    {
                        label: "Item Units",
                        icon: "mdi-file-document-edit",
                        form: "ItemUnits",
                        rule: "",
                    },
                    {
                        label: "Medication Durations",
                        icon: "mdi-file-document-edit",
                        form: "MedicationDurations",
                        rule: "",
                    },
                    {
                        label: "Medication Frequencies",
                        icon: "mdi-file-document-edit",
                        form: "MedicationFrequencies",
                        rule: "",
                    },
                    {
                        label: "Medication Preparations",
                        icon: "mdi-file-document-edit",
                        form: "MedicationPreparations",
                        rule: "",
                    },
                    {
                        label: "Routes",
                        icon: "mdi-file-document-edit",
                        form: "Routes",
                        rule: "",
                    },
                    {
                        label: "Others",
                        icon: "mdi-file-document-edit",
                        form: "Others",
                        rule: "",
                    },
                    {
                        label: "PHIC Item Categories",
                        icon: "mdi-file-document-edit",
                        form: "PhicItemCategories",
                        rule: "",
                    },
                    {
                        label: "Unit of Measures",
                        icon: "mdi-file-document-edit",
                        form: "UnitOfMeasures",
                        rule: "",
                    },
                    {
                        label: "Modalities",
                        icon: "mdi-file-document-edit",
                        form: "Modalities",
                        rule: "",
                    },
                    {
                        label: "Specimens",
                        icon: "mdi-file-document-edit",
                        form: "Specimens",
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
                        form: "MFItemServicesDetails",
                        rule: "",
                    },
                    {
                        label: "Manage Department Access",
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
                        // form: "MFMedicalPackages",
                        rule: "",
                    },
                    {
                        label: "Item Manufacturer",
                        icon: "mdi-file-document-edit",
                        form: "MFItemManufacturer",
                        rule: "",
                    },
                ],
                processing_and_queries: [
                    {
                        label: "Borrowed Items",
                        icon: "mdi-file-document-edit",
                        form: "BorrowedItems",
                        rule: "",
                    },
                    {
                        label: "Generate Prices and Discounts",
                        icon: "mdi-file-document-edit",
                        form: "GeneratePricesAndDiscounts",
                        rule: "",
                    },
                    // {
                    //     label: "EDPMS Drug Code Mapping",
                    //     icon: "mdi-file-document-edit",
                    //     rule: "",
                    // },
                ],
                table_and_template: [
                    {
                        label: "Billing Report Categories",
                        icon: "mdi-file-document-edit",
                        form: "BillingReportCategory",
                        rule: "",
                    },
                    {
                        label: "Collection Report Main Header",
                        icon: "mdi-file-document-edit",
                        form: "CollectionReportMainHeader",
                        rule: "",
                    },
                    {
                        label: "Collection Report Group Header",
                        icon: "mdi-file-document-edit",
                        form: "CollectionReportGroupHeader",
                        rule: "",
                    },
                    {
                        label: "CPT Modifiers",
                        icon: "mdi-file-document-edit",
                        form: "CptModifiers",
                        rule: "",
                    },
                    {
                        label: "CPT Sections",
                        icon: "mdi-file-document-edit",
                        form: "CptSections",
                        rule: "",
                    },
                    {
                        label: "CPT Sub-Sections",
                        icon: "mdi-file-document-edit",
                        form: "CptSubSections",
                        rule: "",
                    },
                    {
                        label: "Department Groups",
                        icon: "mdi-file-document-edit",
                        form: "DepartmentGroups",
                        rule: "",
                    },
                    {
                        label: "Department .Warehouses",
                        icon: "mdi-file-document-edit",
                        form: "DepartmentWarehouses",
                        rule: "",
                    },
                    {
                        label: "Dosages",
                        icon: "mdi-file-document-edit",
                        form: "Dosages",
                        rule: "",
                    },
                    {
                        label: "Drug Administration Group",
                        icon: "mdi-file-document-edit",
                        form: "DrugAdminGroups",
                        rule: "",
                    },
                    {
                        label: "DOH Drug List",
                        icon: "mdi-file-document-edit",
                        form: "DohDrugLists",
                        rule: "",
                    },
                    {
                        label: "Generic Names",
                        icon: "mdi-file-document-edit",
                        form: "GenericNames",
                        rule: "",
                    },
                    {
                        label: "Indications",
                        icon: "mdi-file-document-edit",
                        form: "Indications",
                        rule: "",
                    },
                    {
                        label: "Item Categories",
                        icon: "mdi-file-document-edit",
                        form: "ItemCategories",
                        rule: "",
                    },
                    {
                        label: "Item Price Groups",
                        icon: "mdi-file-document-edit",
                        form: "PriceGroup",
                        rule: "",
                    },
                    {
                        label: "Item Pricing Schemes",
                        icon: "mdi-file-document-edit",
                        form: "ItemPricingSchemes",
                        rule: "",
                    },
                    {
                        label: "Item Templates",
                        icon: "mdi-file-document-edit",
                        form: "ItemTemplates",
                        rule: "",
                    },
                    {
                        label: "Item Units",
                        icon: "mdi-file-document-edit",
                        form: "ItemUnits",
                        rule: "",
                    },
                    {
                        label: "Medication Durations",
                        icon: "mdi-file-document-edit",
                        form: "MedicationDurations",
                        rule: "",
                    },
                    {
                        label: "Medication Frequencies",
                        icon: "mdi-file-document-edit",
                        form: "MedicationFrequencies",
                        rule: "",
                    },
                    {
                        label: "Medication Preparations",
                        icon: "mdi-file-document-edit",
                        form: "MedicationPreparations",
                        rule: "",
                    },
                    {
                        label: "Routes",
                        icon: "mdi-file-document-edit",
                        form: "Routes",
                        rule: "",
                    },
                    {
                        label: "Others",
                        icon: "mdi-file-document-edit",
                        form: "Others",
                        rule: "",
                    },
                    {
                        label: "PHIC Item Categories",
                        icon: "mdi-file-document-edit",
                        form: "PhicItemCategories",
                        rule: "",
                    },
                    {
                        label: "Unit of Measures",
                        icon: "mdi-file-document-edit",
                        form: "UnitOfMeasures",
                        rule: "",
                    },
                    {
                        label: "Modalities",
                        icon: "mdi-file-document-edit",
                        form: "Modalities",
                        rule: "",
                    },
                    {
                        label: "Specimens",
                        icon: "mdi-file-document-edit",
                        form: "Specimens",
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
                subcomponents: [
                    // {
                    //     label: "Patient Profile",
                    //     icon: "mdi-file-document-edit",
                    //     form: "PatientProfile",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Suspend",
                    //     icon: "mdi-file-document-edit",
                    //     form: "Suspend",
                    //     rule: "",
                    // },
                    {
                        label: "Requisitions",
                        icon: "mdi-file-document-edit",
                        form: "Requisitions",
                        rule: "",
                    },
                    {
                        label: "Post Charges",
                        icon: "mdi-file-document-edit",
                        form: "PostCharges",
                        rule: "",
                    },
                    {
                        label: "Post Medicine / Supplies",
                        icon: "mdi-file-document-edit",
                        form: "OPDPostMedicineSupplies",
                        rule: "",
                    },
                    // {
                    //     label: "Print Transaction Receipt",
                    //     icon: "mdi-file-document-edit",
                    //     form: "PrintTransactionReceipt",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Post Corporate Medical Package",
                    //     icon: "mdi-file-document-edit",
                    //     form: "PostCorporateMedicalPackage",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Post Diagnostic Medical Package",
                    //     icon: "mdi-file-document-edit",
                    //     form: "PostDiagnosticMedicalPackage",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Post Adjustments",
                    //     icon: "mdi-file-document-edit",
                    //     form: "PostAdjustments",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Post Professional Fees",
                    //     icon: "mdi-file-document-edit",
                    //     form: "PostProfessionalFees",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Post Discounts",
                    //     icon: "mdi-file-document-edit",
                    //     form: "PostDiscounts",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Post A/R Transfer",
                    //     icon: "mdi-file-document-edit",
                    //     form: "PostArTransfer",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Unpost A/R Transfer",
                    //     icon: "mdi-file-document-edit",
                    //     rule: "",
                    // },
                    // {
                    //     label: "View Examination Upshot",
                    //     icon: "mdi-file-document-edit",
                    //     form: "ViewExaminationUpshot",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Apply Promissory Note",
                    //     icon: "mdi-file-document-edit",
                    //     form: "ApplyPromissoryNote",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Apply Medical Package",
                    //     icon: "mdi-file-document-edit",
                    //     form: "ApplyMedicalPackage",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Tag as MGH",
                    //     icon: "mdi-file-document-edit",
                    //     form: "TagAsMgh",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Untag as MGH",
                    //     icon: "mdi-file-document-edit",
                    //     form: "UntagAsMgh",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Discharge",
                    //     icon: "mdi-file-document-edit",
                    //     form: "Discharge",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Discharge Instruction",
                    //     icon: "mdi-file-document-edit",
                    //     form: "DischargeInstruction",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Post Final Diagnosis",
                    //     icon: "mdi-file-document-edit",
                    //     form: "PostFinalDiagnosis",
                    //     rule: "",
                    // },
                    // {
                    //     label: "SOA. Billing Statement",
                    //     icon: "mdi-file-document-edit",
                    //     form: "SoaBillingStatement",
                    //     rule: "",
                    // },
                    // {
                    //     label: "View. Print Reports",
                    //     icon: "mdi-file-document-edit",
                    //     form: "ViewPrintReports",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Admit Patient",
                    //     icon: "mdi-file-document-edit",
                    //     form: "AdmitPatient",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Untag for Consultation End date",
                    //     icon: "mdi-file-document-edit",
                    //     rule: "",
                    // },
                    // {
                    //     label: "OPD Cash Transaction",
                    //     icon: "mdi-file-document-edit",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Transfer to ER",
                    //     icon: "mdi-file-document-edit",
                    //     form: "TransferToEr",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Print Claim Forms",
                    //     icon: "mdi-file-document-edit",
                    //     form: "PrintClaimForms",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Claim Form 4 Processing",
                    //     icon: "mdi-file-document-edit",
                    //     form: "ClaimForm4Processing",
                    //     rule: "",
                    // },
                ],
                processing_and_queries: [
                    // {
                    //     label: "Items and Services Status Report",
                    //     icon: "mdi-file-document-edit",
                    //     form: "ItemsAndServicesStatusReport",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Document Archives",
                    //     icon: "mdi-file-document-edit",
                    //     form: "DocumentArchives",
                    //     rule: "",
                    // },
                    // {
                    //     label: "May-Go-Home Patient List",
                    //     icon: "mdi-file-document-edit",
                    //     form: "MayGoHomePatientList",
                    //     rule: "",
                    // },
                    // {
                    //     label: "CF4 for Discharged Patients",
                    //     icon: "mdi-file-document-edit",
                    //     form: "Cf4ForDischargedPatients",
                    //     rule: "",
                    // },
                ],
                table_and_template: []
            },
            {
                label: "Emergency",
                icon: "mdi-ambulance",
                path: "/services/emergency",
                rule: "browse_emergency",
                subcomponents: [
                    {
                        label: "Patient Profile",
                        icon: "mdi-file-document-edit",
                        form: "PatientProfile",
                        rule: "",
                    },
                    {
                        label: "Suspend",
                        icon: "mdi-file-document-edit",
                        form: "Suspend",
                        rule: "",
                    },
                    {
                        label: "Requisitions",
                        icon: "mdi-file-document-edit",
                        form: "Requisitions",
                        rule: "",
                    },
                    {
                        label: "Post Charges",
                        icon: "mdi-file-document-edit",
                        form: "PostCharges",
                        rule: "",
                    },
                    {
                        label: "Post Medicine / Supplies",
                        icon: "mdi-file-document-edit",
                        form: "ERPostMedicineSupplies",
                        rule: "",
                    },
                    {
                        label: "Nursing Activity",
                        icon: "mdi-file-document-edit",
                        form: "NurseActivity",
                        rule: "",
                    },
                    {
                        label: "Post Corporate Medical Package",
                        icon: "mdi-file-document-edit",
                        form: "PostCorporateMedicalPackage",
                        rule: "",
                    },
                    {
                        label: "Post Diagnostic Medical Package",
                        icon: "mdi-file-document-edit",
                        form: "PostDiagnosticMedicalPackage",
                        rule: "",
                    },
                    {
                        label: "Post Adjustments",
                        icon: "mdi-file-document-edit",
                        form: "PostAdjustments",
                        rule: "",
                    },
                    {
                        label: "Post Professional Fees",
                        icon: "mdi-file-document-edit",
                        form: "PostProfessionalFees",
                        rule: "",
                    },
                    {
                        label: "Post Discounts",
                        icon: "mdi-file-document-edit",
                        form: "PostDiscounts",
                        rule: "",
                    },
                    {
                        label: "Post A/R Transfer",
                        icon: "mdi-file-document-edit",
                        form: "PostArTransfer",
                        rule: "",
                    },
                    {
                        label: "Unpost A/R Transfer",
                        icon: "mdi-file-document-edit",
                        rule: "",
                    },
                    {
                        label: "View Examination Upshot",
                        icon: "mdi-file-document-edit",
                        form: "ViewExaminationUpshot",
                        rule: "",
                    },
                    {
                        label: "Apply Promissory Note",
                        icon: "mdi-file-document-edit",
                        form: "ApplyPromissoryNote",
                        rule: "",
                    },
                    {
                        label: "Apply Medical Package",
                        icon: "mdi-file-document-edit",
                        form: "ApplyMedicalPackage",
                        rule: "",
                    },
                    {
                        label: "Tag as MGH",
                        icon: "mdi-file-document-edit",
                        form: "TagAsMgh",
                        rule: "",
                    },
                    {
                        label: "Untag as MGH",
                        icon: "mdi-file-document-edit",
                        form: "UntagAsMgh",
                        rule: "",
                    },
                    {
                        label: "Discharge",
                        icon: "mdi-file-document-edit",
                        form: "Discharge",
                        rule: "",
                    },
                    {
                        label: "Discharge Instruction",
                        icon: "mdi-file-document-edit",
                        form: "DischargeInstruction",
                        rule: "",
                    },
                    {
                        label: "Post Final Diagnosis",
                        icon: "mdi-file-document-edit",
                        form: "PostFinalDiagnosis",
                        rule: "",
                    },
                    {
                        label: "SOA. Billing Statement",
                        icon: "mdi-file-document-edit",
                        form: "SoaBillingStatement",
                        rule: "",
                    },
                    {
                        label: "View. Print Reports",
                        icon: "mdi-file-document-edit",
                        form: "ViewPrintReports",
                        rule: "",
                    },
                    {
                        label: "Admit Patient",
                        icon: "mdi-file-document-edit",
                        form: "AdmitPatient",
                        rule: "",
                    },
                    {
                        label: "Print Claim Forms",
                        icon: "mdi-file-document-edit",
                        form: "PrintClaimForms",
                        rule: "",
                    },
                    {
                        label: "Claim Form 4 Processing",
                        icon: "mdi-file-document-edit",
                        form: "ClaimForm4Processing",
                        rule: "",
                    },
                ],
                processing_and_queries: [
                    // {
                    //     label: "May Go Home Patient List",
                    //     icon: "mdi-file-document-edit",
                    //     form: "MayGoHomePatientList",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Document Archives",
                    //     icon: "mdi-file-document-edit",
                    //     form: "DocumentArchives",
                    //     rule: "",
                    // },
                    // {
                    //     label: "CF4 for Discharged Patients",
                    //     icon: "mdi-file-document-edit",
                    //     form: "Cf4ForDischargedPatients",
                    //     rule: "",
                    // },
                ],
                table_and_template: []
            },
            {
                label: "In Patients",
                icon: "mdi-account-check",
                path: "/services/in-patient",
                rule: "browse_inpatients",
                subcomponents: [
                    {
                        label: "Patient Profile",
                        icon: "mdi-file-document-edit",
                        form: "PatientProfile",
                        rule: "",
                    },
                    {
                        label: "Room Inquiry",
                        icon: "mdi-file-document-edit",
                        form: "RoomInquiry",
                        rule: "",
                    },
                    {
                        label: "Suspend",
                        icon: "mdi-file-document-edit",
                        form: "Suspend",
                        rule: "",
                    },
                    {
                        label: "Relocate",
                        icon: "mdi-file-document-edit",
                        form: "RelocatePatient",
                        rule: "",
                    },
                    // {
                    //     label: "Manage Secondary Rooms",
                    //     icon: "mdi-file-document-edit",
                    //     rule: "",
                    // },
                    {
                        label: "Requisitions",
                        icon: "mdi-file-document-edit",
                        form: "Requisitions",
                        rule: "",
                    },
                    {
                        label: "Post Charges",
                        icon: "mdi-file-document-edit",
                        form: "PostCharges",
                        rule: "",
                    },
                    {
                        label: "Post Corporate Medical Package",
                        icon: "mdi-file-document-edit",
                        form: "PostCorporateMedicalPackage",
                        rule: "",
                    },
                    {
                        label: "Post Diagnostic Medical Package",
                        icon: "mdi-file-document-edit",
                        form: "PostDiagnosticMedicalPackage",
                        rule: "",
                    },
                    {
                        label: "Post Adjustments",
                        icon: "mdi-file-document-edit",
                        form: "PostAdjustments",
                        rule: "",
                    },
                    {
                        label: "Post Professional Fees",
                        icon: "mdi-file-document-edit",
                        form: "PostProfessionalFees",
                        rule: "",
                    },
                    {
                        label: "Post Discounts",
                        icon: "mdi-file-document-edit",
                        form: "PostDiscounts",
                        rule: "",
                    },
                    {
                        label: "Post A/R Transfer",
                        icon: "mdi-file-document-edit",
                        form: "PostArTransfer",
                        rule: "",
                    },
                    {
                        label: "Unpost A/R Transfer",
                        icon: "mdi-file-document-edit",
                        rule: "",
                    },
                    {
                        label: "Apply Promissory Note",
                        icon: "mdi-file-document-edit",
                        form: "ApplyPromissoryNote",
                        rule: "",
                    },
                    {
                        label: "Apply Medical Package",
                        icon: "mdi-file-document-edit",
                        form: "ApplyMedicalPackage",
                        rule: "",
                    },
                    {
                        label: "Debit Room Charge",
                        icon: "mdi-file-document-edit",
                        form: "DebitRoomCharges",
                        rule: "",
                    },
                    {
                        label: "Credit Room Charge",
                        icon: "mdi-file-document-edit",
                        rule: "",
                    },
                    {
                        label: "Tag as MGH",
                        icon: "mdi-file-document-edit",
                        form: "TagAsMgh",
                        rule: "",
                    },
                    {
                        label: "Untag as MGH",
                        icon: "mdi-file-document-edit",
                        form: "UntagAsMgh",
                        rule: "",
                    },
                    {
                        label: "Discharge",
                        icon: "mdi-file-document-edit",
                        form: "Discharge",
                        rule: "",
                    },
                    {
                        label: "Post Final Diagnosis",
                        icon: "mdi-file-document-edit",
                        form: "PostFinalDiagnosis",
                        rule: "",
                    },
                    {
                        label: "SOA. Billing Statement",
                        icon: "mdi-file-document-edit",
                        form: "SoaBillingStatement",
                        rule: "",
                    },
                    {
                        label: "View. Print Reports",
                        icon: "mdi-file-document-edit",
                        form: "ViewPrintReports",
                        rule: "",
                    },
                    {
                        label: "Print Claim Forms",
                        icon: "mdi-file-document-edit",
                        form: "PrintClaimForms",
                        rule: "",
                    },
                    {
                        label: "Claim Form 4 Processing",
                        icon: "mdi-file-document-edit",
                        form: "ClaimForm4Processing",
                        rule: "",
                    },
                ],
                processing_and_queries: [
                    {
                        label: "Re-Admit",
                        icon: "mdi-file-document-edit",
                        form: "ReAdmit",
                        rule: "",
                    },
                    {
                        label: "Post Final Diagnosis for Discharged Patients",
                        icon: "mdi-file-document-edit",
                        form: "PostFinalDiagnosisForDischargedPatients",
                        rule: "",
                    },
                    {
                        label: "For Billing Recalculation",
                        icon: "mdi-file-document-edit",
                        form: "ForBillingRecalculation",
                        rule: "",
                    },
                    {
                        label: "May-Go-Home Patient List",
                        icon: "mdi-file-document-edit",
                        form: "MayGoHomePatientList",
                        rule: "",
                    },
                    {
                        label: "Room Status Availability",
                        icon: "mdi-file-document-edit",
                        form: "RoomStatusAvailability",
                        rule: "",
                    },
                    {
                        label: "Document Archives",
                        icon: "mdi-file-document-edit",
                        form: "DocumentArchives",
                        rule: "",
                    },
                    {
                        label: "CF4 for Discharged Patients",
                        icon: "mdi-file-document-edit",
                        form: "Cf4ForDischargedPatients",
                        rule: "",
                    },
                ],
                table_and_template: [
                    {
                        label: "Adjustment Types",
                        icon: "mdi-file-document-edit",
                        form: "AdjustmentTypes",
                        rule: "",
                    },
                    {
                        label: "Admission Result",
                        icon: "mdi-file-document-edit",
                        form: "AdmissionResult",
                        rule: "",
                    },
                    {
                        label: "Allergies",
                        icon: "mdi-file-document-edit",
                        form: "Allergies",
                        rule: "",
                    },
                    {
                        label: "Billing Templates",
                        icon: "mdi-file-document-edit",
                        form: "BillingTemplates",
                        rule: "",
                    },
                    {
                        label: "Billing Templates Groups",
                        icon: "mdi-file-document-edit",
                        form: "BillingTemplateGroups",
                        rule: "",
                    },
                    {
                        label: "CS Case Indicators",
                        icon: "mdi-file-document-edit",
                        form: "CsCaseIndicators",
                        rule: "",
                    },
                    {
                        label: "Death Types",
                        icon: "mdi-file-document-edit",
                        form: "DeathType",
                        rule: "",
                    },
                    {
                        label: "Discount Schemes",
                        icon: "mdi-file-document-edit",
                        form: "DiscountSchemes",
                        rule: "",
                    },
                    {
                        label: "Excellence Centers",
                        icon: "mdi-file-document-edit",
                        form: "ExcellenceCenters",
                        rule: "",
                    },
                    {
                        label: "Referring Centers",
                        icon: "mdi-file-document-edit",
                        form: "ReferringCenters",
                        rule: "",
                    },
                    {
                        label: "Disposition Types",
                        icon: "mdi-file-document-edit",
                        form: "DispositionTypes",
                        rule: "",
                    },
                    {
                        label: "Medical Service Types",
                        icon: "mdi-file-document-edit",
                        form: "MedicalServiceTypes",
                        rule: "",
                    },
                    {
                        label: "Medical Sub Service Types",
                        icon: "mdi-file-document-edit",
                        form: "MedicalSubServiceTypes",
                        rule: "",
                    },
                    {
                        label: "Nursing Stations",
                        icon: "mdi-file-document-edit",
                        form: "NursingStationsWards",
                        rule: "",
                    },
                    {
                        label: "Room Classifications",
                        icon: "mdi-file-document-edit",
                        form: "RoomClassificationTypes",
                        rule: "",
                    },
                    {
                        label: "Room Price Schemes",
                        icon: "mdi-file-document-edit",
                        form: "RoomPriceSchemes",
                        rule: "",
                    },
                    {
                        label: "Hospitalization Types",
                        icon: "mdi-file-document-edit",
                        form: "HospitalizationTypes",
                        rule: "",
                    },
                    {
                        label: "Hospitalization Plans",
                        icon: "mdi-file-document-edit",
                        form: "HospitalPlan",
                        rule: "",
                    },
                    {
                        label: "Hospitalization Case Types",
                        icon: "mdi-file-document-edit",
                        form: "HospitalizationCaseTypes",
                        rule: "",
                    },
                    {
                        label: "Hospitalization Transaction Types",
                        icon: "mdi-file-document-edit",
                        form: "TransactionType",
                        rule: "",
                    },
                    {
                        label: "Internal Control Table",
                        icon: "mdi-file-document-edit",
                        form: "InternalControlTable",
                        rule: "",
                    },
                    {
                        label: "List of Attendant",
                        icon: "mdi-file-document-edit",
                        form: "ListOfAttendant",
                        rule: "",
                    },
                    {
                        label: "Surgical Procedures",
                        icon: "mdi-file-document-edit",
                        form: "SurgicalProcedures",
                        rule: "",
                    },
                    {
                        label: "Surgical Procedures Categories",
                        icon: "mdi-file-document-edit",
                        form: "SurgicalProceduresCategory",
                        rule: "",
                    },
                    {
                        label: "Body Systems",
                        icon: "mdi-file-document-edit",
                        form: "BodySystems",
                        rule: "",
                    },
                    {
                        label: "Body Organs",
                        icon: "mdi-file-document-edit",
                        form: "BodyOrgans",
                        rule: "",
                    },
                    {
                        label: "Types of Anesthesia",
                        icon: "mdi-file-document-edit",
                        form: "TypesOfAnesthesia",
                        rule: "",
                    },
                    {
                        label: "Medical Social Service Template",
                        icon: "mdi-file-document-edit",
                        form: "MedicalSocialServiceTemplate",
                        rule: "",
                    },
                    {
                        label: "Other Hospital Services Template",
                        icon: "mdi-file-document-edit",
                        form: "OtherHospitalServices",
                        rule: "",
                    },
                    {
                        label: "List of Pet Breed",
                        icon: "mdi-file-document-edit",
                        form: "ListOfPetBreed",
                        rule: "",
                    },
                    {
                        label: "Registry Groups",
                        icon: "mdi-file-document-edit",
                        form: "RegistryGroup",
                        rule: "",
                    },
                ]
            },
            {
                label: "Nursing Services",
                icon: "mdi-medical-bag",
                path: "/services/nursing-services",
                rule: "browse_nursingservices",
                subcomponents: [
                    {   
                        label: "Nursing Activity",
                        icon: "mdi-file-document-edit",
                        form: "NurseActivity",
                        rule: "",
                    },
                    // {
                    //     label: "Patient Profile",
                    //     icon: "mdi-file-document-edit",
                    //     form: "PatientProfile",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Requisitions",
                    //     icon: "mdi-file-document-edit",
                    //     form: "Requisitions",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Post Charges",
                    //     icon: "mdi-file-document-edit",
                    //     form: "PostCharges",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Apply Credit Note",
                    //     icon: "mdi-file-document-edit",
                    //     form: "ApplyCreditNote",
                    //     rule: "",
                    // },
                    // {
                    //     label: "View Examination Upshots",
                    //     icon: "mdi-file-document-edit",
                    //     form: "ViewExaminationUpshot",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Tag as MGH",
                    //     icon: "mdi-file-document-edit",
                    //     form: "TagAsMgh",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Untag as MGH",
                    //     icon: "mdi-file-document-edit",
                    //     form: "UntagAsMgh",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Discharge",
                    //     icon: "mdi-file-document-edit",
                    //     form: "Discharge",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Discharge Instruction",
                    //     icon: "mdi-file-document-edit",
                    //     form: "DischargeInstruction",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Relocate Patient",
                    //     icon: "mdi-file-document-edit",
                    //     form: "RelocatePatient",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Nursing Endorsement Sheet",
                    //     icon: "mdi-file-document-edit",
                    //     form: "NurseEndorsementForm",
                    //     rule: "",
                    // },
                    // {
                    //     label: "View Patient Diet History",
                    //     icon: "mdi-file-document-edit",
                    //     form: "ViewPatientDietHistory",
                    //     rule: "",
                    // },
                    // {
                    //     label: "View Drugs and Medicines",
                    //     icon: "mdi-file-document-edit",
                    //     form: "ViewDrugsAndMedicines",
                    //     rule: "",
                    // },
                    // {
                    //     label: "View Statement of Account",
                    //     icon: "mdi-file-document-edit",
                    //     form: "ViewStatementOfAccount",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Claim Form 4 Processing",
                    //     icon: "mdi-file-document-edit",
                    //     form: "ClaimForm4Processing",
                    //     rule: "",
                    // },
                ],
                processing_and_queries: [
                    // {
                    //     label: "Dietary Transactions",
                    //     icon: "mdi-file-document-edit",
                    //     form: "DietaryTransactions",
                    //     rule: "",
                    // },
                    // {
                    //     label: "May-Go-Home Patient List",
                    //     icon: "mdi-file-document-edit",
                    //     form: "MayGoHomePatientList",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Room Status Availability",
                    //     icon: "mdi-file-document-edit",
                    //     form: "RoomStatusAvailability",
                    //     rule: "",
                    // },
                ],
                table_and_template: [
                    // {
                    //     label: "Admission Result",
                    //     icon: "mdi-file-document-edit",
                    //     form: "AdmissionResult",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Caesarian Case Indicators",
                    //     icon: "mdi-file-document-edit",
                    //     form: "CsCaseIndicators",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Death Types",
                    //     icon: "mdi-file-document-edit",
                    //     form: "DeathType",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Nursing Endorsement Categories",
                    //     icon: "mdi-file-document-edit",
                    //     form: "NursingEndorsement",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Referral Causes",
                    //     icon: "mdi-file-document-edit",
                    //     form: "ReferralCauses",
                    //     rule: "",
                    // },
                ]
            },
            // {
            //     label: "Dietary Services",
            //     icon: "mdi-food-fork-drink",
            //     path: "/services/dietary-services",
            //     rule: "browse_dietaryservices",
            //     subcomponents: [
            //         {
            //             label: "Inpatient Details",
            //             icon: "mdi-file-document-edit",
            //             rule: "",
            //         },
            //         {
            //             label: "Acknowledge Posted Diet",
            //             icon: "mdi-file-document-edit",
            //             form: "AcknowledgePostedDiet",
            //             rule: "",
            //         },
            //         {
            //             label: "Post Diet Meal as Served",
            //             icon: "mdi-file-document-edit",
            //             form: "PostDietMealasServed",
            //             rule: "",
            //         },
            //         {
            //             label: "View .Print Diet Card",
            //             icon: "mdi-file-document-edit",
            //             form: "ViewPrintDietCard",
            //             rule: "",
            //         },
            //         {
            //             label: "View Patient Diet History",
            //             icon: "mdi-file-document-edit",
            //             form: "ViewPatientDietHistory",
            //             rule: "",
            //         },
            //     ],
            //     processing_and_queries: [
            //         {
            //             label: "View Patients with Changed Diet",
            //             icon: "mdi-file-document-edit",
            //             form: "ViewPatientsWithChangedDiet",
            //             rule: "",
            //         },
            //     ],
            //     table_and_template: [
            //         {
            //             label: "Diet Meals",
            //             icon: "mdi-file-document-edit",
            //             form: "DietList",
            //             rule: "",
            //         },
            //         {
            //             label: "Diet Meal Types",
            //             icon: "mdi-file-document-edit",
            //             form: "DietMealType",
            //             rule: "",
            //         },
            //         {
            //             label: "Diet Types",
            //             icon: "mdi-file-document-edit",
            //             form: "DietType",
            //             rule: "",
            //         },
            //         {
            //             label: "Diet Sub Types",
            //             icon: "mdi-file-document-edit",
            //             form: "DietSubTypes",
            //             rule: "",
            //         },
            //     ]
            // },
            {
                label: "Ancillary Services",
                icon: "mdi-medication",
                path: "/services/ancillary-services",
                rule: "browse_ancillaryservices",
                subcomponents: [
                    // {
                    //     label: "Patient Profile",
                    //     icon: "mdi-file-document-edit",
                    //     form: "PatientProfile",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Transaction Details",
                    //     icon: "mdi-file-document-edit",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Direct Render",
                    //     icon: "mdi-file-document-edit",
                    //     form: "DirectRender",
                    //     rule: "",
                    // },
                    {
                        label: "Render Requisition",
                        icon: "mdi-file-document-edit",
                        rule: "",
                    },
                    // {
                    //     label: "Drug Administration",
                    //     icon: "mdi-file-document-edit",
                    //     form: "DrugAdministration",
                    //     rule: "",
                    // },
                    {
                        label: "Apply Credit Note",
                        icon: "mdi-file-document-edit",
                        form: "ApplyCreditNote",
                        rule: "",
                    },
                    // {
                    //     label: "Print Cash / Charge / CN Slip",
                    //     icon: "mdi-file-document-edit",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Cash Transaction",
                    //     icon: "mdi-file-document-edit",
                    //     rule: "",
                    // },
                    {
                        label: "Print Requisition Slip",
                        icon: "mdi-file-document-edit",
                        rule: "",
                    },
                    {
                        label: "Void Discount",
                        icon: "mdi-file-document-edit",
                        rule: "",
                    },
                    {
                        label: "Centralized Credit Note",
                        icon: "mdi-file-document-edit",
                        form: "CentralizedCreditNote",
                        rule: "",
                    },
                ],
                processing_and_queries: [
                    // {
                    //     label: "Print Pending Requisition",
                    //     icon: "mdi-file-document-edit",
                    //     form: "PrintPendingRequisition",
                    //     rule: "",
                    // },
                ],
                table_and_template: [
                    // {
                    //     label: "Discount Schemes",
                    //     icon: "mdi-file-document-edit",
                    //     form: "DiscountSchemes",
                    //     rule: "",
                    // },
                    // {
                    //     label: "Price Schemes",
                    //     icon: "mdi-file-document-edit",
                    //     form: "PriceSchemes",
                    //     rule: "",
                    // },
                ]
            },
            {
                label: "Pharmacy Services",
                icon: "mdi-pill",
                path: "/services/pharmacy-services",
                rule: "browse_pharmacyservices",
                subcomponents: [],
                processing_and_queries: [],
                table_and_template: []
            },
            {
                label: "Laboratory Services",
                icon: "mdi-needle",
                path: "/services/laboratory-services",
                rule: "browse_laboratoryservices",
                subcomponents: [],
                processing_and_queries: [],
                table_and_template: []
            },
            {
                label: "Radiology Services",
                icon: "mdi-skull-scan-outline",
                path: "/services/radiology-services",
                rule: "browse_radiologyservices",
                subcomponents: [],
                processing_and_queries: [],
                table_and_template: []
            },
            {
                label: "Cardiology Services",
                icon: "mdi-heart-box",
                path: "/services/cardiology-services",
                rule: "browse_radiologyservices", // Subject to change
                subcomponents: [],
                processing_and_queries: [],
                table_and_template: []
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
                subcomponents: [
                    {
                        label: "Billing Schedule Details",
                        icon: "mdi-file-document-edit",
                        rule: "",
                    },
                    {
                        label: "Print Billing Schedule",
                        icon: "mdi-file-document-edit",
                        rule: "",
                    },
                    {
                        label: "Post Bill Receipt Date",
                        icon: "mdi-file-document-edit",
                        rule: "",
                    },
                    {
                        label: "Unpost Bill Receipt Date",
                        icon: "mdi-file-document-edit",
                        rule: "",
                    },
                ],
                processing_and_queries: [],
                table_and_template: [

                ]
            },
            {
                label: "Cashier",
                icon: "mdi-cash-register",
                path: "/transactions/cashier",
                rule: "browse_cashier",
                subcomponents: [],
                processing_and_queries: [],
                table_and_template: []
            },
            {
                label: "Guarantors Billing",
                icon: "mdi-account-child",
                path: "/transactions/guarantors-billing",
                rule: "browse_guarantorsbilling",
                subcomponents: [
                    {
                        label: "Guarantor .Customer Profile",
                        icon: "mdi-file-document-edit",
                        rule: "",
                    },
                    {
                        label: "Patient List",
                        icon: "mdi-file-document-edit",
                        rule: "",
                    },
                    {
                        label: "List of Dependants",
                        icon: "mdi-file-document-edit",
                        rule: "",
                    },
                    {
                        label: "Corporate Medical Package",
                        icon: "mdi-file-document-edit",
                        rule: "",
                    },
                    {
                        label: "Merge Account to",
                        icon: "mdi-file-document-edit",
                        rule: "",
                    },
                    {
                        label: "Contract Management",
                        icon: "mdi-file-document-edit",
                        rule: "",
                    },
                ],
                processing_and_queries: [],
                table_and_template: []
            },
            {
                label: "Refunds",
                icon: "mdi-cash-edit",
                path: "/transactions/refunds",
                rule: "browse_refunds",
                subcomponents: [
                    {
                        label: "Patient Refund Details",
                        icon: "mdi-file-document-edit",
                        rule: "",
                    },
                    {
                        label: "Print Patient Refund Voucher",
                        icon: "mdi-file-document-edit",
                        rule: "",
                    },
                ],
                processing_and_queries: [
                    {
                        label: "Patient Refunds Report",
                        icon: "mdi-file-document-edit",
                        rule: "",
                    },
                ],
                table_and_template: []
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
                processing_and_queries: [],
                table_and_template: []
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

                    // },
                    {
                        label: "Nurse Stations",
                        icon: "mdi-file-document",
                        form: "NurseStationDialog",
                        // path: "/system-settings/system-users/nurse-stations",
                    },
                    {
                        label: "Reports",
                        icon: "mdi-file-document",
                        // path: "/system-settings/system-users/reports",
                    },
                ],
                processing_and_queries: [],
                table_and_template: []
            },
            {
                label: "Report Manager",
                icon: "mdi-chart-bar",
                path: "/system-settings/report-manager",
                // rule: "browse_reports", no rule like this yet
                rule: "browse_settings", // for now so that I can access the page
                subcomponents: [],
                processing_and_queries: [],
                table_and_template: []
            },
            {
                label: "Build File / Templates",
                icon: "mdi-form-select",
                path: "/build-file",
                rule: "browse_settings", 
                subcomponents: [],
                processing_and_queries: [],
                table_and_template: [
                    {
                        label: "Admission Source",
                        icon: "mdi-file-document",
                        form: "AdmissionSource", 
                        rule: ""
                    },
                    {
                        label: "Admission Type",
                        icon: "mdi-file-document",
                        form: "AdmissionType", 
                        rule: ""
                    },
                    {
                        label: "Age Bracket",
                        icon: "mdi-file-document",
                        form: "AgeBracket",
                        rule: ""
                    },
                    {
                        label: "Bed Status",
                        icon: "mdi-file-document",
                        form: "BedStatus", 
                        rule: ""
                    },
                    {
                        label: "Blood Type",
                        icon: "mdi-file-document",
                        form: "BloodType", 
                        rule: ""
                    },
                    {
                        label: "Death Types",
                        icon: "mdi-file-document",
                        form: "DeathType", 
                        rule: ""
                    },
                    {
                        label: "Transaction Type",
                        icon: "mdi-file-document",
                        form: "TransactionType", 
                        rule: ""
                    },
                    {
                        label: "Hospital Plan",
                        icon: "mdi-file-document",
                        form: "HospitalPlan", 
                        rule: ""
                    },
                    {
                        label: "Antibiotic Class",
                        icon: "mdi-file-document",
                        form: "AntibioticClass", 
                        rule: ""
                    },
                    {
                        label: "Therapeutic Class",
                        icon: "mdi-file-document",
                        form: "TherapeuticClass", 
                        rule: ""
                    },
                    {
                        label: "ID Types",
                        icon: "mdi-file-document",
                        form: "IDTypes",
                        rule: ""
                    },
                    {
                        label: "Religion",
                        icon: "mdi-file-document",
                        form: "Religion",
                        rule: ""
                    },
                    {
                        label: "Nationality",
                        icon: "mdi-file-document",
                        form: "Nationality",
                        rule: ""
                    },
                    {
                        label: "Sex",
                        icon: "mdi-file-document",
                        form: "Sex",
                        rule: ""
                    },
                    {
                        label: "Civil Status",
                        icon: "mdi-file-document",
                        form: "CivilStatus",
                        rule: ""
                    },
                    {
                        label: "Status",
                        icon: "mdi-file-document",
                        form: "Status",
                        rule: ""
                    },
                    {
                        label: "Shifts",
                        icon: "mdi-file-document",
                        form: "Shift",
                        rule: ""
                    },
                    {
                        label: "Patient Relation",
                        icon: "mdi-file-document",
                        form: "PatientRelation",
                        rule: ""
                    },
                    {
                        label: "Doctor Category",
                        icon: "mdi-file-document",
                        form: "DoctorCategory",
                        rule: ""
                    },
                    {
                        label: "Service Type",
                        icon: "mdi-file-document",
                        form: "ServiceType",
                        rule: ""
                    },
                    {
                        label: "Suffix",
                        icon: "mdi-file-document",
                        form: "Suffix",
                        rule: ""
                    },
                    {
                        label: "Payment Method",
                        icon: "mdi-file-document",
                        form: "PaymentMethod",
                        rule: ""
                    },
                    {
                        label: "Refund Type",
                        icon: "mdi-file-document",
                        form: "RefundType",
                        rule: ""
                    },
                    {
                        label: "Approver Level",
                        icon: "mdi-file-document",
                        form: "ApproverLevel",
                        rule: ""
                    },
                    {
                        label: "Supplier Terms",
                        icon: "mdi-file-document",
                        form: "SupplierTerms",
                        rule: ""
                    },
                    {
                        label: "Supplier Types",
                        icon: "mdi-file-document",
                        form: "SupplierTypes",
                        rule: ""
                    },
                    {
                        label: "Banks",
                        icon: "mdi-file-document",
                        form: "Bank",
                        rule: ""
                    },
                    {
                        label: "Bank Account",
                        icon: "mdi-file-document",
                        form: "BankAccount",
                        rule: ""
                    },
                    {
                        label: "Credit Cards",
                        icon: "mdi-file-document",
                        form: "BankAccountCreditCard",
                        rule: ""
                    },
                    {
                        label: "Debit Cards",
                        icon: "mdi-file-document",
                        form: "BankAccountDebitCard",
                        rule: ""
                    },
                    {
                        label: "Account Type",
                        icon: "mdi-file-document",
                        form: "AccountType",
                        rule: ""
                    },
                    {
                        label: "Account Class",
                        icon: "mdi-file-document",
                        form: "AccountClass",
                        rule: ""
                    },
                    {
                        label: "Account Group",
                        icon: "mdi-file-document",
                        form: "AccountGroup",
                        rule: ""
                    },
                    {
                        label: "Cost Center",
                        icon: "mdi-file-document",
                        form: "CostCenter",
                        rule: ""
                    },
                    {
                        label: "Medicare Type",
                        icon: "mdi-file-document",
                        form: "MedicareType",
                        rule: ""
                    },
                    {
                        label: "Revenue Class",
                        icon: "mdi-file-document",
                        form: "RevenueClass",
                        rule: ""
                    },
                    {
                        label: "Transaction Classification",
                        icon: "mdi-file-document",
                        form: "TransactionClassification",
                        rule: ""
                    },
                    {
                        label: "Transaction Code",
                        icon: "mdi-file-document",
                        form: "TransactionCode",
                        rule: ""
                    },
                    {
                        label: "Country",
                        icon: "mdi-file-document",
                        form: "Country",
                        rule: ""
                    },
                    {
                        label: "Region",
                        icon: "mdi-file-document",
                        form: "Region",
                        rule: ""
                    },
                    {
                        label: "Province",
                        icon: "mdi-file-document",
                        form: "Province",
                        rule: ""
                    },
                    {
                        label: "Municipality",
                        icon: "mdi-file-document",
                        form: "Municipality",
                        rule: ""
                    },
                    {
                        label: "Barangay",
                        icon: "mdi-file-document",
                        form: "Barangay",
                        rule: ""
                    },
                    {
                        label: "Zipcode",
                        icon: "mdi-file-document",
                        form: "ZipCode",
                        rule: ""
                    },
                ]
            },
        ],
    },
];
