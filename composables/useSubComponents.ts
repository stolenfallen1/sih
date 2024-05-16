// Master file sub components dialog imports
import { MFPatientsDialog } from "~/store/sub-components/master-file/MFPatientsDialog";
import { MFConsultantsDialog } from "~/store/sub-components/master-file/MFConsultantsDialog";
import { MFRoomsAndBedsDialog } from "~/store/sub-components/master-file/MFRoomsAndBedsDialog";
import { MFItemsAndServicesDialog } from "~/store/sub-components/master-file/MFItemsAndServicesDialog";
// Services sub components dialog imports
import { OpdSubComponentsDialog } from "~/store/sub-components/services/OpdSubComponentsDialog";
import { ERSubComponentsDialog } from "~/store/sub-components/services/ERSubComponentsDialog";
import { IpdSubComponentsDialog } from "~/store/sub-components/services/IpdSubComponentsDialog";
import { NursingSubComponentsDialog } from "~/store/sub-components/services/NursingSubComponentsDialog";
import { DietarySubComponentsDialog } from "~/store/sub-components/services/DietarySubComponentsDialog";

export const useSubComponents = async (dialog: any, type: Boolean = true) => {
    // Master file sub components dialog states
    const { setMFPatientsDialog } = MFPatientsDialog();
    const { setMFConsultantsDialog } = MFConsultantsDialog();
    const { setMFRoomsAndBedsDialog } = MFRoomsAndBedsDialog();
    const { setMFItemsAndServicesDialog } = MFItemsAndServicesDialog();

    // Services sub components dialog states
    const { setOpdSubComponentsDialog } = OpdSubComponentsDialog();
    const { setERSubComponentsDialog } = ERSubComponentsDialog();
    const { setIpdSubComponentsDialog } = IpdSubComponentsDialog();
    const { setNursingSubComponentsDialog } = NursingSubComponentsDialog();
    const { setDietarySubComponentsDialog } = DietarySubComponentsDialog();

    // Master file
    setMFPatientsDialog(dialog, type);
    setMFConsultantsDialog(dialog, type);
    setMFRoomsAndBedsDialog(dialog, type);
    setMFItemsAndServicesDialog(dialog, type);
    // Services
    setOpdSubComponentsDialog(dialog, type);
    setERSubComponentsDialog(dialog, type);
    setIpdSubComponentsDialog(dialog, type);
    setNursingSubComponentsDialog(dialog, type);
    setDietarySubComponentsDialog(dialog, type);
};