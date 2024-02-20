
import moment from "moment";
export const useDateMMDDYYY = (value:any) => {
   return moment(value).format("YYYY-MM-DD");
};