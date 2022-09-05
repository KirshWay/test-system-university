<script setup lang="ts">
import {MoonRegular, SunRegular} from '@vicons/fa';
import {NButton, NIcon} from 'naive-ui';

import {ThemeEnum, useMainStore} from '~/store/main';

const mainStore = useMainStore();
</script>

<template>
  <transition name="scale" mode="out-in">
    <n-button @click="mainStore.toggleTheme" v-if="mainStore.theme === ThemeEnum.Dark" quaternary>
      <template #icon>
        <n-icon><moon-regular /></n-icon>
      </template>
    </n-button>
    <n-button @click="mainStore.toggleTheme" v-else quaternary>
      <template #icon>
        <n-icon><sun-regular /></n-icon>
      </template>
    </n-button>
  </transition>
</template>
