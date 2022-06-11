<script setup lang="ts">
import {PlusCircle} from '@vicons/fa';
import {
  NButton,
  NCard,
  NIcon,
  NInput,
  NInputGroup,
  NModal,
  NSelect,
  NSpace,
  NTooltip,
  useLoadingBar,
  useMessage,
} from 'naive-ui';
import {
  computed,
  ComputedRef,
  inject,
  ref,
} from 'vue';
import {useRouter} from 'vue-router';

import Users from '~/api/users';
import CardUser from '~/components/CardUser/CardUser.vue';
import {useUser} from '~/store/user';

const message = useMessage();
const loader = useLoadingBar();

const router = useRouter();
const storeUser = useUser();

if (storeUser.user.status === 'STUDENT') {
  router.push('/');
}

const screenWidth = inject<ComputedRef<number>>('screenWidth')!;

const TYPES_USERS_SEARCH = [
  {
    label: 'Все',
    value: 'all',
  },
  {
    label: 'Разработчик тестов',
    value: 'TEACHER',
  },
  {
    label: 'Студент',
    value: 'STUDENT',
  },
];

const TYPES_USERS_CREATED = [
  {
    label: 'Разработчик тестов',
    value: 'TEACHER',
  },
  {
    label: 'Студент',
    value: 'STUDENT',
  },
];

const showModal = ref(false);

const searchType = ref('all');
const search = ref('');

const selectedType = ref<string>();
const username = ref('');
const firstName = ref('');
const lastName = ref('');
const patronymic = ref('');
const email = ref('');
const password = ref('');

const submit = () => {
  Users.createUser(
    username.value,
    email.value,
    firstName.value,
    lastName.value,
    patronymic.value,
    password.value,
    selectedType.value!,
  )
    .then(() => {
      showModal.value = false;
      storeUser.getAllUsers();
    })
    .catch(loader.error)
    .finally(() => {
      loader.finish;
      message.success('Пользователь создан');
    });
};

storeUser.getAllUsers();

const filteredListUsers = computed(() =>
  storeUser.users.filter((el) =>
    (searchType.value === 'all' || el.status === searchType.value) &&
        (el.email?.toLowerCase().includes(search.value.toLowerCase()) ||
            el.lastName?.toLowerCase().includes(search.value.toLowerCase()) ||
            el.username?.toLowerCase().includes(search.value.toLowerCase()))));
</script>

<template>
  <div>
    <n-space style="margin-bottom: 2%" justify="end">
      <n-button type="success" @click="showModal = true" secondary>
        <template v-if="screenWidth > 640">
          Создать пользователя
        </template>
        <n-tooltip v-else placement="bottom-start" trigger="hover">
          <template #trigger>
            <n-icon>
              <plus-circle />
            </n-icon>
          </template>
          Создать пользователя
        </n-tooltip>
      </n-button>
    </n-space>
    <n-card title="Поиск пользователя" style="margin-bottom: 3%">
      <n-input-group>
        <n-input v-model:value="search" placeholder="Пользователь" />
        <n-select v-model:value="searchType" :options="TYPES_USERS_SEARCH" style="width: 200px" />
      </n-input-group>
    </n-card>
    <div style="display: flex; flex-direction: column; gap: 10px">
      <CardUser
        v-for="user in filteredListUsers"
        :key="user.uuid"
        :user="user"
      />
    </div>
    <n-modal
      v-model:show="showModal"
      preset="card"
      title="Создание пользователя"
      style="max-width: 500px"
    >
      <form @submit.prevent="submit">
        <n-space vertical>
          Выберите тип создаваемого пользователя
          <n-select
            placeholder="Тип пользователя"
            filterable
            v-model:value="selectedType"
            :options="TYPES_USERS_CREATED"
          />
          Имя пользователя
          <n-input v-model:value="firstName" placeholder="Имя" />
          Фамилия пользователя
          <n-input v-model:value="lastName" placeholder="Фамилия" />
          Отчество пользователя
          <n-input v-model:value="patronymic" placeholder="Отчество" />
          Почта пользователя
          <n-input placeholder="Почта" name="email" v-model:value="email" />
          Пароль пользователя
          <n-input
            style="margin-bottom: 2%"
            placeholder="Пароль"
            type="password"
            name="password"
            v-model:value="password"
          />
          <n-button type="success" attr-type="submit" secondary>
            Создать
          </n-button>
        </n-space>
      </form>
    </n-modal>
  </div>
</template>
