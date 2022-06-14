<script setup lang="ts">
import {Plus} from '@vicons/fa';
import {
  NButton,
  NCard,
  NH3,
  NIcon,
  NInput,
  NSelect,
  NSpace,
  NTabPane,
  NTabs, useMessage,
} from 'naive-ui';
import {ref} from 'vue';

import Features from '~/api/features';
import CardFeatures from '~/components/CardFeatures/CardFeatures.vue';
import {useFeaturesStore} from '~/store/features';

const featureStore = useFeaturesStore();

const message = useMessage();

const competenceCodeValue = ref<string>('');
const specializationValue = ref<string>('');
const specializationCodeValue = ref<string>('');
const disciplineValue = ref<string>('');
const disciplineOptions = ref<number[]>([]);

const createCompetence = () => {
  Features.createCompetence(competenceCodeValue.value)
    .then(({data}) => {
      featureStore.competencies.push(data);
      message.info('Компетенция создана');
    })
    .catch(() => message.error('Не получилось создать компетенцию'));
};

const createSpecialization = () => {
  Features.createSpecialization(specializationValue.value, specializationCodeValue.value)
    .then(({data}) => {
      featureStore.specializations.push(data);
      message.info('Специальность создана');
    })
    .catch(() => message.error('Не получилось создать cпециальность'));
};

const createDiscipline = () => {
  Features.createDisciplines(disciplineValue.value, disciplineOptions.value)
    .then(({data}) => {
      featureStore.disciplines.push(data);
      message.info('Дисциплина создана');
    })
    .catch(() => message.error('Не получилось создать дисциплину'));
};

featureStore.getAllSpecializations();
featureStore.getAllCompetencies();
featureStore.getAllDisciplines();
</script>

<template>
  <div>
    <n-h3>Справочник</n-h3>
    <n-tabs
      :on-update:value="featureStore.getTabsValue"
      type="segment"
    >
      <n-tab-pane name="specialization" tab="Специальность">
        <n-card style="margin-bottom: 2%;">
          <n-space vertical>
            Специальность
            <div class="feathure__container">
              <n-input
                class="feathure__input"
                v-model:value="specializationValue"
                placeholder="Специальность"
              />
              <n-input
                class="feathure__input"
                v-model:value="specializationCodeValue"
                placeholder="Код специальности"
              />
              <n-button
                @click="createSpecialization"
                type="success"
                :disabled="specializationValue.length === 0 || specializationCodeValue.length === 0"
              >
                <template #icon>
                  <n-icon>
                    <Plus />
                  </n-icon>
                </template>
              </n-button>
            </div>
          </n-space>
        </n-card>
        <CardFeatures
          v-for="specialization in featureStore.specializations"
          :key="specialization.id"
          :feature="specialization"
          :type-feature="`specialization`"
        />
      </n-tab-pane>
      <n-tab-pane name="competencies" tab="Компетенции">
        <n-card style="margin-bottom: 2%;">
          <n-space vertical>
            <n-space vertical>
              Компетенция
              <div class="feathure__container">
                <n-input
                  class="feathure__input"
                  v-model:value="competenceCodeValue"
                  placeholder="Код Компетенции"
                />
                <n-select
                  class="feathure__input"
                  placeholder="Выберите специальность"
                />
                <n-button
                  @click="createCompetence"
                  type="success"
                  :disabled="competenceCodeValue.length === 0"
                >
                  <template #icon>
                    <n-icon>
                      <Plus />
                    </n-icon>
                  </template>
                </n-button>
              </div>
            </n-space>
          </n-space>
        </n-card>
        <CardFeatures
          v-for="competence in featureStore.competencies"
          :key="competence.id"
          :feature="competence"
          :type-feature="`competence`"
        />
      </n-tab-pane>
      <n-tab-pane name="discipline" tab="Дисциплина">
        <n-card style="margin-bottom: 2%;">
          <n-space vertical>
            Дисциплина
            <div class="feathure__container">
              <n-input
                class="feathure__input"
                v-model:value="disciplineValue"
                placeholder="Дисциплина"
              />
              <n-select
                class="feathure__input"
                placeholder="Выберите компетенцию"
              />
              <n-select
                class="feathure__input"
                placeholder="Выберите специальность"
              />
              <n-button
                @click="createDiscipline"
                type="success"
                :disabled="disciplineValue.length === 0 || !disciplineOptions"
              >
                <template #icon>
                  <n-icon>
                    <Plus />
                  </n-icon>
                </template>
              </n-button>
            </div>
          </n-space>
        </n-card>
        <CardFeatures
          v-for="discipline in featureStore.disciplines"
          :key="discipline.id"
          :feature="discipline"
          :type-feature="`discipline`"
        />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<style lang="scss" scoped>
.feathure {
  &__container {
    display: flex;
    flex-direction: row;

    @media (max-width: 640px) {
      flex-direction: column;
    }
  }

  &__input {
    margin: 0 2% 0 0;

    @media (max-width: 640px) {
      margin: 0 0 2% 0;
    }
  }
}
</style>
