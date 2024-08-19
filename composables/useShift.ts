export const useShift = (shift_data: any, payload: any) => {
    const currentHour = new Date().getHours();
    let nearestShift = null;
    let smallestDiff = 24;

    for (const shift of shift_data) {
        const beginHour = parseInt(shift.beginning_military_hour);
        const endHour = parseInt(shift.end_military_hour);

        let diff = 0;
        if (beginHour <= endHour) {
            if (currentHour >= beginHour && currentHour < endHour) {
                diff = 0;
            } else if (currentHour < beginHour) {
                diff = beginHour - currentHour;
            } else {
                diff = 24 - (currentHour - beginHour);
            }
        } else {
            if (currentHour >= beginHour || currentHour < endHour) {
                diff = 0;
            } else if (currentHour < beginHour) {
                diff = beginHour - currentHour;
            } else {
                diff = 24 - (currentHour - beginHour);
            }
        }

        if (diff < smallestDiff) {
            smallestDiff = diff;
            nearestShift = shift;
        }
    }

    if (nearestShift) {
        payload.shift_id = nearestShift.id;  
    }
}
