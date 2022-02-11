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
  NButton,
  NSpace,
} from 'naive-ui';

const router = useRouter();
const route = useRoute();

if (!localStorage.getItem('authorized')) {
  router.push('/auth');
}

const BUTTONS_OPTIONS = [
  {
    label: 'Main',
    key: 'main',
    color: 'primary',
    to: '/',
  },
  {
    label: 'Выйти',
    key: 'logout',
    color: 'error',
    to: '/auth',
  },
];

const filteredButtons = computed(() => BUTTONS_OPTIONS.filter((button : any) => route.path !== '/' || button.key !== 'main'));

const navigation = (url: string, key: string) => {
  if (key === 'logout') {
    localStorage.removeItem('authorized');
  }
};
</script>

<template>
  <n-layout class="authorizedLayout">
    <n-layout-header v-if="route.name !== 'NotFound'" position="absolute" bordered>
      <n-space justify="space-between" align="center">
        <h1>Testing System University</h1>
        <div>
          <router-link
              v-for="button in filteredButtons"
              :to="button.to"
              :key="button.key"
              @click="navigation(button.to, button.key)"
          >
            <n-button
                class="authorizedLayout__button"
                :type="button.color"
            >
              {{ button.label }}
            </n-button>
          </router-link>
        </div>
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
