
import { storeToRefs } from "pinia";
import { useMultipleSnackBarStore } from "~/store/MultipleSnackBar";

export const useMultipleSnackbar = (showdialog:any, colordialog:any, messagedialog:any) => {
    const { show,messages,color } = storeToRefs(useMultipleSnackBarStore());
    show.value = showdialog;
    messages.value = messagedialog;
    color.value = colordialog;
    setTimeout(() => {
        show.value = false;
        messages.value = [];
    }, 2500);
}