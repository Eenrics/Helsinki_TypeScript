import express from 'express';
import cors from 'cors';
import diagnosesService from './service/diagnosesService';
import patientService from './service/patientService';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
  res.send(diagnosesService.getDiagnoses());
});

app.get('/api/patients', (_req, res) => {
  res.send(patientService.getNonSensitiveData());
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});