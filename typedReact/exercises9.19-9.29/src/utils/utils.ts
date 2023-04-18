import diaryServices from '../services/diaries'
import { NewDiaryEntry, NonSensitiveDiaryEntry, Weather, Visibility } from './types';

export async function fetchData(diaries: NonSensitiveDiaryEntry[], setDiaries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>) {
  const data = await diaryServices.getDiaries();
  setDiaries(diaries.concat(data));
}

export async function addData(diaries: NonSensitiveDiaryEntry[], setDiaries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>, newDiary: NewDiaryEntry) {
  const data = await diaryServices.createDiary(newDiary);
  setDiaries(diaries.concat(data));
}

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const isWeather = (param: string): param is Weather => {
  return Object.values(Weather).map(v => v.toString()).includes(param);
};

export const isVisibility = (param: string): param is Visibility => {
  return Object.values(Visibility).map(v => v.toString()).includes(param);
};