<script setup lang="ts">
import {PenAlt, Trash} from '@vicons/fa';
import {
  NButton,
  NButtonGroup,
  NCard,
  NIcon,
  NInput,
  NModal,
  NSelect,
  NSpace,
  NTooltip,
} from 'naive-ui';
import {
  computed,
  ref,
  watch,
} from 'vue';

import {useFeaturesStore} from '~/store/features';
import {Competence, Specialization} from '~/types/feature';

const {feature, typeFeature} = defineProps<{
  feature: {
    id: number,
    title?: string,
    code?: string
    specialization?: Specialization,
    competences?: Competence[],
  },
  typeFeature: string
}>();

const featureStore = useFeaturesStore();

const disciplineSelected = ref<number[]>([]);

const reactiveShowModal = computed(() => featureStore.responseDiscipline.competences);

const dataSpecializationsForForm = computed(() => featureStore.specializations.map((el) => ({label: el.title, value: el.id})));

const dataCompetenciesForForm = computed(() => featureStore.competencies.map((el) => ({label: el.code, value: el.id})));

const textTooltip = computed(() => `Редактирование ${typeFeature === 'competence' ?
  'компетенции' : typeFeature === 'specialization' ?
    'специальности' : 'дисциплины'}`);

const titleChangeFeature = computed(() => `Изменение ${typeFeature === 'competence' ?
  'компетенции' : typeFeature === 'specialization' ?
    'специальности' : 'дисциплины'}`);

const getCompetencesBySpecialization = (value: number) => {
  featureStore.getCompetencesBySpecialization(value);
  featureStore.responseDiscipline.specialization.id = value;
  disciplineSelected.value = [];
};

watch(reactiveShowModal, (view) => {
  if (view) {
    disciplineSelected.value = featureStore.responseDiscipline.competences.map((el) => el.id);
  }
});
</script>

<template>
  <n-card style="margin-bottom: 2%" hoverable>
    <n-space align="center" justify="space-between">
      <n-space
        v-if="typeFeature === 'specialization'"
        vertical
      >
        <p><strong>Название специальности: </strong> {{ feature.title }}</p>
        <p><strong>Код специальности: </strong> {{ feature.code }}</p>
      </n-space>
      <n-space
        v-if="typeFeature === 'competence'"
        vertical
      >
        <p><strong>Название компетенции: </strong> {{ feature.code }}</p>
        <p><strong>Выбранная специальность: </strong> {{ feature?.specialization?.title }}</p>
      </n-space>
      <n-space
        v-if="typeFeature === 'discipline'"
        vertical
      >
        <p><strong>Название дисциплины: </strong> {{ feature.title }}</p>
        <p><strong>Выбранная специальность: </strong> {{ feature?.specialization?.title }}</p>
        <p><strong>Выбранные компетенции: </strong> {{ feature.competences?.map((el) => el.code).toString() }}</p>
      </n-space>
      <n-button-group align="center">
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button
              @click="featureStore.getOnceFeature(feature.id, typeFeature, feature?.specialization?.id || null)"
              type="warning"
            >
              <template #icon>
                <n-icon>
                  <PenAlt />
                </n-icon>
              </template>
            </n-button>
          </template>
          {{ textTooltip }}
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button
              @click="featureStore.deleteFeature(feature.id, typeFeature)"
              type="error"
            >
              <template #icon>
                <n-icon>
                  <Trash />
                </n-icon>
              </template>
            </n-button>
          </template>
          Удалить компетенцию
        </n-tooltip>
      </n-button-group>
    </n-space>

    <n-modal
      v-model:show="featureStore.showModal"
      preset="card"
      :title="titleChangeFeature"
      style="max-width: 500px"
    >
      <n-space vertical>
        <template v-if="featureStore.typeResponse === 'specialization'">
          Название специальности
          <n-input
            v-model:value="featureStore.responseSpecializations.title"
            placeholder="Специальность"
          />
          Код специальности
          <n-input
            v-model:value="featureStore.responseSpecializations.code"
            placeholder="Код специальности"
          />
        </template>

        <template v-if="featureStore.typeResponse === 'competence'">
          Название компетенции
          <n-input
            v-model:value="featureStore.responseCompetence.code"
            placeholder="Компетенция"
          />
          Выбранная специальность
          <n-select
            v-model:value="featureStore.responseCompetence.specialization.id"
            :options="dataSpecializationsForForm"
            class="feathure__input"
            placeholder="Изменить специальность"
            filterable
          />
        </template>

        <template v-if="featureStore.typeResponse === 'discipline'">
          Название дисциплины
          <n-input
            v-model:value="featureStore.responseDiscipline.title"
            placeholder="Дисциплина"
          />
          Выбранная специальность
          <n-select
            v-model:value="featureStore.responseDiscipline.specialization.id"
            :on-update:value="(v) => getCompetencesBySpecialization(v)"
            :options="dataSpecializationsForForm"
            placeholder="Выберите специальность"
            filterable
          />
          Выбранные компетенции
          <n-select
            v-model:value="disciplineSelected"
            :options="dataCompetenciesForForm"
            placeholder="Выберите компетенции"
            multiple
            filterable
          />
        </template>

        <n-space justify="end">
          <n-button
            @click="featureStore.updateFeature(typeFeature, disciplineSelected)"
            type="success"
            secondary
          >
            Изменить
          </n-button>
        </n-space>
      </n-space>
    </n-modal>
  </n-card>
</template>
