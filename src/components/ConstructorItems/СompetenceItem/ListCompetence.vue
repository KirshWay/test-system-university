<script setup lang="ts">
import {NCard, NInputNumber} from 'naive-ui';
import {ref} from 'vue';

const numberDiscipline = ref<number>(0);

const {competence} = defineProps<{ competence: { label: string; value: number; } }>();
</script>

<template>
  <n-card
    :title="`Компетенция: ${competence.label}`"
    class="cardCompetence"
  >
    <template #header-extra>
      <n-input-number
        v-model:value="numberDiscipline"
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
