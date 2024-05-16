import { TableAndTemplateFormDialog } from "~/store/TableAndTemplateFormDialog";
// Master file table and template form dialog imports
import { PatientsTemplateDialog } from "~/store/table-templates/master-file/PatientsTemplateDialog";
import { ConsultantsTemplateDialog } from "~/store/table-templates/master-file/ConsultantsTemplateDialog";
import { RoomsBedsTemplateDialog } from "~/store/table-templates/master-file/RoomsBedsTemplateDialog";
import { ItemServicesSuppliesTemplateDialog } from "~/store/table-templates/master-file/ItemServicesSuppliesTemplateDialog";
// Services table and template form dialog imports
import { OutPatientsTemplateDialog } from "~/store/table-templates/services/OutPatientsTemplateDialog";
import { InPatientsTemplateDialog } from "~/store/table-templates/services/InPatientsTemplateDialog";
import { EmergencyTemplateDialog } from "~/store/table-templates/services/EmergencyTemplateDialog";
import { NursingServicesTemplateDialog } from "~/store/table-templates/services/NursingServicesTemplateDialog";
import { DietaryServicesTemplateDialog } from "~/store/table-templates/services/DietaryServicesTemplateDialog";
import { AncillaryServicesTemplateDialog } from "~/store/table-templates/services/AncillaryServicesTemplateDialog";

import { BuildFileDialog } from "~/store/table-templates/build-file/BuildFileDialog";

export const useTableAndTemplate = async (dialog:any, type:Boolean = true) => {
    // Master file table template form dialog states
    const { setPatientsDialog } = PatientsTemplateDialog(); 
    const { setConsultantsDialog } = ConsultantsTemplateDialog(); 
    const { setRoomsBedsDialog } = RoomsBedsTemplateDialog(); 
    const { setItemServicesSuppliesDialog } = ItemServicesSuppliesTemplateDialog(); 
    const { setBuildFileDialog } = BuildFileDialog(); 

    // Services table template form dialog states
    const { setOutPatientsDialog } = OutPatientsTemplateDialog()
    const { setInPatientsDialog } = InPatientsTemplateDialog()
    const { setEmergencyDialog } = EmergencyTemplateDialog()
    const { setNursingServicesDialog} = NursingServicesTemplateDialog()
    const { setDietaryServicesDialog } = DietaryServicesTemplateDialog()
    const { setAncillaryServicesDialog } = AncillaryServicesTemplateDialog()

    const { setDialog } = TableAndTemplateFormDialog(); // Only system users dialog ang nabilin dre sir cel

    
    // Master file
    setPatientsDialog(dialog, type);
    setConsultantsDialog(dialog, type);
    setRoomsBedsDialog(dialog, type);
    setItemServicesSuppliesDialog(dialog, type);
    // Services
    setOutPatientsDialog(dialog, type);
    setInPatientsDialog(dialog, type);
    setEmergencyDialog(dialog, type);
    setNursingServicesDialog(dialog, type);
    setDietaryServicesDialog(dialog, type);
    setAncillaryServicesDialog(dialog, type);

    // Transactions
    setDialog(dialog); 
    
    // build File 
    setBuildFileDialog(dialog,type);
}