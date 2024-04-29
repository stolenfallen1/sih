// Master file sub components dialog imports
import { MFConsultantsDialog } from "~/store/sub-components/master-file/MFConsultantsDialog";
import { MFRoomsAndBedsDialog } from "~/store/sub-components/master-file/MFRoomsAndBedsDialog";
import { MFItemsAndServicesDialog } from "~/store/sub-components/master-file/MFItemsAndServicesDialog";
// Services sub components dialog imports
import { OpdSubComponentsDialog } from "~/store/sub-components/services/OpdSubComponentsDialog";

export const useSubComponents = async (dialog: any, type: Boolean = true) => {
    // Master file sub components dialog states
    const { setMFConsultantsDialog } = MFConsultantsDialog();
    const { setMFRoomsAndBedsDialog } = MFRoomsAndBedsDialog();
    const { setMFItemsAndServicesDialog } = MFItemsAndServicesDialog();

    // Services sub components dialog states
    const { setOpdSubComponentsDialog } = OpdSubComponentsDialog();

    // Master file
    setMFConsultantsDialog(dialog, type);
    setMFRoomsAndBedsDialog(dialog, type);
    setMFItemsAndServicesDialog(dialog, type);
    // Services
    setOpdSubComponentsDialog(dialog, type);
};