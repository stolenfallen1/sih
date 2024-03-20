
import { TableAndTemplateFormDialog } from "~/store/TableAndTemplateFormDialog";
// Master file table and template form dialog imports
import { PatientsTemplateDialog } from "~/store/table-templates/master-file/PatientsTemplateDialog";
import { ConsultantsTemplateDialog } from "~/store/table-templates/master-file/ConsultantsTemplateDialog";
import { RoomsBedsTemplateDialog } from "~/store/table-templates/master-file/RoomsBedsTemplateDialog";
import { ItemServicesSuppliesTemplateDialog } from "~/store/table-templates/master-file/ItemServicesSuppliesTemplateDialog";
// Services table and template form dialog imports
import { OutPatientsTemplateDialog } from "~/store/table-templates/services/OutPatientsTemplateDialog";
import { InPatientsTemplateDialog } from "~/store/table-templates/services/InPatientsTemplateDialog";

import { BuildFileDialog } from "~/store/table-templates/build-file/BuildFileDialog";

export const useTableAndTemplate = async (dialog:any,type:Boolean = true) => {
    // Master file table template form dialog states
    const { setPatientsDialog } = PatientsTemplateDialog(); // Master file patients template form dialog state
    const { setConsultantsDialog } = ConsultantsTemplateDialog(); // Master file consultants template form dialog state
    const { setRoomsBedsDialog } = RoomsBedsTemplateDialog(); // Master file rooms and beds template form dialog state
    const { setItemServicesSuppliesDialog } = ItemServicesSuppliesTemplateDialog(); // Master file items supplies and services template form dialog state
    const { setBuildFileDialog } = BuildFileDialog(); // Build file  template form dialog state

    // Services table template form dialog states
    const { setOutPatientsDialog } = OutPatientsTemplateDialog()
    const { setInPatientsDialog } = InPatientsTemplateDialog()

    const {setDialog} = TableAndTemplateFormDialog(); // Only system users dialog ang nabilin dre sir cel

    
    // Master file
    setPatientsDialog(dialog);
    setConsultantsDialog(dialog);
    setRoomsBedsDialog(dialog);
    setItemServicesSuppliesDialog(dialog);
    // Services
    setOutPatientsDialog(dialog);
    setInPatientsDialog(dialog);

    setDialog(dialog); 
    
    // build File 
    setBuildFileDialog(dialog,type);
}