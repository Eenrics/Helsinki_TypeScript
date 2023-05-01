import data from "../data/patients";
import { Patient, NonSensitiveData, NewPatient, EntryWithoutId, Entry } from "../types/types";
import { v1 as UUID } from "uuid";

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
    return data ;
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: UUID(),
        ...patient
    };

    data.push(newPatient);
    return newPatient;
};

const addEntry = (id: string, entry: EntryWithoutId): Entry => {
    const newEntry = {
        id: UUID(),
        ...entry
    };

    data.find(p => p.id === id)?.entries.push(newEntry);
    return newEntry;
};

export default {
    getNonSensitiveData,
    getPatient,
    addPatient,
    addEntry
};