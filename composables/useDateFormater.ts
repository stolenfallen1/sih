
import moment from "moment";
export const useDateMMDDYYY = (value:any) => {
   return moment(value).format("YYYY-MM-DD");
};

// Added new function to format date time
export const useDateTimeFormater = (value: any): string => {
   const date = new Date(value);
   const options = { month: 'numeric', day: 'numeric', year: '2-digit', hour: 'numeric', minute: '2-digit', hour12: true };
   const formattedDate = date.toLocaleDateString('en-US', options);
   return formattedDate;
};
