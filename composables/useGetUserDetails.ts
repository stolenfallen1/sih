import nuxtStorage from "nuxt-storage";
export const useGetUserDetails = (type = null) => {
     // static sa nko
    if (type == "branch") {
        return 'Cebu Doctors` University Hospital';
      } else if (type == "address") {
        return 'Osmeña BLVD, Cebu City, 6000 Cebu';
      } else if (type == "TIN") {
        return '000-309-308-000';
      } 

    // comment sa ni kay sa nginx d mo work
    //   let userdetails = JSON.parse(nuxtStorage.localStorage.getData("user_details"));
    //   if (userdetails) {
    //     if (type == "branch") {
    //       return userdetails.branch.name;
    //     } else if (type == "address") {
    //       return userdetails.branch.address;
    //     } else if (type == "TIN") {
    //       return userdetails.branch.TIN;
    //     } else if (type == "") {
    //       return userdetails;
    //     }
    //   }
};
