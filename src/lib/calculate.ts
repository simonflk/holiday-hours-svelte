export const daysPerWeek = 5;
export const regularHours = 7.5;
export const regularHoursPerWeek = regularHours * daysPerWeek;
export const regularHolidayDays = 25;
export const weeksPerMonth = 365 / 12 / 7;

export type HolidayHoursCalculation = {
    contractRatio: number,
    contractHolidayDays: number,
    contractHolidayHours: number,
    regularTotalHours: number,
    regularHoursPerWeek: number,
    partTimeRatio: number,
    partTimeRatioFormatted: string,
    partTimeDaysPerWeek: number,
    partTimeHoliday: number,
    partTimeTotalHours: number,
    partTimeHolidayHours: number,
    partTimeWorkHours: number,
    partTimeHolidayWorkValue: number,
    onTrackHolidayHours: number,
    onTrackHolidayWorkValue: number,
}

export function calculate(hoursPerWeek:number, contractMonths:number) : HolidayHoursCalculation {
    const contractRatio = (contractMonths / 12);
    const contractHolidayDays = roundUpHalf(regularHolidayDays * contractRatio);
    const contractHolidayHours = contractHolidayDays * regularHours;
    const regularTotalHours = regularHoursPerWeek * contractMonths * weeksPerMonth;
    const partTimeTotalHours = hoursPerWeek * contractMonths * weeksPerMonth;
    const partTimeRatio = hoursPerWeek / regularHoursPerWeek;
    const partTimeRatioFormatted = partTimeRatio.toFixed(1);
    const partTimeDaysPerWeek = partTimeRatio * daysPerWeek;
    const partTimeHoliday = roundUpHalf(partTimeRatio * contractHolidayDays);
    const partTimeHolidayHours = partTimeHoliday * regularHours;
    const partTimeWorkHours = partTimeTotalHours - partTimeHolidayHours;
    const partTimeHolidayWorkValue = roundUpHalf(partTimeWorkHours / partTimeHolidayHours);
    const onTrackHolidayHours = roundUpHalf(partTimeHoliday * (regularHours * partTimeRatio));
    const onTrackWorkHours = partTimeTotalHours - onTrackHolidayHours;
    const onTrackHolidayWorkValue = roundUpHalf(onTrackWorkHours / onTrackHolidayHours);


    return {
        contractRatio,
        contractHolidayDays,
        contractHolidayHours,
        regularTotalHours,
        regularHoursPerWeek,
        partTimeRatio,
        partTimeRatioFormatted,
        partTimeDaysPerWeek,
        partTimeHoliday,
        partTimeHolidayHours,
        partTimeTotalHours,
        partTimeWorkHours,
        partTimeHolidayWorkValue,
        onTrackHolidayHours,
        onTrackHolidayWorkValue,
    }
}

export function roundUpHalf(num: number) : number{
    return Math.ceil(num * 2) / 2;
}

export function ratioPercent(current: number, original: number) : string {
    return ((100 * current) / original).toFixed(1);
}
