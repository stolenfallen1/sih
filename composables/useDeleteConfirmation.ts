import { storeToRefs } from "pinia";
import { useDeleteConfirmationStore } from "~/store/DeleteConfirmation";

export const useDeleteConfirmation = (showdialog:any,colordialog:any,messagedialog:any) => {
    const { show,text,color } = storeToRefs(useDeleteConfirmationStore());
    show.value = showdialog;
    text.value = messagedialog;
    color.value = colordialog;
}