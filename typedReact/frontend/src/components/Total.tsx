interface Average {
    total: number
}

const Total = (props: Average) => {
    return ( 
        <p>
        Number of exercises{" "}
        {props.total}
      </p>
     );
}
 
export default Total;