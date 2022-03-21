<script setup lang="ts">
import {ref} from 'vue';
import {
  NRadioGroup,
  NRadio,
  NSpace,
  NCheckboxGroup,
  NCheckbox,
} from 'naive-ui';
import TestConstructor from '../components/TestConstructor/TestConstructor.vue';

const typeTest = ref(false);

const TESTS_INFO = [
  {
    id: 1,
    label: 'test1',
  },
  {
    id: 2,
    label: 'test2',
  },
  {
    id: 3,
    label: 'test3',
  },
  {
    id: 4,
    label: 'test4',
  },
];

const chooseRadioAnswer = ref('');
const chooseCheckBoxAnswer = ref(null);
</script>

<template>
  <div>
<!--    <template v-if="!typeTest">-->
<!--      <n-radio-group v-model:value="chooseRadioAnswer" name="radiogroup">-->
<!--        <n-space vertical>-->
<!--          <n-radio v-for="test in TESTS_INFO" :key="test.id" :value="test.label">-->
<!--            {{ test.label }}-->
<!--          </n-radio>-->
<!--        </n-space>-->
<!--      </n-radio-group>-->
<!--    </template>-->
<!--    <template v-if="typeTest">-->
<!--      <n-checkbox-group v-model:value="chooseCheckBoxAnswer">-->
<!--        <n-space vertical item-style="display: flex;">-->
<!--          <n-checkbox v-for="test in TESTS_INFO" :key="test.id" :value="test.label" :label="test.label" />-->
<!--        </n-space>-->
<!--      </n-checkbox-group>-->
<!--    </template>-->
    <TestConstructor/>
  </div>
</template>
