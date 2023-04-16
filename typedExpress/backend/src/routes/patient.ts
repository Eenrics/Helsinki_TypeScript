import express from 'express';
import patientService from '../service/patientService';
import { toNewPatientEntry } from '../utils/utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveData());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    let errorMessage = "something went wrong: ";
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    res.status(404).send(errorMessage);
  }
});

export default router;