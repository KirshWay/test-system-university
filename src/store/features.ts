import {defineStore} from 'pinia';

import Features from '~/api/features';
import {useStore} from '~/store/index';
import {
  CompetenceType,
  DisciplineType,
  SpecializationType,
} from '~/types/common';

export const useFeaturesStore = defineStore('features', {
  state: () => ({
    specializations: [] as SpecializationType[],
    competencies: [] as CompetenceType[],
    disciplines: [] as DisciplineType[],
    responseCompetence: {} as CompetenceType,
    responseSpecializations: {} as SpecializationType,
    responseDiscipline: {} as DisciplineType,
    typeResponse: '',
    showModal: false,
  }),
  actions: {
    getAllSpecializations() {
      Features.getAllSpecializations()
        .then(({data}) => this.specializations = data);
    },

    getOnceFeature(idFeature: number, typeFeature: string) {
      const store = useStore();

      this.typeResponse = typeFeature;
      switch (this.typeResponse) {
      case 'competence':
        return Features.getOnceCompetence(idFeature)
          .then(({data}) => {
            this.responseCompetence = data;
            this.showModal = true;
          })
          .catch(() => store.message.error('Не получилось получить компетенцию'));
      case 'specialization':
        return Features.getOnceSpecialization(idFeature)
          .then(({data}) => {
            this.responseSpecializations = data;
            this.showModal = true;
          })
          .catch(() => store.message.error('Не получилось получить специальность'));
      case 'discipline':
        return Features.getOnceDisciplines(idFeature)
          .then(({data}) => {
            this.responseDiscipline = data;
            this.showModal = true;
          })
          .catch(() => store.message.error('Не получилось получить дисциплину'));
      }
    },

    updateFeature(typeFeature: string, disciplineOptions: number[]) {
      const store = useStore();

      this.typeResponse = typeFeature;
      switch (this.typeResponse) {
      case 'competence':
        return Features.updateCompetence(this.responseCompetence.id, this.responseCompetence.code)
          .then(({data}) => {
            this.responseCompetence = data;
            this.competencies.forEach((el) => {
              if (el.id === data.id) el.code = data.code;
            });
            this.showModal = false;
          })
          .catch(() => store.message.error('Не получилось получить компетенцию'));
      case 'specialization':
        return Features.updateSpecialization(this.responseSpecializations.id, this.responseSpecializations.title, this.responseSpecializations.code)
          .then(({data}) => {
            this.responseSpecializations = data;
            this.specializations.forEach((el) => {
              if (el.id === data.id) {
                el.title = data.title;
                el.code = data.code;
              }
            });
            this.showModal = false;
          })
          .catch(() => store.message.error('Не получилось получить специальность'));
      case 'discipline':
        return Features.updateDisciplines(this.responseDiscipline.id, this.responseDiscipline.title, disciplineOptions)
          .then(({data}) => {
            this.disciplines.forEach((el) => {
              if (el.id === data.id) {
                el.title = data.title;
              }
            });
            this.showModal = false;
          })
          .catch(() => store.message.error('Не получилось получить дисциплину'));
      }
    },

    deleteFeature(featureId: number, typeFeature: string) {
      const store = useStore();

      this.typeResponse = typeFeature;
      switch (this.typeResponse) {
      case 'competence':
        return Features.deleteCompetence(featureId)
          .then(({data}) => this.competencies = this.competencies.filter((el) => el.id !== featureId))
          .catch(() => store.message.error('Не получилось удалить компетенцию'));
      case 'specialization':
        return Features.deleteSpecialization(featureId)
          .then(({data}) => this.specializations = this.specializations.filter((el) => el.id !== featureId))
          .catch(() => store.message.error('Не получилось удалить специальность'));
      case 'discipline':
        return Features.deleteDisciplines(featureId)
          .then(({data}) => this.disciplines = this.disciplines.filter((el) => el.id !== featureId))
          .catch(() => store.message.error('Не получилось удалить дисциплину'));
      }
    },

    getAllCompetencies() {
      Features.getAllCompetencies()
        .then(({data}) => this.competencies = data);
    },

    getAllDisciplines() {
      Features.getAllDisciplines()
        .then(({data}) => this.disciplines = data);
    },

    getTabsValue(v: string) {
      switch (v) {
      case 'competencies':
        return this.getAllCompetencies();
      case 'specialization':
        return this.getAllSpecializations();
      case 'discipline':
        return this.getAllDisciplines();
      }
    },
  },
  getters: {
    optionsCompetencies(state) {
      return state.competencies
        .filter((el) => !state.disciplines
          .some((s) => s.competences
            .some((_s) => _s.id === el.id)) ||
            state.responseDiscipline?.competences?.some((s) => s.id === el.id))
        .map((el) => (
          {
            ...el,
            label: el.code,
            value: el.id,
          }
        ));
    },
  },
});