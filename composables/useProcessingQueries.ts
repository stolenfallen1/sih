// Master file processing and queries dialog imports
import { PQPatientMasterDialog } from "~/store/processing-queries/master-file/PQPatientMasterDialog";
import { PQConsultantsDialog } from "~/store/processing-queries/master-file/PQConsultantsDialog";
import { PQItemsServicesDialog } from "~/store/processing-queries/master-file/PQItemsServicesDialog";
// Services processing and queries dialog imports
import { PQOutpatientDialog } from "~/store/processing-queries/services/PQOutPatientDialog";
import { PQEmergencyPatientDialog } from "~/store/processing-queries/services/PQEmergencyPatientDialog";
import { PQInPatientDialog } from "~/store/processing-queries/services/PQInPatientDialog";
import { PQNursingServicesDialog } from "~/store/processing-queries/services/PQNursingServicesDialog";
import { PQDietaryServicesDialog } from "~/store/processing-queries/services/PQDietaryServicesDialog";
import { PQAncillaryServicesDialog } from "~/store/processing-queries/services/PQAncillaryServicesDialog";


export const useProcessingQueries = async (dialog: any, type: Boolean = true) => {
    // Master file processing and queries dialog states
    const { setPQPatientMasterDialog } = PQPatientMasterDialog();
    const { setPQConsultantsDialog } = PQConsultantsDialog();
    const { setPQItemsServicesDialog } = PQItemsServicesDialog();

    // Services processing and queries dialog states
    const { setPQOutpatientDialog } = PQOutpatientDialog();
    const { setPQEmergencyPatientDialog } = PQEmergencyPatientDialog();
    const { setPQInPatientDialog } = PQInPatientDialog();
    const { setPQNursingServicesDialog } = PQNursingServicesDialog();
    const { setPQDietaryServicesDialog } = PQDietaryServicesDialog();
    const { setPQAncillaryServicesDialog } = PQAncillaryServicesDialog();

    // Master file
    setPQPatientMasterDialog(dialog, type);
    setPQConsultantsDialog(dialog, type);
    setPQItemsServicesDialog(dialog, type);
    // Services
    setPQOutpatientDialog(dialog, type);
    setPQEmergencyPatientDialog(dialog, type);
    setPQInPatientDialog(dialog, type);
    setPQNursingServicesDialog(dialog, type);
    setPQDietaryServicesDialog(dialog, type);
    setPQAncillaryServicesDialog(dialog, type);
};