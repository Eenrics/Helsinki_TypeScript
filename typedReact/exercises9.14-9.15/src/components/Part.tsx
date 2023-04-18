import { Parts } from "../utils/types"
import { parseCourse } from "../utils/utils"

const Part = (props: Parts) => {
    const display = parseCourse(props.part)
    return ( 
            <div style={{ 
              backgroundColor: '#eee', 
              padding: 10, margin: 10, 
              borderRadius: 5}}>
              <span style={{
                fontWeight: 700, 
                fontSize: "large"}}>
                {display[0]} {display[1]}
              </span>

              <br/>

              {display.slice(2).map((ele, i) => {
                return <p key={i}>{ele}</p>
              })}
            </div>
          )
}
 
export default Part;