<script setup lang="ts">
// @ts-nocheck
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

import Bank from '~/api/bank';
import Features from '~/api/features';
import Tests from '~/api/tests';
import ListCompetence from '~/components/ConstructorItems/СompetenceItem/ListCompetence.vue';
import {useTestStore} from '~/store/test';
import {Competence} from '~/types/feature';
const testStore = useTestStore();

const allCompetence = ref<Competence[]>([]);

const selectedCompetence = ref<null | number>(null);
const numberCompetence = ref<number>(0);

const switcherCompetenceChoice = ref<boolean>(false);

Features.getAllCompetencies().then(({data}) => allCompetence.value = data);

const dataCompetenciesForForm = computed(() => testStore.responseCompetences.map((el) => ({label: el.code, value: el.id})));

const sendToBankByCompetence = (competence: number, quantityCompetences: number ) => {
  console.log(testStore.test.uuidTesting);
  Bank.addQuestionsBankByCompetence(competence, quantityCompetences, testStore.test.uuidTesting)
    .then(() => Tests.getTest(testStore.test.uuidTesting, '1'));
  selectedCompetence.value = null;
  numberCompetence.value = 0;
};
</script>

<template>
  <n-card v-if="testStore.showBankMenu">
    <n-space style="margin-bottom: 2%" justify="space-between" align="center">
      <p class="competence__title">
        Создать по
      </p>
      <n-switch v-model:value="switcherCompetenceChoice">
        <template #checked>
          дисциплине
        </template>
        <template #unchecked>
          компетенции
        </template>
      </n-switch>
    </n-space>
    <template v-if="!switcherCompetenceChoice">
      <n-input-group style="margin-bottom: 1%;">
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
      <n-collapse arrow-placement="right" style="margin-bottom: 3%">
        <n-collapse-item title="Дисциплина">
          <ListCompetence
            v-for="competence in dataCompetenciesForForm"
            :key="competence.value"
            :competence="competence"
          />
        </n-collapse-item>
      </n-collapse>
      <n-space justify="space-between">
        <n-button
          @click="testStore.showBankMenu = !testStore.showBankMenu"
          type="error"
        >
          Отмена
        </n-button>
        <n-button type="success">
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
