import data from "../data/diagnoses";
import { Diagnose } from "../types/types";

const getDiagnoses = (): Diagnose[] => {
    return (data as Diagnose[]);
};

export default getDiagnoses;