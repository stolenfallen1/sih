
import { storeToRefs } from "pinia";
import { useSnackBarStore } from "~/store/SnackBar";

export const useSnackbar = (showdialog:any, colordialog:any, messagedialog:any) => {
    const { show,text,color } = storeToRefs(useSnackBarStore());
    show.value = showdialog;
    text.value = messagedialog;
    color.value = colordialog;
    setTimeout(() => {
        show.value = false;
        text.value = "";
    }, 2500);
}