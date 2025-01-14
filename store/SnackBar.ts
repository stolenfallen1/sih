export const useSnackBarStore = defineStore("snackbarDialog", {
  state: () => ({
    show: false,
    color: "success",
    text: "",
    messages:[]
  }),
  actions: {
    setSnackbar(show: any, color: any, message: any) {
      this.show = show;
      this.color = color;
      this.text = message;
      setTimeout(() => {
        this.show = false;
        this.text = "";
      }, 2500);
    }
  }
});
