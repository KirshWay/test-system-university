<script setup lang="ts">
import {ref} from 'vue';
import {
  NP,
  NDivider,
  NCard,
  NSpace,
  NInput,
  NSwitch,
  NRadio,
  NRadioGroup,
  NCheckbox,
  NCheckboxGroup,
  NIcon,
  NButton,
  NAlert,
} from 'naive-ui';
import {Question, Plus, Trash} from '@vicons/fa';
import {useTestStore} from '../../store/tests';

const testStore = useTestStore();

const titleTest = ref('');
const questionTitle = ref('');
const valueChoose = ref(null);
const active = ref(false);
</script>

<template>
  <n-card>
    <n-input placeholder="Заголовок теста" v-model:value="titleTest" />
    <n-divider />
    <n-card>
      <n-space vertical>
        <n-input placeholder="Заголовок вопроса" v-model:value="questionTitle" style="margin-bottom: 2%" />
        <n-radio-group v-if="!active && testStore.answers.length !== 0" v-model:value="valueChoose" name="radiogroup" style="width: 100%;">
          <n-space vertical>
            <n-radio class="constructor__marker" v-for="test in testStore.answers" :key="test.uuid_answer" :value="test.text">
              <n-input @keydown.enter="testStore.updateAnswerText(test.uuid_answer, test.text)" v-model:value="test.text" />
              <n-button style="width: 100%" @click="testStore.deleteAnswer(test.uuid_answer)" type="error" size="small" secondary>
                <template #icon>
                  <n-icon>
                    <Trash />
                  </n-icon>
                </template>
              </n-button>
            </n-radio>
          </n-space>
        </n-radio-group>
        <n-checkbox-group v-if="active && testStore.answers.length !== 0" v-model:value="valueChoose">
          <n-space vertical>
            <n-checkbox
              class="constructor__marker" v-for="test in testStore.answers"
              :key="test.uuid_answer" :checked="test.correct_answer"
              :label="test.text"
            >
              <n-input @keydown.enter="testStore.updateAnswerText(test.uuid_answer, test.text)" v-model:value="test.text" />
              <n-button style="width: 100%" @click="testStore.deleteAnswer(test.uuid_answer)" type="error" size="small" secondary>
                <template #icon>
                  <n-icon>
                    <Trash />
                  </n-icon>
                </template>
              </n-button>
            </n-checkbox>
          </n-space>
        </n-checkbox-group>
        <n-button @click="testStore.addAnswer" dashed class="constructor__button" style="justify-content: flex-start;">
          <template #icon>
            <n-icon>
              <Plus />
            </n-icon>
          </template>
          Добавить ответ
        </n-button>
        <n-space style="margin: 1% 0" align="center">
          <n-switch v-model:value="active" />
          <n-p>Несколько правильных ответов</n-p>
        </n-space>
        <n-alert v-if="valueChoose === null" title=" Вы не выбрали правильный ответ" type="warning" />
      </n-space>
    </n-card>
    <n-button dashed class="constructor__button">
      <template #icon>
        <n-icon>
          <Question />
        </n-icon>
      </template>
      Добавить вопрос
    </n-button>
  </n-card>
</template>

<style lang="scss" scoped>
.constructor {
  &__button {
    width: 100%;
    margin-top: 2%;
  }

  &__marker {
    display: flex;
    align-items: center;
  }
}
</style>
