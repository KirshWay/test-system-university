<script setup lang="ts">
import {
  NButton,
  NCard,
  NCollapse,
  NCollapseItem,
  NInputGroup,
  NInputNumber,
  NSelect,
  NSpace,
  NSwitch,
} from 'naive-ui';
import {computed, ref} from 'vue';

import BankService from '~/api/bank.service';
import FeaturesService from '~/api/features.service';
import ListCompetence from '~/components/ConstructorItems/СompetenceItem/ListCompetence.vue';
import {useTestStore} from '~/store/test';
const testStore = useTestStore();

const selectedCompetence = ref<any>(null);
const selectedDiscipline = ref<number | null>(null);
const numberCompetence = ref<number>(0);

const switcherCompetenceChoice = ref<boolean>(false);

const sendToBankByCompetence = (competence: number, quantityCompetences: number ) => {
  BankService.addQuestionsBankByCompetence(competence, quantityCompetences, testStore.test.uuidTesting)
    .then(() => testStore.getTest(testStore.test.uuidTesting, '1'));
  selectedCompetence.value = null;
  numberCompetence.value = 0;
  testStore.showBankMenu = !testStore.showBankMenu;
};

const sentToBankDiscipline = () => {
  const result = testStore.questionsBankByDiscipline.map((el) => ({competenceId: el.competence_id, queryCount: el.query_count}));
  BankService.addQuestionsBankByDiscipline(testStore.test.uuidTesting, result)
    .then(() => testStore.getTest(testStore.test.uuidTesting, '1'));
  testStore.showBankMenu = !testStore.showBankMenu;
};

const competences = FeaturesService.getCompetencesBySpecialization(testStore.test.specialization.id)
  .then(({data}) => testStore.responseCompetences = data);
const disciplines = FeaturesService.getDisciplinesBySpecialization(testStore.test.specialization.id)
  .then(({data}) => testStore.responseDisciplines = data);

Promise.all([competences, disciplines]);

const dataCompetenciesForForm = computed(() => testStore.responseCompetences.map((el) => ({label: el.code, value: el.id})));
const dataDisciplinesForForm = computed(() => testStore.responseDisciplines.map((el) => ({label: el.title, value: el.id})));

const checkCountCompetencies = computed(() => testStore.questionsBankByDiscipline.some((el) => el.query_count === 0));

const selectedDisciplineForCompetencies = computed(() => {
  const changedData = testStore.responseDisciplines
    .filter((el) => el.id === selectedDiscipline.value && el)
    .map((el) => el.competences)
    .flat()
    .map((el) => ({
      code: el.code,
      competence_id: el.id,
      query_count: 0,
    }));

  testStore.questionsBankByDiscipline = changedData;

  return changedData;
});
</script>

<template>
  <n-card>
    <n-space style="margin-bottom: 2%" justify="space-between" align="center">
      <p class="competence__title">
        Создать тест по {{ `${switcherCompetenceChoice ? 'дисциплине': 'компетенции'}` }}
      </p>
      <p>
        Изменить тип
        <n-switch v-model:value="switcherCompetenceChoice" />
      </p>
    </n-space>
    <template v-if="!switcherCompetenceChoice">
      <n-input-group style="margin-bottom: 3%;">
        <n-select
          v-model:value="selectedCompetence"
          :options="dataCompetenciesForForm"
          placeholder="Выберите компетенцию"
          filterable
        />
        <n-input-number
          v-model:value="numberCompetence"
          placeholder="Колличество"
          clearable
        />
      </n-input-group>
      <n-space justify="space-between">
        <n-button
          @click="testStore.showBankMenu = !testStore.showBankMenu"
          type="error"
        >
          Отмена
        </n-button>
        <n-button
          @click="sendToBankByCompetence(selectedCompetence, numberCompetence)"
          :disabled="!selectedCompetence || !numberCompetence"
          type="success"
        >
          Выбрать
        </n-button>
      </n-space>
    </template>
    <template v-else>
      <div style="margin-bottom: 3%;">
        <n-select
          v-model:value="selectedDiscipline"
          :options="dataDisciplinesForForm"
          placeholder="Выберите дисциплину"
          style="margin-bottom: 3%;"
          filterable
        />
        <n-collapse
          v-if="selectedDiscipline"
          arrow-placement="right"
          style="margin-bottom: 3%"
        >
          <n-collapse-item title="Список компетенций по выбранной дисциплине">
            <ListCompetence
              v-for="competence in selectedDisciplineForCompetencies"
              :competence="competence"
              :key="competence.competence_id"
            />
          </n-collapse-item>
        </n-collapse>
      </div>

      <n-space justify="space-between">
        <n-button
          @click="testStore.showBankMenu = !testStore.showBankMenu"
          type="error"
        >
          Отмена
        </n-button>
        <n-button
          @click="sentToBankDiscipline"
          :disabled="checkCountCompetencies"
          type="success"
        >
          Выбрать
        </n-button>
      </n-space>
    </template>
  </n-card>
</template>

<style lang="scss" scoped>
.competence {
  &__title {
    font-size: 1.5rem;
    margin: 0;
  }
}
</style>
