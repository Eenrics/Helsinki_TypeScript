import { BaseEntryWithoutId, Diagnose, Entry, EntryWithoutId, Gender, HealthCheckRating } from '../types/types';
import { NewPatient } from '../types/types';

const isString = (text: unknown): text is string => {
    return (typeof text === 'string' || text instanceof String);
  };

const isNumber = (text: unknown): text is number => {
    return typeof text === 'number';
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

  const parseCriteria = (criteria: unknown): string => {
    if (!isString(criteria)) {
        throw new Error('Criteria is missing or invalid');
    }

    return criteria;
  };

  const parseEmployerName = (employerName: unknown): string => {
    if (!isString(employerName)) {
        throw new Error('EmployerName is missing or invalid');
    }

    return employerName;
  };

  const parseDescription = (description: unknown): string => {
    if (!isString(description)) {
        throw new Error('Description is missing or invalid');
    }

    return description;
  };

  const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Date is missing or invalid');
    }

    return date;
  };

  const parseSpecialist = (specialist: unknown): string => {
    if (!isString(specialist)) {
        throw new Error('Specialist is missing or invalid');
    }

    return specialist;
  };

  const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      return [] as Array<Diagnose['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnose['code']>;
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

  const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (!isNumber(healthCheckRating) || healthCheckRating < 0 || healthCheckRating > 3) {
        throw new Error('Occupation is missing or invalid');
    }

    return healthCheckRating;
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
        occupation: parseOccupation(obj.occupation),
        entries: []
    };
    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');

};

export const toNewEntry = (obj: unknown): EntryWithoutId => {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Invalid Input');
  }

  let newEntry;

  if ('description' in obj && 'specialist' in obj && 'date' in obj && 'diagnosisCodes' in obj) {
    newEntry = {
        description: parseDescription(obj.description),
        date: parseDate(obj.date),
        specialist: parseSpecialist(obj.specialist),
        diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes),
    };

    return addExtra(obj, newEntry);
  }

  throw new Error('Incorrect data: some fields are missing');
};

const addExtra = (o: unknown, e: BaseEntryWithoutId): EntryWithoutId => {
  if (o && typeof o === 'object' && 'type' in o) {
    switch(o.type) {
      case "Hospital":
        if ('discharge' in o && o.discharge && typeof o.discharge === 'object' && 'date' in o.discharge && 'criteria' in o.discharge) {
          return {...e, type: "Hospital", discharge: {date: parseDate(o.discharge.date), criteria: parseCriteria(o.discharge.criteria)}};
        }
        throw new Error("Type Hospital has incomplete or invalid data");
      case "OccupationalHealthcare":
        if ('employerName' in o) {
          const newData = {...e, type: "OccupationalHealthcare", employerName: parseEmployerName(o.employerName)};
          if ('sickLeave' in o && o.sickLeave && typeof o.sickLeave === 'object' && 'startDate' in o.sickLeave && 'endDate' in o.sickLeave) {
            return {...newData, sickLeave: {startDate: parseDate(o.sickLeave.startDate), endDate: parseDate(o.sickLeave.endDate)}} as Entry;
          }
        }
        throw new Error("Type OccupationalHealthcare has incomplete or invalid data");
      case "HealthCheck":
        if ('healthCheckRating' in o) {
          return {...e, type: "HealthCheck", healthCheckRating: parseHealthCheckRating(o.healthCheckRating)};
        }
        throw new Error("Type HealthCheck has incomplete or invalid data");
      default:
        throw new Error("Type has incomplete or invalid data");
    }
  }

  throw new Error("Object has incomplete or invalid type value");
};