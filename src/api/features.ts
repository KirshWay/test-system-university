import {
  Competence, Discipline, Specialization,
} from '~/types/feature';

import $axios from './index';

const Features = {
  getAllSpecializations: () => $axios.get<Specialization[]>(`/features/specialization/`),
  getOnceSpecialization: (id: number) => $axios.get<Specialization>(`/features/specialization/${id}`),
  createSpecialization: (title: string, code: string) => $axios.post(`/features/specialization/`, {title, code}),
  updateSpecialization: (id: number, title: string, code: string) => $axios.put(`/features/specialization/${id}/`, {title, code}),
  deleteSpecialization: (id: number) => $axios.delete(`/features/specialization/${id}`),
  getAllCompetencies: () => $axios.get<Competence[]>(`/features/competence/`),
  getOnceCompetence: (id: number) => $axios.get<Competence>(`/features/competence/${id}`),
  createCompetence: (code: string, specializationId: number) => $axios.post(`/features/competence/`, {code, specializationId}),
  updateCompetence: (id: number, code: string, specializationId: number) => $axios.put(`/features/competence/${id}/`, {code, specializationId}),
  deleteCompetence: (id: number) => $axios.delete(`/features/competence/${id}`),
  getAllDisciplines: () => $axios.get<Discipline[]>(`/features/discipline/`),
  getOnceDisciplines: (id: number) => $axios.get<Discipline>(`/features/discipline/${id}`),
  createDisciplines: (title: string, specializationId: number, competencesIds: number[]) => $axios.post(`/features/discipline/`, {
    title,
    specializationId,
    competencesIds,
  }),
  getCompetencesBySpecialization: (id: number) => $axios.get(`/features/get_competences_by_specialization/${id}`),
  getDisciplinesBySpecialization: (id: number) => $axios.get(`/features/get_disciplines_by_specialization/${id}`),
  updateDisciplines: (id: number, title: string, specializationId: number, competencesIds: number[]) => $axios.put(`/features/discipline/${id}/`, {
    title,
    specializationId,
    competencesIds,
  }),
  deleteDisciplines: (id: number) => $axios.delete(`/features/discipline/${id}`),
};

export default Features;
