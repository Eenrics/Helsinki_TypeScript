import diaryData from '../../data/entries.json';
import { DiaryEntry, NonSensitiveDiaryEntry } from '../types';

  const diaries = diaryData as DiaryEntry[];

  const getEntries = (): DiaryEntry[] => {
    return diaries;
  };

  const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
    return diaries.map(({ id, date, weather, visibility }) => ({
      id,
      date,
      weather,
      visibility,
    }));
  };
  
  const addDiary = () => {
    return null;
  };
  
  export default {
    getEntries,
    getNonSensitiveEntries,
    addDiary
  };