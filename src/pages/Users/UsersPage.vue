<script setup lang="ts">
import {
  computed,
  ComputedRef,
  inject,
  ref,
} from 'vue';
import {
  NCard,
  NSelect,
  NSpace,
  NInput,
  NInputGroup,
  NButton,
  NModal,
  NIcon,
  NTooltip,
  useLoadingBar,
  useMessage,
} from 'naive-ui';
import {PlusCircle} from '@vicons/fa';
import CardUser from '~/components/CardUser/CardUser.vue';
import Users from '~/api/users';
import {UsersModel} from '~/types/common';

const message = useMessage();
const loader = useLoadingBar();

const screenWidth = inject<ComputedRef<number>>('screenWidth')!;

const TYPES_USERS = [
  {
    label: 'Все',
    value: 'all',
  },
  {
    label: 'Преподаватель',
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
const firstName = ref('');
const lastName = ref('');
const patronymic = ref('');
const email = ref('');
const password = ref('');

const allUsers = ref<UsersModel[]>([]);

const getAllUsers = () => {
  loader.start();
  const students = Users.getAllStudents().then(({data}) => data);
  const teachers = Users.getAllTeachers().then(({data}) => data);
  return Promise.all([students, teachers]).then((users) => allUsers.value = allUsers.value.concat(...users))
    .catch(loader.error)
    .finally(loader.finish);
};

getAllUsers();

const filteredListUsers = computed(() =>
  allUsers.value.filter((el) =>
    (searchType.value === 'all' || el.status === searchType.value) &&
        (el.email?.toLowerCase().includes(search.value.toLowerCase()) ||
            el.lastName?.toLowerCase().includes(search.value.toLowerCase()))));

const submit = () => {
  Users.createUser(
    email.value,
    firstName.value,
    lastName.value,
    patronymic.value,
    password.value,
    selectedType.value!,
  )
    .then(() => {
      showModal.value = false;
      getAllUsers();
    })
    .catch(loader.error)
    .finally(() => {
      loader.finish;
      message.success('Пользователь создан');
    });
};
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
        <n-select v-model:value="searchType" :options="TYPES_USERS" style="width: 200px"/>
      </n-input-group>
    </n-card>
    <div style="display: flex; flex-direction: column; gap: 10px">
      <CardUser
        v-for="user in filteredListUsers"
        :key="user.uuid"
        :email="user.email"
        :firstName="user.firstName"
        :lastName="user.lastName"
        :patronymic="user.patronymic"
        :status="user.status"
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
            :options="TYPES_USERS"
          />
          Редактирование имени
          <n-input v-model:value="firstName" placeholder="Имя" />
          Редактирование фамилии
          <n-input v-model:value="lastName" placeholder="Фамилия" />
          Редактирование отчества
          <n-input v-model:value="patronymic" placeholder="Отчество" />
          Почта пользователя
          <n-input placeholder="Почту" name="email" v-model:value="email" />
          Пароль пользователя
          <n-input style="margin-bottom: 2%" placeholder="Пароль" type="password" name="password" v-model:value="password" />
          <n-button type="success" attr-type="submit" secondary>Создать</n-button>
        </n-space>
      </form>
    </n-modal>
  </div>
</template>
