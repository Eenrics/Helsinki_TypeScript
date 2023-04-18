import axios from 'axios'
import { NonSensitiveDiaryEntry, NewDiaryEntry } from '../utils/types';

const baseUrl = 'http://localhost:3001/api/diaries'

const getDiaries = async () => {
    const response = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
    return response.data;
}

const createDiary = async (newDiary: NewDiaryEntry) => {
    const response = await axios.post<NonSensitiveDiaryEntry[]>(baseUrl, newDiary)
    return response.data;
}

export default {getDiaries, createDiary}