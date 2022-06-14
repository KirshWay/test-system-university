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
import {ref} from 'vue';

import {useTestStore} from '~/store/test';
const testStore = useTestStore();

const numberСompetence = ref<number>(0);
const numberDiscipline = ref<number>(0);

const switcherСompetenceChoice = ref<boolean>(false);
</script>

<template>
  <n-card v-if="testStore.showBankMenu">
    <n-space style="margin-bottom: 2%" justify="space-between" align="center">
      <p class="competence__title">
        Создать по
      </p>
      <n-switch v-model:value="switcherСompetenceChoice">
        <template #checked>
          дисциплине
        </template>
        <template #unchecked>
          компетенции
        </template>
      </n-switch>
    </n-space>
    <template v-if="!switcherСompetenceChoice">
      <n-input-group style="margin-bottom: 1%;">
        <n-select placeholder="Выберите компетенцию" />
        <n-input-number
          v-model:value="numberСompetence"
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
        <n-button type="success">
          Выбрать
        </n-button>
      </n-space>
    </template>
    <template v-else>
      <n-collapse arrow-placement="right" style="margin-bottom: 3%">
        <n-collapse-item title="Дисциплина">
          <n-card title="Компетенция">
            <template #header-extra>
              <n-input-number
                v-model:value="numberDiscipline"
                placeholder="Колличество"
                clearable
              />
            </template>
          </n-card>
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
