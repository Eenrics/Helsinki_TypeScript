import { CoursePart } from "./types"

  export const assertNever = (part: never): never => {
    throw new Error(`Unhandled descriminated union member ${JSON.stringify(part)}`)
  }
  
  export const parseCourse = (part: CoursePart): (string | number | string[])[] => {
    const result = []
    switch(part.kind) {
      case "basic":
        result.push(part.name, part.exerciseCount, part.description)
        return result;
      case "group":
        result.push(part.name, part.exerciseCount, `project exercieses ${part.groupProjectCount}`)
        return result;
      case "background":
        result.push(part.name, part.exerciseCount, part.description, `submit to ${part.backgroundMaterial}`)
        return result;
      case "special":
        result.push(part.name, part.exerciseCount, part.description, `required skills: ${part.requirements.join(', ')}`)
        return result;
      default:
        return assertNever(part);
    }
  }
  
  