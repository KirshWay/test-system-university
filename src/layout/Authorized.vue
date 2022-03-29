<script setup lang="ts">
import {computed} from 'vue';
import {
  useRouter,
  useRoute,
} from 'vue-router';
import {
  NLayout,
  NLayoutHeader,
  NScrollbar,
  NDropdown,
  NButton,
  NButtonGroup,
  NIcon,
  NSpace,
  NAvatar,
} from 'naive-ui';
import {UserCircle} from '@vicons/fa';

const router = useRouter();
const route = useRoute();

if (!localStorage.getItem('Authorization')) {
  router.push('/auth');
}

const BUTTONS_OPTIONS = [
  {
    label: 'Главная',
    key: 'main',
    to: '/',
  },
  {
    label: 'Пользователи',
    key: 'users',
    to: '/users',
  },
  {
    label: 'Создать тест',
    key: 'test-constructor',
    to: '/test-constructor',
  },
];

const OPTIONS = [
  {
    label: 'Выйти',
    key: 'logout',
    color: 'error',
    to: '/auth',
  },
];

const onSelectDropdownOption = (key: string) => {
  switch (key) {
  case 'logout':
    localStorage.removeItem('Authorization');
    router.push('/auth');
    break;
  }
};

const filteredButtons = computed(() => BUTTONS_OPTIONS.filter((button : any) => route.path !== '/' || button.key !== 'main'));
</script>

<template>
  <n-layout class="authorizedLayout">
    <n-layout-header v-if="route.name !== 'NotFound'" position="absolute" bordered>
      <n-space justify="space-between" align="center">
        <div style="display: flex; align-items: center">
          <n-avatar
            round
            size="medium"
            src="/logo.jpg"
          />
          <n-button-group style="margin-left: 10px">
            <router-link
              v-for="button in filteredButtons"
              :to="button.to"
              :key="button.key"
            >
              <n-button
                class="authorizedLayout__button"
                size="medium"
              >
                {{ button.label }}
              </n-button>
            </router-link>
          </n-button-group>
        </div>
        <n-dropdown trigger="hover" :options="OPTIONS" @select="onSelectDropdownOption">
          <n-icon style="padding-top: 10px" size="30">
            <user-circle />
          </n-icon>
        </n-dropdown>
      </n-space>
    </n-layout-header>

    <n-scrollbar class="authorizedLayout__scrollbar scrollContainer">
      <router-view v-slot="{ Component }">
        <transition name="scale" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </n-scrollbar>
  </n-layout>
</template>

<style lang="scss">
.authorizedLayout {
  padding-top: var(--header-height);

  &__button.n-button {
    margin: 5px;
  }

  &__scrollbar {
    & > .n-scrollbar-container {
      box-sizing: border-box;

      & > .n-scrollbar-content {
        padding: 24px 16px;

        @media (min-width: 640px) {
          padding: 24px 10vw;
        }
      }
    }
  }
}

.n-layout-header {
  grid-template-rows: calc(var(--header-height) - 1px);
  display: grid;
  padding: 0 32px;
  align-items: center;
  z-index: 10;
}
</style>
