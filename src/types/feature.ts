export type Specialization = {
  id: number,
  title: string,
  code: string
}

export type Competence = {
  id: number,
  code: string,
  specialization: Specialization,
}

export type Discipline = {
  id: number,
  title: string,
  specialization: Specialization,
  competences: Competence[]
}
