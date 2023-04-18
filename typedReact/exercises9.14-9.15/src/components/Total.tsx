import { Average } from "../utils/types";

const Total = (props: Average) => {
    return ( 
        <p>
        Number of exercises{" "}
        {props.total}
      </p>
     );
}
 
export default Total;