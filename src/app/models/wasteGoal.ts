export interface WasteGoal {
    id?: string;
    startDate?: string;
    endDate?: string;
    targetPlastic?: number;
    targetPaper?: number;
    targetWater?: number;
    targetFood?: number;
    targetFuel?: number;
    progressPlastic?: number;
    progressPaper?: number;
    progressWater?: number;
    progressFood?: number;
    progressFuel?: number;
}