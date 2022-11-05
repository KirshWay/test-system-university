import {defineStore} from 'pinia';

import FeaturesService from '~/api/features.service';
import {useMainStore} from '~/store/main';
import {
  Competence,
  Discipline,
  Specialization,
} from '~/types/feature';

export const useFeaturesStore = defineStore('features', {
  state: () => ({
    specializations: [] as Specialization[],
    competencies: [] as Competence[],
    disciplines: [] as Discipline[],
    responseCompetence: {} as Competence,
    responseSpecializations: {} as Specialization,
    responseDiscipline: {} as Discipline,
    typeResponse: '',
    showModal: false,
  }),
  actions: {
    getAllSpecializations() {
      FeaturesService.getAllSpecializations()
        .then(({data}) => this.specializations = data);
    },

    getOnceFeature(idFeature: number, typeFeature: string, specId: number | null) {
      const mainStore = useMainStore();

      this.typeResponse = typeFeature;
      switch (this.typeResponse) {
      case 'competence':
        return FeaturesService.getOnceCompetence(idFeature)
          .then(({data}) => {
            this.responseCompetence = data;
            this.showModal = true;
          })
          .catch(() => mainStore.message.error('Не получилось получить компетенцию'));
      case 'specialization':
        return FeaturesService.getOnceSpecialization(idFeature)
          .then(({data}) => {
            this.responseSpecializations = data;
            this.showModal = true;
          })
          .catch(() => mainStore.message.error('Не получилось получить специальность'));
      case 'discipline':
        return FeaturesService.getOnceDisciplines(idFeature)
          .then(({data}) => {
            this.responseDiscipline = data;
            FeaturesService.getCompetencesBySpecialization(specId!)
              .then(({data}) => this.competencies = data);
            this.showModal = true;
          })
          .catch(() => mainStore.message.error('Не получилось получить дисциплину'));
      }
    },

    updateFeature(typeFeature: string, disciplineOptions: number[]) {
      const mainStore = useMainStore();

      this.typeResponse = typeFeature;
      switch (this.typeResponse) {
      case 'competence':
        return FeaturesService.updateCompetence(this.responseCompetence.id, this.responseCompetence.code, this.responseCompetence.specialization.id)
          .then(({data}) => {
            this.responseCompetence = data;
            this.competencies.forEach((el) => {
              if (el.id === data.id) el.code = data.code;
            });
            this.showModal = false;
          })
          .catch(() => mainStore.message.error('Не получилось получить компетенцию'));
      case 'specialization':
        return FeaturesService.updateSpecialization(this.responseSpecializations.id, this.responseSpecializations.title, this.responseSpecializations.code)
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
          .catch(() => mainStore.message.error('Не получилось получить специальность'));
      case 'discipline':
        return FeaturesService.updateDisciplines(this.responseDiscipline.id, this.responseDiscipline.title, this.responseDiscipline.specialization.id, disciplineOptions)
          .then(({data}) => {
            this.disciplines.forEach((el) => {
              if (el.id === data.id) {
                el.title = data.title;
              }
            });
            this.showModal = false;
          })
          .catch(() => mainStore.message.error('Не получилось получить дисциплину'));
      }
    },

    getCompetencesBySpecialization(id: number) {
      FeaturesService.getCompetencesBySpecialization(id)
        .then(({data}) => this.competencies = data);
    },

    deleteFeature(featureId: number, typeFeature: string) {
      const mainStore = useMainStore();

      this.typeResponse = typeFeature;
      switch (this.typeResponse) {
      case 'competence':
        return FeaturesService.deleteCompetence(featureId)
          .then(() => this.competencies = this.competencies.filter((el) => el.id !== featureId))
          .catch(() => mainStore.message.error('Не получилось удалить компетенцию'));
      case 'specialization':
        return FeaturesService.deleteSpecialization(featureId)
          .then(() => this.specializations = this.specializations.filter((el) => el.id !== featureId))
          .catch(() => mainStore.message.error('Не получилось удалить специальность'));
      case 'discipline':
        return FeaturesService.deleteDisciplines(featureId)
          .then(() => this.disciplines = this.disciplines.filter((el) => el.id !== featureId))
          .catch(() => mainStore.message.error('Не получилось удалить дисциплину'));
      }
    },

    getAllCompetencies() {
      FeaturesService.getAllCompetencies()
        .then(({data}) => this.competencies = data);
    },

    getAllDisciplines() {
      FeaturesService.getAllDisciplines()
        .then(({data}) => this.disciplines = data);
    },

    getTabsValue(v: string) {
      switch (v) {
      case 'competencies':
        return this.getAllCompetencies();
      case 'specialization':
        return this.getAllSpecializations();
      case 'discipline':
        return Promise.all([this.getAllCompetencies(), this.getAllDisciplines()]);
      }
    },
  },
});
