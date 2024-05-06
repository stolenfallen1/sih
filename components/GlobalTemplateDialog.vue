<template>
  <!-- Master File -->

  <!-- Patients Master File -->
  <DiscountSchemesDialog 
    :show="DiscountSchemes"
    @close-dialog="useTableAndTemplate('DiscountSchemes', false)"
  />
  <MedicalServiceTypesDialog 
    :show="MedicalServiceTypes"
    @close-dialog="useTableAndTemplate('MedicalServiceTypes', false)"
  />
  <MedicalSubServiceTypesDialog 
    :show="MedicalSubServiceTypes"
    @close-dialog="useTableAndTemplate('MedicalSubServiceTypes', false)"
  />
  <PriceSchemesDialog 
    :show="PriceSchemes"
    @close-dialog="useTableAndTemplate('PriceSchemes', false)"
  />
  <PriceGroupDialog 
    :show="PriceGroup"
    @close-dialog="useTableAndTemplate('PriceGroup', false)"
  />
  <DocumentCategoriesDialog 
    :show="DocumentCategories"
    @close-dialog="useTableAndTemplate('DocumentCategories', false)"
  />
  <PatientAddInfoDialog 
    :show="PatientAddtionalInformation"
    @close-dialog="useTableAndTemplate('PatientAddtionalInformation', false)"
  />
  <BadHabitsDialog 
    :show="BadHabits"
    @close-dialog="useTableAndTemplate('BadHabits', false)"
  />
  <AuthoritiesDialog
    :show="Authorities"
    @close-dialog="useTableAndTemplate('Authorities', false)"
  />
  <EmploymentInfoPositionDialog 
    :show="EmploymentInformationPositions"
    @close-dialog="useTableAndTemplate('EmploymentInformationPositions', false)"
  />
  <EmployerNameDialog 
    :show="EmployerName"
    @close-dialog="useTableAndTemplate('EmployerName', false)"
  />
  <OtherSpecialistDialog 
    :show="OtherSpecialist"
    @close-dialog="useTableAndTemplate('OtherSpecialist', false)"
  />
  <FacilitiesDialog 
    :show="Facilities"
    @close-dialog="useTableAndTemplate('Facilities', false)"
  />
  <LoaDepartmentDialog 
    :show="LoaDepartment"
    @close-dialog="useTableAndTemplate('LoaDepartment', false)"
  />
  <MilitaryClassificationDialog 
    :show="MilitaryClassification"
    @close-dialog="useTableAndTemplate('MilitaryClassification', false)"
  />

  <!-- Consultants Master File -->
  <ConsultantSpecializationsDialog 
    :show="ConsultantSpecializations" 
    @close-dialog="useTableAndTemplate('ConsultantSpecializations', false)" 
  />
  <ConsultantSpecializationsDialog />
  <MedicalServiceTypesDialog 
    :show="MedicalServiceTypes"
    @close-dialog="useTableAndTemplate('MedicalServiceTypes', false)"
  />
  <MedicalSubServiceTypesDialog 
    :show="MedicalSubServiceTypes"
    @close-dialog="useTableAndTemplate('MedicalSubServiceTypes', false)"
  />
  <ConsultantRoleTypesDialog 
    :show="ConsultantRoleTypes"
    @close-dialog="useTableAndTemplate('ConsultantRoleTypes', false)"
  />
  <DoctorsDepartmentDialog 
    :show="DoctorsDepartment"
    @close-dialog="useTableAndTemplate('DoctorsDepartment', false)"
  />
  <DoctorsRebateCategoryDialog 
    :show="DoctorsRebateCategory"
    @close-dialog="useTableAndTemplate('DoctorsRebateCategory', false)"
  />

  <!-- Rooms and Beds -->
  <BuildingsFloorsDialog 
    :show="BuildingsFloors"
    @close-dialog="useTableAndTemplate('BuildingsFloors', false)"
  />
  <NursingStationsWardsDialog 
    :show="NursingStationsWards"
    @close-dialog="useTableAndTemplate('NursingStationsWards', false)"
  />
  <RoomClassificationTypesDialog 
    :show="RoomClassificationTypes"
    @close-dialog="useTableAndTemplate('RoomClassificationTypes', false)"
  />
  <RoomChargeSettingsDialog 
    :show="RoomChargeSettings"
    @close-dialog="useTableAndTemplate('RoomChargeSettings', false)"
  />
  <RoomPriceSchemesDialog 
    :show="RoomPriceSchemes"
    @close-dialog="useTableAndTemplate('RoomPriceSchemes', false)"
  />
  <RoomStatusDialog 
    :show="RoomStatus"
    @close-dialog="useTableAndTemplate('RoomStatus', false)"
  />
  <RoomUsageTypeDialog 
    :show="RoomUsageTypes"
    @close-dialog="useTableAndTemplate('RoomUsageTypes', false)"
  />
  <BedStatusDialog 
    :show="BedStatus"
    @close-dialog="useTableAndTemplate('BedStatus', false)"
  />

  <!-- Items Supplies and Services -->
  <BillingReportCategoryDialog
      :show="BillingReportCategory"
      @close-dialog="useTableAndTemplate('BillingReportCategory', false)"
  />
  <CollectionReportMainDialog 
      :show="CollectionReportMainHeader" 
      @close-dialog="useTableAndTemplate('CollectionReportMainHeader', false)" 
  />
  <CollectionReportGroupDialog 
      :show="CollectionReportGroupHeader"  
      @close-dialog="useTableAndTemplate('CollectionReportGroupHeader', false)"
  />
  <CptModifierDialog 
      :show="CptModifiers" 
      @close-dialog="useTableAndTemplate('CptModifiers', false)"
  />
  <CptSectionDialog 
      :show="CptSections"
      @close-dialog="useTableAndTemplate('CptSections', false)"
  />
  <CptSubSectionDialog 
      :show="CptSubSections"
      @close-dialog="useTableAndTemplate('CptSubSections', false)"
  />
  <DepartmentGroupDialog 
      :show="DepartmentGroups"
      @close-dialog="useTableAndTemplate('DepartmentGroups', false)"
  />
  <DepartmentWarehousesDialog 
      :show="DepartmentWarehouses"
      @close-dialog="useTableAndTemplate('DepartmentWarehouses', false)"
  />
  <DosageDialog 
      :show="Dosages"
      @close-dialog="useTableAndTemplate('Dosages', false)"
  />
  <DrugAdminGroupDialog 
      :show="DrugAdminGroups"
      @close-dialog="useTableAndTemplate('DrugAdminGroups', false)"
  />
  <DohDrugListDialog 
      :show="DohDrugLists"
      @close-dialog="useTableAndTemplate('DohDrugLists', false)"
  />
  <DxMedicalPackagesDialog 
      :show="DxMedicalPackages"
      @close-dialog="useTableAndTemplate('DxMedicalPackages', false)"
  />
  <GenericNameDialog 
      :show="GenericNames"
      @close-dialog="useTableAndTemplate('GenericNames', false)"
  />
  <IndicationDialog 
      :show="Indications"
      @close-dialog="useTableAndTemplate('Indications', false)"
  />
  <ItemCategoriesDialog
      :show="ItemCategories"
      @close-dialog="useTableAndTemplate('ItemCategories', false)"
  />
  <ItemPriceGroupsDialog 
      :show="ItemPriceGroups"
      @close-dialog="useTableAndTemplate('ItemPriceGroups', false)"
  />
  <ItemPricingSchemesDialog 
      :show="ItemPricingSchemes"
      @close-dialog="useTableAndTemplate('ItemPricingSchemes', false)"
  />
  <ItemTemplatesDialog 
      :show="ItemTemplates"
      @close-dialog="useTableAndTemplate('ItemTemplates', false)"
  />
  <ItemUnitsDialog 
      :show="ItemUnits"
      @close-dialog="useTableAndTemplate('ItemUnits', false)"
  />
  <MedicationDurationsDialog 
      :show="MedicationDurations"
      @close-dialog="useTableAndTemplate('MedicationDurations', false)"
  />
  <MedicationFrequenciesDialog 
      :show="MedicationFrequencies"
      @close-dialog="useTableAndTemplate('MedicationFrequencies', false)"
  />
  <MedicationPreparationsDialog 
      :show="MedicationPreparations"
      @close-dialog="useTableAndTemplate('MedicationPreparations', false)"
  />
  <MedicationRoutesDialog 
      :show="Routes"
      @close-dialog="useTableAndTemplate('Routes', false)"
  />
  <OthersDialog 
      :show="Others"
      @close-dialog="useTableAndTemplate('Others', false)"
  />
  <PhicItemCategoriesDialog 
      :show="PhicItemCategories"
      @close-dialog="useTableAndTemplate('PhicItemCategories', false)"
  />  
  <UnitOfMeasuresDialog 
      :show="UnitOfMeasures"
      @close-dialog="useTableAndTemplate('UnitOfMeasures', false)"
  />
  <ModalitiesDialog 
      :show="Modalities"
      @close-dialog="useTableAndTemplate('Modalities', false)"
  />
  <SpecimensDialog 
      :show="Specimens"
      @close-dialog="useTableAndTemplate('Specimens', false)"
  />

  <!-- Services -->
  <!-- Outpatients -->
  <AdjustmentTypesDialog 
    :show="AdjustmentTypes"
    @close-dialog="useTableAndTemplate('AdjustmentTypes', false)"
  />
  <AllergiesDialog 
    :show="Allergies"
    @close-dialog="useTableAndTemplate('Allergies', false)"
  />
  <BillingTemplateDialog
    :show="BillingTemplates"
    @close-dialog="useTableAndTemplate('BillingTemplates', false)"
  />
  <BillingTemplateGroupDialog 
    :show="BillingTemplateGroups"
    @close-dialog="useTableAndTemplate('BillingTemplateGroups', false)"
  />
  <CsCaseIndicatorsDialog
    :show="CsCaseIndicators"
    @close-dialog="useTableAndTemplate('CsCaseIndicators', false)"
  />
  <DiscountSchemesDialog 
    :show="DiscountSchemes"
    @close-dialog="useTableAndTemplate('DiscountSchemes', false)"
  />
  <DispositionTypesDialog
    :show="DispositionTypes"
    @close-dialog="useTableAndTemplate('DispositionTypes', false)"
  />
  <ExcellenceCentersDialog
    :show="ExcellenceCenters"
    @close-dialog="useTableAndTemplate('ExcellenceCenters', false)"
  />
  <ReferringCentersDialog 
    :show="ReferringCenters"
    @close-dialog="useTableAndTemplate('ReferringCenters', false)"
  />
  <MedicalServiceTypesDialog 
    :show="MedicalServiceTypes"
    @close-dialog="useTableAndTemplate('MedicalServiceTypes', false)"
  />
  <MedicalSubServiceTypesDialog 
    :show="MedicalSubServiceTypes"
    @close-dialog="useTableAndTemplate('MedicalSubServiceTypes', false)"
  />
  <PriceSchemesDialog 
    :show="PriceSchemes"
    @close-dialog="useTableAndTemplate('PriceSchemes', false)"
  />
  <HospitalizationTransactionTypesDialog 
    :show="TransactionType"
    @close-dialog="useTableAndTemplate('TransactionType', false)"
  />
  <HospitalizationTypesDialog 
    :show="HospitalizationTypes"
    @close-dialog="useTableAndTemplate('HospitalizationTypes', false)"
  />
  <HospitalizationPlansDialog
    :show="HospitalizationPlans"
    @close-dialog="useTableAndTemplate('HospitalizationPlans', false)"
  />
  <HospitalizationCaseTypesDialog
    :show="HospitalizationCaseTypes"
    @close-dialog="useTableAndTemplate('HospitalizationCaseTypes', false)"
  />
  <InternalControlTableDialog 
    :show="InternalControlTable"
    @close-dialog="useTableAndTemplate('InternalControlTable', false)"
  />
  <ListOfAttendantDialog 
    :show="ListOfAttendant"
    @close-dialog="useTableAndTemplate('ListOfAttendant', false)"
  />
  <SurgicalProceduresDialog 
    :show="SurgicalProcedures"
    @close-dialog="useTableAndTemplate('SurgicalProcedures', false)"
  />
  <SurgicalProcedureCategoryDialog
    :show="SurgicalProceduresCategory"
    @close-dialog="useTableAndTemplate('SurgicalProceduresCategory', false)"
  />
  <BodySystemsDialog
    :show="BodySystems"
    @close-dialog="useTableAndTemplate('BodySystems', false)"
  />
  <BodyOrgansDialog 
    :show="BodyOrgans"
    @close-dialog="useTableAndTemplate('BodyOrgans', false)"
  />
  <TypesOfAnesthesiaDialog
    :show="TypesOfAnesthesia"
    @close-dialog="useTableAndTemplate('TypesOfAnesthesia', false)"
  />
  <DocumentCategoriesDialog 
    :show="DocumentCategories"
    @close-dialog="useTableAndTemplate('DocumentCategories', false)"
  />
  <OtherHospitalServicesDialog 
    :show="OtherHospitalServices"
    @close-dialog="useTableAndTemplate('OtherHospitalServices', false)"
  />
  <MedicalSocialServiceDialog 
    :show="MedicalSocialServiceTemplate"
    @close-dialog="useTableAndTemplate('MedicalSocialServiceTemplate', false)"
  />
  <ListOfPetDialog 
    :show="ListOfPetBreed"
    @close-dialog="useTableAndTemplate('ListOfPetBreed', false)"
  />
  <EducationalAttainmentsDialog 
    :show="EducationalAttainments"
    @close-dialog="useTableAndTemplate('EducationalAttainments', false)"
  />
  <RegistryGroupDialog 
    :show="RegistryGroup"
    @close-dialog="useTableAndTemplate('RegistryGroup', false)"
  />
  <!-- Emergency -->
  <ErAreasDialog 
    :show="ErAreas"
    @close-dialog="useTableAndTemplate('ErAreas', false)"
  />
  <!-- Inpatients -->
  <AdmissionResultDialog 
    :show="AdmissionResult"
    @close-dialog="useTableAndTemplate('AdmissionResult', false)"
  />
  <!-- Nursing Services -->
  <NursingEndorsementDialog 
    :show="NursingEndorsement"
    @close-dialog="useTableAndTemplate('NursingEndorsement', false)"
  />
  <ReferralCausesDialog 
    :show="ReferralCauses"
    @close-dialog="useTableAndTemplate('ReferralCauses', false)"
  />

  <!-- Dietary Services -->
  <DietListDialog 
    :show="DietList"
    @close-dialog="useTableAndTemplate('DietList', false)"
  />
  <DietMealTypeDialog 
    :show="DietMealType"
    @close-dialog="useTableAndTemplate('DietMealType', false)"
  />
  <DietTypeDialog 
    :show="DietType"
    @close-dialog="useTableAndTemplate('DietType', false)"
  />
  <DietSubTypesDialog 
    :show="DietSubTypes"
    @close-dialog="useTableAndTemplate('DietSubTypes', false)"
  />

  <!-- Settings and Others -->
  <!-- Build File -->
  <AdmissionSourceDialog 
        :show="AdmissionSource"
        @close-dialog="useTableAndTemplate('AdmissionSource',false);"
    />
    <AdmissionTypeDialog 
        :show="AdmissionType"
        @close-dialog="useTableAndTemplate('AdmissionType',false);"
    />
    <AgeBracketDialog 
        :show="AgeBracket"
        @close-dialog="useTableAndTemplate('AgeBracket',false);"
    />
    <BedStatusDialog 
        :show="BedStatus"
        @close-dialog="useTableAndTemplate('BedStatus',false);"
    />
    <BloodTypeDialog 
        :show="BloodType"
        @close-dialog="useTableAndTemplate('BloodType',false);"
    />
    <DeathTypeDialog 
        :show="DeathType"
        @close-dialog="useTableAndTemplate('DeathType',false);"
    />
    <TransactionTypeDialog 
        :show="TransactionType"
        @close-dialog="useTableAndTemplate('TransactionType',false);"
    />
    <HospitalPlanDialog 
        :show="HospitalPlan"
        @close-dialog="useTableAndTemplate('HospitalPlan',false);"
    />
    <AntibioticClassDialog 
      :show="AntibioticClass"
      @close-dialog="useTableAndTemplate('AntibioticClass',false);"
    />
    <TherapeuticClassDialog 
      :show="TherapeuticClass"
      @close-dialog="useTableAndTemplate('TherapeuticClass',false);"
    />
    <IDTypesDialog 
        :show="IDTypes"
        @close-dialog="useTableAndTemplate('IDTypes',false);"
    />
    <NationalityDialog 
        :show="Nationality"
        @close-dialog="useTableAndTemplate('Nationality',false);"
    />
    <ReligionDialog 
        :show="Religion"
        @close-dialog="useTableAndTemplate('Religion',false);"
    />
    <SexDialog 
        :show="Sex"
        @close-dialog="useTableAndTemplate('Sex',false);"
    />
    <CivilStatusDialog 
        :show="CivilStatus"
        @close-dialog="useTableAndTemplate('CivilStatus',false);"
    />
    <StatusDialog 
        :show="Status"
        @close-dialog="useTableAndTemplate('Status',false);"
    />
    <ShiftDialog 
        :show="Shift"
        @close-dialog="useTableAndTemplate('Shift',false);"
    />
    <PatientRelationDialog 
        :show="PatientRelation"
        @close-dialog="useTableAndTemplate('PatientRelation',false);"
    />
    <DoctorCategoryDialog 
        :show="DoctorCategory"
        @close-dialog="useTableAndTemplate('DoctorCategory',false);"
    />
    <ServiceTypeDialog 
        :show="ServiceType"
        @close-dialog="useTableAndTemplate('ServiceType',false);"
    />
    <SuffixDialog 
        :show="Suffix"
        @close-dialog="useTableAndTemplate('Suffix',false);"
    />
    <PaymentMethodDialog 
        :show="PaymentMethod"
        @close-dialog="useTableAndTemplate('PaymentMethod',false);"
    />
    <RefundTypeDialog 
        :show="RefundType"
        @close-dialog="useTableAndTemplate('RefundType',false);"
    />
    <ApproverLevelDialog 
        :show="ApproverLevel"
        @close-dialog="useTableAndTemplate('ApproverLevel',false);"
    />
    <SupplierTermsDialog 
        :show="SupplierTerms"
        @close-dialog="useTableAndTemplate('SupplierTerms',false);"
    />
    <SupplierTypesDialog 
        :show="SupplierTypes"
        @close-dialog="useTableAndTemplate('SupplierTypes',false);"
    />
    <BankDialog 
        :show="Bank"
        @close-dialog="useTableAndTemplate('Bank',false);"
    />
    <BankAccountDialog 
        :show="BankAccount"
        @close-dialog="useTableAndTemplate('BankAccount',false);"
    />
    <BankCreditCardDialog 
        :show="BankAccountCreditCard"
        @close-dialog="useTableAndTemplate('BankAccountCreditCard',false);"
    />
    <BankDebitCardDialog
        :show="BankAccountDebitCard"
        @close-dialog="useTableAndTemplate('BankAccountDebitCard',false);"
    />
    <AccountTypeDialog 
        :show="AccountType"
        @close-dialog="useTableAndTemplate('AccountType',false);"
    />
    <AccountClassDialog 
        :show="AccountClass"
        @close-dialog="useTableAndTemplate('AccountClass',false);"
    />
    <AccountGroupDialog 
        :show="AccountGroup"
        @close-dialog="useTableAndTemplate('AccountGroup',false);"
    />
    <CostCenterDialog 
        :show="CostCenter"
        @close-dialog="useTableAndTemplate('CostCenter',false);"
    />
    <MedicareTypeDialog 
        :show="MedicareType"
        @close-dialog="useTableAndTemplate('MedicareType',false);"
    />
    <RevenueClassDialog 
        :show="RevenueClass"
        @close-dialog="useTableAndTemplate('RevenueClass',false);"
    />
    <TransactionClassificationDialog 
      :show="TransactionClassification"
      @close-dialog="useTableAndTemplate('TransactionClassification', false)"
    />
    <TransactionCodeDialog 
      :show="TransactionCode"
      @close-dialog="useTableAndTemplate('TransactionCode', false)"
    />
    <CountryDialog 
      :show="Country"
      @close-dialog="useTableAndTemplate('Country', false)"
    />
    <RegionDialog 
      :show="Region"
      @close-dialog="useTableAndTemplate('Region', false)"
    />
    <ProvinceDialog 
      :show="Province"
      @close-dialog="useTableAndTemplate('Province', false)"
      />
    <MunicipalityDialog 
      :show="Municipality"
      @close-dialog="useTableAndTemplate('Municipality', false)"
    />
    <BarangayDialog 
      :show="Barangay"
      @close-dialog="useTableAndTemplate('Barangay', false)"
    />
    <ZipCodeDialog 
      :show="ZipCode"
      @close-dialog="useTableAndTemplate('ZipCode', false)"
    />
  
