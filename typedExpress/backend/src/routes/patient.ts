import express from 'express';
import patientService from '../service/patientService';
import { toNewPatientEntry, toNewEntry } from '../utils/utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getNonSensitiveData();
  res.send(patients);
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient().find(p => p.id == req.params.id);
  res.send(patient);
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

router.post('/:id/entries', (req, res) => {
  console.log("i am here");
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(req.params.id, newEntry);
    res.json(addedEntry);
  } catch (error) {
    let errorMessage = "something went wrong: ";
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
    res.status(404).send(errorMessage);
  }
});

export default router;