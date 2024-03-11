
import { TableAndTemplateFormDialog } from "~/store/TableAndTemplateFormDialog";
// Master file table and template form dialog imports
import { PatientsTemplateDialog } from "~/store/table-templates/master-file/PatientsTemplateDialog";
import { ConsultantsTemplateDialog } from "~/store/table-templates/master-file/ConsultantsTemplateDialog";
import { RoomsBedsTemplateDialog } from "~/store/table-templates/master-file/RoomsBedsTemplateDialog";
import { ItemServicesSuppliesTemplateDialog } from "~/store/table-templates/master-file/ItemServicesSuppliesTemplateDialog";

export const useTableAndTemplate = async (dialog:any) => {
    // Master file table template form dialog states
    const { setPatientsDialog } = PatientsTemplateDialog(); // Master file patients template form dialog state
    const { setConsultantsDialog } = ConsultantsTemplateDialog(); // Master file consultants template form dialog state
    const { setRoomsBedsDialog } = RoomsBedsTemplateDialog(); // Master file rooms and beds template form dialog state
    const { setItemServicesSuppliesDialog } = ItemServicesSuppliesTemplateDialog(); // Master file items supplies and services template form dialog state

    const {setDialog} = TableAndTemplateFormDialog(); // Only system users dialog ang nabilin dre sir cel

    setPatientsDialog(dialog);
    setConsultantsDialog(dialog);
    setRoomsBedsDialog(dialog);
    setItemServicesSuppliesDialog(dialog);
    setDialog(dialog); 
}