</template>

<script setup>
// ------------------------ Master File ------------------------
// Patients Master File
const { 
  DiscountSchemes,
  MedicalServiceTypes,
  MedicalSubServiceTypes,
  PriceSchemes,
  PriceGroup,
  DocumentCategories,
  PatientAddtionalInformation,
  BadHabits,
  // IDTypes, 
  Authorities,
  EmploymentInformationPositions,
  EmployerName,
  OtherSpecialist,
  Facilities,
  LoaDepartment,
  MilitaryClassification,
} = storeToRefs(PatientsTemplateDialog())
// Consultant Master File
const {
  ConsultantSpecializations,
  // MedicalServiceTypes,
  // MedicalSubServiceTypes,
  ConsultantRoleTypes,
  DoctorsDepartment,
  // DoctorCategory, 
  DoctorsRebateCategory,
} = storeToRefs(ConsultantsTemplateDialog());
// Rooms and Beds Master File
const { 
  BuildingsFloors,
  NursingStationsWards,
  RoomClassificationTypes,
  RoomChargeSettings,
  RoomPriceSchemes,
  RoomStatus,
  RoomUsageTypes,
  BedStatus,
} = storeToRefs(RoomsBedsTemplateDialog());
// Items Supplies and Services Master File
const {
  BillingReportCategory,
  CollectionReportMainHeader,
  CollectionReportGroupHeader,
  CptModifiers,
  CptSections,
  CptSubSections,
  DepartmentGroups,
  DepartmentWarehouses,
  Dosages,
  DrugAdminGroups,
  DohDrugLists,
  DxMedicalPackages,
  GenericNames,
  Indications,
  ItemCategories,
  ItemPriceGroups,
  ItemPricingSchemes,
  ItemTemplates,
  ItemUnits,
  MedicationDurations,
  MedicationFrequencies,
  MedicationPreparations,
  Routes,
  Others,
  PhicItemCategories,
  UnitOfMeasures,
  Modalities,
  Specimens,
} = storeToRefs(ItemServicesSuppliesTemplateDialog())

