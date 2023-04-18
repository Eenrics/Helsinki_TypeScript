import { CourseParts } from "../utils/types"
import Part from './Part'

const Content = (props: CourseParts) => {
    const courses = props.courseParts
    return ( 
        <>
        {
          courses.map(crs => {
            return (
            //   <p key={crs.name}>
            //   {crs.name} {crs.exerciseCount}
            // </p>
              <Part part={crs} key={crs.name}/>
          )
        })
        }
        </>
     );
}
 
export default Content;