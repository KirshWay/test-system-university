import {
  CompetenceType, DisciplineType, SpecializationType,
} from '~/types/common';

import $axios from './index';

const Features = {
  getAllSpecializations: () => $axios.get<SpecializationType[]>(`/features/specialization/`),
  getOnceSpecialization: (id: number) => $axios.get<SpecializationType>(`/features/specialization/${id}`),
  createSpecialization: (title: string, code: string) => $axios.post(`/features/specialization/`, {title, code}),
  updateSpecialization: (id: number, title: string, code: string) => $axios.put(`/features/specialization/${id}/`, {title, code}),
  deleteSpecialization: (id: number) => $axios.delete(`/features/specialization/${id}`),
  getAllCompetencies: () => $axios.get<CompetenceType[]>(`/features/competence/`),
  getOnceCompetence: (id: number) => $axios.get<CompetenceType>(`/features/competence/${id}`),
  createCompetence: (code: string) => $axios.post(`/features/competence/`, {code}),
  updateCompetence: (id: number, code: string) => $axios.put(`/features/competence/${id}/`, {code}),
  deleteCompetence: (id: number) => $axios.delete(`/features/competence/${id}`),
  getAllDisciplines: () => $axios.get<DisciplineType[]>(`/features/discipline/`),
  getOnceDisciplines: (id: number) => $axios.get<DisciplineType>(`/features/discipline/${id}`),
  createDisciplines: (title: string, competencesIds: number[]) => $axios.post(`/features/discipline/`, {title, competencesIds}),
  updateDisciplines: (id: number, title: string, competencesIds: number[]) => $axios.put(`/features/discipline/${id}/`, {title, competencesIds}),
  deleteDisciplines: (id: number) => $axios.delete(`/features/discipline/${id}`),
};

export default Features;
