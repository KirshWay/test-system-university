export type Specialization = {
  id: number,
  title: string,
  code: string
}

export type Competence = {
  id: number,
  code: string
}

export type Discipline = {
  id: number,
  title: string,
  competences: Discipline[]
}
