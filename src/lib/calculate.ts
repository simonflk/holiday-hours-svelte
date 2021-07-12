export const daysPerWeek = 5;
export const regularHours = 7.5;
export const regularHoursPerWeek = regularHours * daysPerWeek;
export const regularHolidayDays = 25;
export const weeksPerMonth = 365 / 12 / 7;

export type HolidayHoursCalculation = {
    hoursPerWeek: number,
    contractRatio: number,
    contractHolidayDays: number,
    contractHolidayHours: number,
    regularTotalHours: number,
    regularHoursPerWeek: number,
    regularWorkHours: number,
    regularHolidayWorkValue: number,
    partTimeRatio: number,
    partTimeRatioPercent: string,
    partTimeDayHours: string,
    partTimeDaysPerWeek: number,
    partTimeHoliday: number,
    partTimeTotalHours: number,
    partTimeHolidayHours: number,
    partTimeWorkHours: number,
    partTimeHolidayWorkValue: number,
    onTrackWorkHours: number,
    onTrackHolidayHours: number,
    onTrackHolidayWorkValue: number,
}

export function calculate(hoursPerWeek:number, contractMonths:number) : HolidayHoursCalculation {
    if (!contractMonths) {
        contractMonths = 12;
    }
    const contractRatio = (contractMonths / 12);
    const contractHolidayDays = roundUpHalf(regularHolidayDays * contractRatio);
    const contractHolidayHours = contractHolidayDays * regularHours;
    const regularTotalHours = Math.round(regularHoursPerWeek * contractMonths * weeksPerMonth);
    const regularWorkHours = regularTotalHours - contractHolidayHours;
    const regularHolidayWorkValue = roundUpHalf(regularWorkHours / contractHolidayHours);
    const partTimeTotalHours = Math.round(hoursPerWeek * contractMonths * weeksPerMonth);
    const partTimeRatio = hoursPerWeek / regularHoursPerWeek;
    const partTimeRatioPercent = (partTimeRatio * 100).toFixed(1);
    const partTimeDayHours = (hoursPerWeek / daysPerWeek).toFixed(1);
    const partTimeDaysPerWeek = partTimeRatio * daysPerWeek;
    const partTimeHoliday = roundUpHalf(partTimeRatio * contractHolidayDays);
    const partTimeHolidayHours = partTimeHoliday * regularHours;
    const partTimeWorkHours = partTimeTotalHours - partTimeHolidayHours;
    const partTimeHolidayWorkValue = roundUpHalf(partTimeWorkHours / partTimeHolidayHours);
    const onTrackHolidayHours = roundUpHalf(partTimeHoliday * (regularHours * partTimeRatio));
    const onTrackWorkHours = partTimeTotalHours - onTrackHolidayHours;
    const onTrackHolidayWorkValue = roundUpHalf(onTrackWorkHours / onTrackHolidayHours);


    return {
        hoursPerWeek,
        contractRatio,
        contractHolidayDays,
        contractHolidayHours,
        regularTotalHours,
        regularWorkHours,
        regularHoursPerWeek,
        regularHolidayWorkValue,
        partTimeRatio,
        partTimeRatioPercent,
        partTimeDaysPerWeek,
        partTimeDayHours,
        partTimeHoliday,
        partTimeHolidayHours,
        partTimeTotalHours,
        partTimeWorkHours,
        partTimeHolidayWorkValue,
        onTrackHolidayHours,
        onTrackWorkHours,
        onTrackHolidayWorkValue,
    }
}

export function roundUpHalf(num: number) : number{
    return Math.ceil(num * 2) / 2;
}

export function ratioPercent(current: number, original: number) : string {
    return ((100 * current) / original).toFixed(1);
}
