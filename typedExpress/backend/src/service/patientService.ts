import data from "../data/patients";
import { Patient, NonSensitiveData } from "../types/types";

const getNonSensitiveData = (): NonSensitiveData[] => {
    return data.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id, 
        name, 
        dateOfBirth, 
        gender, 
        occupation
    })) as NonSensitiveData[];
};

const getPatient = (): Patient[] => {
    return data as Patient[];
};

export default {
    getNonSensitiveData,
    getPatient
};