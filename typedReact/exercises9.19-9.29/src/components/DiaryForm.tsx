import { useState } from "react";
import { NonSensitiveDiaryEntry } from "../utils/types";
import { addData, isVisibility, isWeather } from "../utils/utils";

type setProp = {
    diaries: NonSensitiveDiaryEntry[],
    setDiaries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>
}

const DiaryForm = (props: setProp) => {
    const setDiaries = props.setDiaries
    const diaries = props.diaries

    const weatherList = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy']
    const visibilityList = ['great', 'good', 'ok', 'poor']

    const [weather, setWeather] = useState('')
    const [visibility, setVisibility] = useState('')
    const [comment, setComment] = useState('')
    const [date, setDate] = useState('')

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault()

        if (weather !== undefined && visibility !== undefined && isWeather(weather) && isVisibility(visibility)) {

            const newDiary = {
                date,
                weather,
                visibility,
                comment
            }
    
            addData(diaries, setDiaries, newDiary);

            setWeather('')
            setVisibility('')
            setComment('')
            setDate('')
        }
    }
    
    return ( 
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                Date: <input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" /> <br/>
                Weather: {
                    weatherList.map((w, i) => {
                        return <span key={i}>
                                <input 
                                    type="radio" 
                                    id={w} 
                                    name="weather" 
                                    value={w} 
                                    onChange={(e) => setWeather(e.target.value)}
                                    checked={weather === w} />
                                <label htmlFor={w}> {w[0].toUpperCase() + w.slice(1)} </label>
                              </span>
                    })
                } <br/>
                Visibility: {
                    visibilityList.map((v, i) => {
                        return <span key={i}>
                                <input 
                                    type="radio" 
                                    id={v} 
                                    name="visibility" 
                                    value={v} 
                                    onChange={(e) => setVisibility(e.target.value)}
                                    checked={visibility === v} />
                                <label htmlFor={v}> {v[0].toUpperCase() + v.slice(1)} </label>
                              </span>
                    })
                } <br/>
                Comment: <input type="text" name="comment" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Comment" /> <br/>
                <button type="submit"> Add </button>
            </form>
        </div>
     );
}
 
export default DiaryForm;