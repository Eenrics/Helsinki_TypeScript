import { Gender } from '../types/types';
import { NewPatient } from '../types/types';

const isString = (text: unknown): text is string => {
    return (typeof text === 'string' || text instanceof String);
  };

  const parseName = (name: unknown): string => {
    if (!isString(name)) {
        throw new Error("Name is missing or invalid");
    }

    return name;
  };

  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

  const parseDOB = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Date Of Birth is missing or invalid');
    }

    return date;
  };

  const parseSSN = (ssn: unknown): string => {
    if (!isString(ssn)) {
        throw new Error('Social Security Number is missing or invalid');
    }

    return ssn;
  };

  const isGender = (gender: string): gender is Gender => {
    return (Object.values(Gender).map(g => g.toString()).includes(gender));
  };

  const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Gender is missing or invalid');
    }

    return gender;
  };

  const parseOccupation = (occ: unknown): string => {
    if (!isString(occ)) {
        throw new Error('Occupation is missing or invalid');
    }

    return occ;
  };

export const toNewPatientEntry = (obj: unknown): NewPatient => {
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