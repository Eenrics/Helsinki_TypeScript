"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatientEntry = void 0;
const types_1 = require("../types/types");
const isString = (text) => {
    return (typeof text === 'string' || text instanceof String);
};
const parseName = (name) => {
    if (!isString(name)) {
        throw new Error("Name is missing or invalid");
    }
    return name;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDOB = (date) => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Date Of Birth is missing or invalid');
    }
    return date;
};
const parseSSN = (ssn) => {
    if (!isString(ssn)) {
        throw new Error('Social Security Number is missing or invalid');
    }
    return ssn;
};
const isGender = (gender) => {
    return (Object.values(types_1.Gender).map(g => g.toString()).includes(gender));
};
const parseGender = (gender) => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Gender is missing or invalid');
    }
    return gender;
};
const parseOccupation = (occ) => {
    if (!isString(occ)) {
        throw new Error('Occupation is missing or invalid');
    }
    return occ;
};
const toNewPatientEntry = (obj) => {
    if (!obj || typeof obj !== 'object') {
        throw new Error('Invalid Input');
    }
    if ('name' in obj && 'dateOfBirth' in obj && 'ssn' in obj && 'gender' in obj && 'occupation' in obj) {
        const newEntry = {
            name: parseName(obj.name),
            dateOfBirth: parseDOB(obj.dateOfBirth),
            ssn: parseSSN(obj.ssn),
            gender: parseGender(obj.gender),
            occupation: parseOccupation(obj.occupation)
        };
        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};
exports.toNewPatientEntry = toNewPatientEntry;
