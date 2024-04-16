import { OpdSubComponentsDialog } from "~/store/sub-components/services/OpdSubComponentsDialog";

export const useSubComponents = async (dialog: any, type: Boolean = true) => {
    const { setOpdSubComponentsDialog } = OpdSubComponentsDialog();

    setOpdSubComponentsDialog(dialog, type);
};