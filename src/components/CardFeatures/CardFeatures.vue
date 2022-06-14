<script setup lang="ts">
import {PenAlt, Trash} from '@vicons/fa';
import {
  NButton,
  NButtonGroup,
  NCard,
  NIcon,
  NInput,
  NModal,
  NP,
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

const {feature, typeFeature} = defineProps<{
  feature: {
    id: number,
    title?: string,
    description?: string,
    code?: string
  },
  typeFeature: string
}>();

const featureStore = useFeaturesStore();

const disciplineOptions = ref<number[]>([]);

const reactiveShowModal = computed(() => featureStore.responseDiscipline.competences);

watch(reactiveShowModal, (v) => {
  if (v) {
    disciplineOptions.value = featureStore.responseDiscipline.competences.map((el) => el.id);
  }
});
</script>

<template>
  <n-card style="margin-bottom: 2%" hoverable>
    <n-space align="center" justify="space-between">
      <n-p style="margin: 0">
        <strong>Название: </strong> {{ feature.title || feature.code }}
      </n-p>
      <n-button-group align="center">
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button
              @click="featureStore.getOnceFeature(feature.id, typeFeature)"
              type="warning"
            >
              <template #icon>
                <n-icon>
                  <PenAlt />
                </n-icon>
              </template>
            </n-button>
          </template>
          Редактирование компетенции
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
      :title="`Изменение ${typeFeature === 'competence' ?
        'компетенции' : typeFeature === 'specialization' ?
          'специальности' : 'дисциплины'}`"
      style="max-width: 500px"
    >
      <n-space vertical>
        <template v-if="featureStore.typeResponse === 'competence'">
          Код компетенции
          <n-input v-model:value="featureStore.responseCompetence.code" />
          <n-select
            class="feathure__input"
            placeholder="Специальность"
          />
        </template>

        <template v-if="featureStore.typeResponse === 'specialization'">
          Специальность
          <n-input v-model:value="featureStore.responseSpecializations.title" />
          Код специальности
          <n-input v-model:value="featureStore.responseSpecializations.code" />
        </template>

        <template v-if="featureStore.typeResponse === 'discipline'">
          Дисциплина
          <n-input v-model:value="featureStore.responseDiscipline.title" />
          <n-select
            v-model:value="disciplineOptions"
            placeholder="Выберите компетенцию"
            multiple
            :options="featureStore.optionsCompetencies"
          />
        </template>

        <n-space justify="end">
          <n-button
            @click="featureStore.updateFeature(typeFeature, disciplineOptions)"
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
