import { NonSensitiveDiaryProp } from "../utils/types";

const Diaries = (props: NonSensitiveDiaryProp) => {
    const diary = props.diary
    return ( 
       <div>
            <h3>{diary.date}</h3>
            <p>weather: {diary.weather}</p>
            <p>visibility: {diary.visibility}</p>
       </div>
     );
}
 
export default Diaries;