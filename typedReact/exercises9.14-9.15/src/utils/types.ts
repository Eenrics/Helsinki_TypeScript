  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CourseBaseDetail extends CoursePartBase {
    description: string
  }

  interface CoursePartBasic extends CourseBaseDetail {
    kind: "basic"
  }

  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }

  interface CoursePartBackground extends CourseBaseDetail {
    backgroundMaterial: string;
    kind: "background"
  }

  interface CoursePartSpecial extends CourseBaseDetail {
    requirements: string[];
    kind: "special"
  }

  export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

  export interface CourseName {
    courseName: string
  }

  export interface CourseParts {
    courseParts: CoursePart[]
  }

  export interface Parts {
    part: CoursePart
  }

  export interface Average {
    total: number
  }

