<script setup lang="ts">
import {Bars} from '@vicons/fa';
import {
  NAvatar,
  NButton,
  NButtonGroup,
  NDrawer,
  NDrawerContent,
  NDropdown,
  NH2,
  NIcon,
  NLayout,
  NLayoutHeader,
  NMenu,
  NP,
  NScrollbar,
  useLoadingBar,
  useMessage,
} from 'naive-ui';
import {
  computed,
  ComputedRef,
  inject,
  ref,
} from 'vue';
import {
  useRoute,
  useRouter,
} from 'vue-router';

import Users from '~/api/users';
import ThemeToggle from '~/components/ThemeToggle/ThemeToggle.vue';
import {LINKS, OPTIONS} from '~/constans/header';
import {useMainStore} from '~/store/main';

const router = useRouter();
const route = useRoute();
const mainStore = useMainStore();

mainStore.message = useMessage();
mainStore.loader = useLoadingBar();
mainStore.router = router;
mainStore.route = route;

const screenWidth = inject<ComputedRef<number>>('screenWidth')!;

const showSidebar = ref<boolean>(false);

if (!localStorage.getItem('Authorization')) {
  router.push('/auth');
}

if (localStorage.getItem('Authorization')) {
  Users.getProfile().then(({data}) => mainStore.setUser(data));
}

const onSelectDropdownOption = (key: string) => {
  showSidebar.value = false;
  switch (key) {
  case 'logout':
    localStorage.removeItem('Authorization');
    router.push('/auth');
    break;
  case 'settings':
    router.push('/settings');
    break;
  default:
    const item = LINKS.find((el) => el.key === key);
    if (item && 'to' in item) router.push(item.to);
    break;
  }
};

const filteredButtons = computed(() =>
  mainStore.user.status === 'DEAN' ?
    LINKS.filter((button) => route.path !== '/' || button.key !== 'main') :
    mainStore.user.status === 'TEACHER' ?
      LINKS.filter((button) => (route.path !== '/' || button.key !== 'main') && !(['users'].includes(button.key))) :
      mainStore.user.status === 'STUDENT' ?
        LINKS.filter((button) => (route.path !== '/' || button.key !== 'main') && !(['users', 'test-constructor', 'features'].includes(button.key))) :
        null!,
);
</script>

<template>
  <n-layout class="authorizedLayout">
    <n-drawer
      v-model:show="showSidebar"
      :width="320"
      placement="left"
      class="authorizedLayout__drawer"
    >
      <n-drawer-content title="Stoner" body-content-style="padding-left: 0; padding-right: 0" header-style="width: 100%">
        <template #header>
          <div style="padding: 8px 0">
            <n-avatar
              round
              object-fit="cover"
              :size="88"
              :src="mainStore.avatar"
            />
            <n-h2>
              {{ mainStore.user.firstName }} {{ mainStore.user.lastName }} {{ mainStore.user.patronymic }}
            </n-h2>
            <n-p depth="3">
              {{ mainStore.user.email }}
            </n-p>
          </div>
        </template>
        <n-menu
          :on-update:value="onSelectDropdownOption"
          :options="filteredButtons"
        />
        <n-menu
          :on-update:value="onSelectDropdownOption"
          :options="OPTIONS"
        />
        <template #footer>
          <ThemeToggle />
        </template>
      </n-drawer-content>
    </n-drawer>

    <n-layout-header v-if="route.name !== 'NotFound'" position="absolute" bordered>
      <div style="display: flex; justify-content: space-between; align-items: center">
        <template v-if="screenWidth > 640">
          <n-button-group>
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
          <div style="display: flex; align-items: center">
            <ThemeToggle style="margin-right: 10px" />
            <n-dropdown
              :options="OPTIONS"
              @select="onSelectDropdownOption"
              placement="bottom-end"
            >
              <n-button :bordered="false">
                <span style="margin-right: 16px">
                  {{ mainStore.user.firstName }} {{ mainStore.user.lastName }}
                </span>
                <n-avatar
                  round
                  object-fit="cover"
                  size="medium"
                  :src="mainStore.avatar"
                />
              </n-button>
            </n-dropdown>
          </div>
        </template>
        <n-button
          v-else
          quaternary
          @click="showSidebar = !showSidebar"
          style="font-size: 24px"
        >
          <n-icon>
            <Bars />
          </n-icon>
        </n-button>
      </div>
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

  &__drawer {
    .n-drawer-header {
      width: 100%;
      box-sizing: border-box;
    }

    .n-drawer-header__main {
      width: 100%;
    }
  }

  &__name {
    margin-bottom: 4px;
    margin-top: 16px;
    width: 100%;
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 24px;
  }

  &__email {
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 24px;
  }

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
  padding: 0 16px;
  align-items: center;
  z-index: 10;

  @media (min-width: 640px) {
    padding: 0 32px;
  }
}
</style>
