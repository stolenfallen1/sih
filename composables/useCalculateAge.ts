export const useCalculateAge =(birthDate:any)=>{
    if (!birthDate) return 0;
    const birthYear = new Date(birthDate).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
}