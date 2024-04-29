// Master file sub components dialog imports
import { MFConsultantsDialog } from "~/store/sub-components/master-file/MFConsultantsDialog";
// Services sub components dialog imports
import { OpdSubComponentsDialog } from "~/store/sub-components/services/OpdSubComponentsDialog";

export const useSubComponents = async (dialog: any, type: Boolean = true) => {
    // Master file sub components dialog states
    const { setMFConsultantsDialog } = MFConsultantsDialog();

    // Services sub components dialog states
    const { setOpdSubComponentsDialog } = OpdSubComponentsDialog();

    // Master file
    setMFConsultantsDialog(dialog, type);
    // Services
    setOpdSubComponentsDialog(dialog, type);
};