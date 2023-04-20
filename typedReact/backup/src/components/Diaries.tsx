import { NonSensitiveDiariesProp } from "../utils/types";
import Diary from "./Diary";

const Diaries = (props: NonSensitiveDiariesProp) => {
    const diaries = props.diaries;
    return ( 
        <>
            {
                diaries.map(d => {
                    return (
                        <Diary diary={d} key={d.id} />
                    )
                })
            }
        </>
     );
}
 
export default Diaries;