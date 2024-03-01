
import { TableAndTemplateFormDialog } from "~/store/TableAndTemplateFormDialog";
export const useTableAndTemplate = async (dialog:any) => {
    const {setDialog} = TableAndTemplateFormDialog();
    setDialog(dialog); 
}