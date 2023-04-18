import { useState, useEffect } from "react";
import { NonSensitiveDiaryEntry } from "./utils/types";
import DiaryForm from "./components/DiaryForm";
import Diaries from "./components/Diaries";
import Header from "./components/Header";
import { fetchData } from "./utils/utils";

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    fetchData(diaries, setDiaries);
  }, [])

  return (
    <div>
      <Header header="Diary Entries" />
      <DiaryForm setDiaries={setDiaries} diaries={diaries} />
      <Diaries diaries={diaries} />
    </div>
  );
};

export default App;