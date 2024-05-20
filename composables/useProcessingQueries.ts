// Master file processing and queries dialog imports
import { PQPatientMasterDialog } from "~/store/processing-queries/master-file/PQPatientMasterDialog";
import { PQConsultantsDialog } from "~/store/processing-queries/master-file/PQConsultantsDialog";
import { PQItemsServicesDialog } from "~/store/processing-queries/master-file/PQItemsServicesDialog";
// Services processing and queries dialog imports


export const useSubComponents = async (dialog: any, type: Boolean = true) => {
    // Master file processing and queries dialog states
    const { setPQPatientMasterDialog } = PQPatientMasterDialog();
    const { setPQConsultantsDialog } = PQConsultantsDialog();
    const { setPQItemsServicesDialog } = PQItemsServicesDialog();

    // Services processing and queries dialog states

    // Master file
    setPQPatientMasterDialog(dialog, type);
    setPQConsultantsDialog(dialog, type);
    setPQItemsServicesDialog(dialog, type);
    // Services
};