import { writable, derived } from "svelte/store";
import { calculate } from "./calculate";
import type { HolidayHoursCalculation } from "./calculate";

export const contractMonths = writable(4);

export const calculations = derived(contractMonths, months => {
    const calc: HolidayHoursCalculation[] = [];
    for (let i = 7.5; i <= 37.5; i += 2.5) {
        calc.push(calculate(i, months))
    }
    return calc;
})
