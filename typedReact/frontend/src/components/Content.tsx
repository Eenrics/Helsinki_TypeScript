interface Parts {
    name: string,
    exerciseCount: number
}

interface CourseParts {
    courseParts: Parts[]
}

const Content = (props: CourseParts) => {
    const courses = props.courseParts
    return ( 
        <>
        {
          courses.map(crs => {
            return (
              <p key={crs.name}>
              {crs.name} {crs.exerciseCount}
            </p>
          )
        })
        }
        </>
     );
}
 
export default Content;