export const useSeperateName = (value:any,type:any) => {
  if(type == 'lastname'){
    if(value.split(" ")[1]){
        return value.split(" ")[1];
    }
  }else if(type == 'firstname'){
    if(value.split(" ")[0]){
      return value.split(" ")[0];
    }
  }
}