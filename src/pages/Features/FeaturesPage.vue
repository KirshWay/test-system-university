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
import {computed, ref} from 'vue';

import Features from '~/api/features';
import CardFeatures from '~/components/CardFeatures/CardFeatures.vue';
import {useFeaturesStore} from '~/store/features';

const featureStore = useFeaturesStore();

const message = useMessage();

const specializationText = ref<string>('');
const specializationCodeText = ref<string>('');

const competenceCodeText = ref<string>('');
const comSpecSelected = ref<null | number>(null);

const disciplineText = ref<string>('');
const disSpecSelected = ref<null | number>(null);
const disciplineSelected = ref<number[]>([]);

const createSpecialization = () => {
  Features.createSpecialization(specializationText.value, specializationCodeText.value)
    .then(({data}) => {
      featureStore.specializations.push(data);
      specializationText.value = '';
      specializationCodeText.value = '';
      message.info('Специальность создана');
    })
    .catch(() => message.error('Не получилось создать специальность'));
};

const createCompetence = () => {
  Features.createCompetence(competenceCodeText.value, comSpecSelected.value!)
    .then(({data}) => {
      featureStore.competencies.push(data);
      comSpecSelected.value = null;
      message.info('Компетенция создана');
    })
    .catch(() => message.error('Не получилось создать компетенцию'));
};

const createDiscipline = () => {
  Features.createDisciplines(disciplineText.value, disSpecSelected.value!, disciplineSelected.value)
    .then(({data}) => {
      featureStore.disciplines.push(data);
      disciplineText.value = '';
      disSpecSelected.value = null;
      disciplineSelected.value = [];
      message.info('Дисциплина создана');
    })
    .catch(() => message.error('Не получилось создать дисциплину'));
};

const dataSpecializationsForForm = computed(() => featureStore.specializations.map((el) => ({label: el.title, value: el.id})));

const dataCompetenciesForForm = computed(() => featureStore.competencies.map((el) => ({label: el.code, value: el.id})));

featureStore.getAllSpecializations();
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
            Создание специальности
            <div class="feathure__container">
              <n-input
                class="feathure__input"
                v-model:value="specializationText"
                placeholder="Специальность"
              />
              <n-input
                class="feathure__input"
                v-model:value="specializationCodeText"
                placeholder="Код специальности"
              />
              <n-button
                @click="createSpecialization"
                type="success"
                :disabled="specializationText.length === 0 || specializationCodeText.length === 0"
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
              Создание компетенции
              <div class="feathure__container">
                <n-input
                  class="feathure__input"
                  v-model:value="competenceCodeText"
                  placeholder="Код Компетенции"
                />
                <n-select
                  v-model:value="comSpecSelected"
                  :options="dataSpecializationsForForm"
                  class="feathure__input"
                  placeholder="Выберите специальность"
                />
                <n-button
                  @click="createCompetence"
                  type="success"
                  :disabled="competenceCodeText.length === 0 || comSpecSelected === null"
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
            Создание дисциплины
            <div class="feathure__container">
              <n-input
                class="feathure__input"
                v-model:value="disciplineText"
                placeholder="Дисциплина"
              />
              <n-select
                class="feathure__input"
                v-model:value="disSpecSelected"
                :options="dataSpecializationsForForm"
                placeholder="Выберите специальность"
              />
              <n-select
                v-if="disSpecSelected"
                v-model:value="disciplineSelected"
                :options="dataCompetenciesForForm"
                class="feathure__input"
                placeholder="Выберите компетенцию"
                multiple
              />
              <n-button
                @click="createDiscipline"
                type="success"
                :disabled="disciplineText.length === 0 || disSpecSelected === null || disciplineSelected.length === 0"
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
