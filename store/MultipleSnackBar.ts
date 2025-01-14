export const useMultipleSnackBarStore = defineStore("MultipleSnackbarDialog", {
  state: () => ({
    show: false,
    color: "success",
    messages:[]
  }),
  actions: {
    setSnackbar(show: any, color: any, message: any) {
      this.show = show;
      this.color = color;
      this.messages = message;
      // setTimeout(() => {
      //   this.show = false;
      //   this.messages = [];
      // }, 2500);
    }
  }
});