// ------------------------ Services ------------------------
// Out-Patients 
const {
  AdjustmentTypes,
  Allergies,
  BillingTemplates,
  BillingTemplateGroups,
  CsCaseIndicators,
  // DiscountSchemes, 
  DispositionTypes,
  ExcellenceCenters,
  ReferringCenters,
  // MedicalServiceTypes, 
  // MedicalSubServiceTypes, 
  // PriceSchemes, 
  // TransactionType, 
  HospitalizationTypes,
  HospitalizationPlans,
  HospitalizationCaseTypes,
  InternalControlTable,
  ListOfAttendant,
  SurgicalProcedures,
  SurgicalProceduresCategory,
  BodySystems,
  BodyOrgans,
  TypesOfAnesthesia,
  // DocumentCategories, 
  OtherHospitalServices,
  MedicalSocialServiceTemplate,
  ListOfPetBreed,
  EducationalAttainments,
} = storeToRefs(OutPatientsTemplateDialog())
// In-Patients
const {  
  // AdjustmentTypes,  
  AdmissionResult, 
  // Allergies, 
  // BillingTemplates, 
  // BillingTemplateGroups, 
  // CsCaseIndicators, 
  // DeathType, 
  // DiscountSchemes, 
  // ExcellenceCenters, 
  // ReferringCenters, 
  // DispositionTypes, 
  // MedicalServiceTypes, 
  // MedicalSubServiceTypes, 
  // NursingStationsWards, 
  // RoomClassificationTypes,
  // RoomPriceSchemes,
  // HospitalizationTypes, 
  HospitalizationPlan,  
  // HospitalizationCaseTypes,  
  // TransactionType, 
  // InternalControlTable, 
  // ListOfAttendant,
  // SurgicalProcedures,  
  // SurgicalProceduresCategory,
  // BodySystems,  
  // BodyOrgans,  
  // TypesOfAnesthesia,  
  // MedicalSocialServiceTemplate,
  // OtherHospitalServices,
  // ListOfPetBreed, 
  RegistryGroup,
} = storeToRefs(InPatientsTemplateDialog())
// Emergency Services
const {
  // AdjustmentTypes,
  // Allergies,
  // BillingTemplates,
  // BillingTemplateGroups,
  // CsCaseIndicators,
  // DeathType,
  // DiscountSchemes,
  // DispositionTypes,
  ErAreas,
  // ExcellenceCenters,
  // ReferringCenters,
  // MedicalServiceTypes,
  // MedicalSubServiceTypes,
  // PriceSchemes,
  // HospitalizationTypes,
  // HospitalizationPlan,
  // HospitalizationCaseTypes,
  // TransactionType,
  // InternalControlTable,
  // ListOfAttendant,
  // SurgicalProcedures,
  // SurgicalProceduresCategory,
  // BodySystems,
  // BodyOrgans,
  // TypesOfAnesthesia,
  // MedicalSocialServiceTemplate,
  // ListOfPetBreed,
  // RegistryGroup,
} = storeToRefs(EmergencyTemplateDialog())
// Dietary Services
const {
  DietList,
  DietMealType,
  DietType,
  DietSubTypes,
} = storeToRefs(DietaryServicesTemplateDialog())
// Nursing Services
const { 
  // AdmissionResult,
  // CsCaseIndicators,
  // DeathType,
  NursingEndorsement,
  ReferralCauses,
} = storeToRefs(NursingServicesTemplateDialog())

// ------------------------ Transactions ------------------------

// ------------------------ Settings and Others ------------------------
// Build File 
const {
    AdmissionSource,
    AdmissionType,
    AgeBracket,
    // BedStatus, 
    BloodType,
    DeathType,
    TransactionType,
    HospitalPlan,
    AntibioticClass,
    TherapeuticClass,
    IDTypes,
    Nationality,
    Religion,
    Sex,
    CivilStatus,
    Status,
    Shift,
    PatientRelation,
    DoctorCategory,
    ServiceType,
    Suffix,
    PaymentMethod,
    RefundType,
    ApproverLevel,
    SupplierTerms,
    SupplierTypes,
    Bank,
    BankAccount,
    BankAccountCreditCard,
    BankAccountDebitCard,
    AccountType,
    AccountClass,
    AccountGroup,
    CostCenter,
    MedicareType,
    RevenueClass,
    TransactionClassification,
    TransactionCode,
    Country,
    Region,
    Province,
    Municipality,
    Barangay,
    ZipCode,
} = storeToRefs(BuildFileDialog());

</script>

<style scoped>
</style>