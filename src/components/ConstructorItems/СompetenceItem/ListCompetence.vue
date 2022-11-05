<script setup lang="ts">
import {NCard, NInputNumber} from 'naive-ui';
import {ref} from 'vue';

import {useTestStore} from '~/store/test';
const {competence} = defineProps<{ competence: { code: string; competence_id: number; query_count: number } }>();

const count = ref<number>(0);

const testStore = useTestStore();

const changeCount = (eventValue: number | null, id: number) => {
  if (eventValue === count.value) {
    count.value += 1;
    return testStore.questionsBankByDiscipline.forEach((el) =>
      el.competence_id === id && (el.query_count += 1));
  }
  if (eventValue === null) {
    count.value = 0;
    return testStore.questionsBankByDiscipline.forEach((el) =>
      el.competence_id === id && (el.query_count = 0));
  }
  if (eventValue < count.value) {
    if (count.value > 0) {
      count.value -= 1;
      return testStore.questionsBankByDiscipline.forEach((el) =>
        el.competence_id === id && (el.query_count -= 1));
    }
  }
  count.value += 1;
  testStore.questionsBankByDiscipline.forEach((el) =>
    el.competence_id === id && (el.query_count += 1));
};
</script>

<template>
  <n-card
    :title="`Компетенция: ${competence.code}`"
    class="cardCompetence"
  >
    <template #header-extra>
      <n-input-number
        v-model:value="count"
        :on-update:value="(eventValue) => changeCount(eventValue, competence.competence_id)"
        placeholder="Колличество"
        clearable
      />
    </template>
  </n-card>
</template>

<style lang="scss" scoped>
.cardCompetence {
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
