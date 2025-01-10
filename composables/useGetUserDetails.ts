import nuxtStorage from "nuxt-storage";
export const useGetUserDetails = (type = null) => {
  let userdetails = JSON.parse(
    nuxtStorage.localStorage.getData("user_details")
  );
  if (userdetails) {
    if (type == "branch") {
      return userdetails.branch.name;
    } else if (type == "address") {
      return userdetails.branch.address;
    } else if (type == "TIN") {
      return userdetails.branch.TIN;
    } else if (type == "") {
      return userdetails;
    }
  }
};
