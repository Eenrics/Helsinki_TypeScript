import { useState, useEffect } from "react";
import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";
import { CoursePart } from "./utils/types";

const courseName = "Half Stack application development";
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special"
  },
];

const App = () => {
  const [course, setCourse] = useState<CoursePart[]>([{ name: "test", exerciseCount: 3, description: '', kind: 'basic' }])
  const [newNote, setNewNote] = useState<string>('')

  useEffect(() => {
    // axios.get<Note[]>('http://localhost:3001/notes').then(response => {
    //   console.log(response.data);
    // })
    setCourse(course.concat(courseParts))
  }, [])


  // const noteCreation = (event: React.SyntheticEvent) => {
  //   event.preventDefault()
  //   axios.post<Note>('http://localhost:3001/notes', { content: newNote })
      // .then(response => {
      //   setNotes(notes.concat(response.data))
      // })
  //   setNewNote('')
  // };

  return (
    <div>
      <form>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)} 
        />
        <button type='submit'>add</button>
      </form>
      <Header courseName={courseName} />
      <Content courseParts={course} />
      <Total total={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
    </div>
  );
};

export default App;