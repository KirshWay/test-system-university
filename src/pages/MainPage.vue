<script setup lang="ts">
import {
  ref,
  inject,
  ComputedRef,
} from 'vue';
import {
  NH1,
  NSpace,
  NCard,
  NInput,
  NButton,
  NInputGroup,
  NIcon,
  NModal,
} from 'naive-ui';
import {Plus} from '@vicons/fa';
import {useRouter} from 'vue-router';
import CardTest from '../components/CardTest/CardTest.vue';

const screenWidth = inject<ComputedRef<number>>('screenWidth')!;
const router = useRouter();

const showModal = ref(false);

const search = ref('');
const nameTest = ref('');

const onCreateTest = () => {
  if (nameTest.value) {
    // TODO: API write for create
    router.push(`/test-constructor/${nameTest.value}`);
  }
};
</script>

<template>
  <div>
    <n-h1 style="display: flex; align-items: center; justify-content: space-between">
      Тесты
      <n-button @click="showModal = true" type="success" secondary>
        <template v-if="screenWidth > 640">Создать тест</template>
        <n-icon v-else>
          <Plus />
        </n-icon>
      </n-button>
    </n-h1>
    <n-card style="margin-bottom: 24px">
      <n-input-group>
        <n-input v-model:value="search" placeholder="Поиск теста" />
      </n-input-group>
    </n-card>
    <CardTest />
    <n-modal
      v-model:show="showModal"
      preset="card"
      title="Создание теста"
      style="max-width: 500px"
    >
      <n-input placeholder="Название теста" v-model:value="nameTest" @keydown.enter="onCreateTest" />
      <template #footer>
        <n-space justify="end">
          <n-button @click="nameTest = ''; showModal = false">Отменить</n-button>
          <n-button type="success" @click="onCreateTest">Создать</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<style lang="scss"></style>
