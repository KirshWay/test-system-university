<script setup lang="ts">
import {MoonRegular, SunRegular} from '@vicons/fa';
import {NButton, NIcon} from 'naive-ui';

import {ThemeEnum, useUser} from '~/store/user';

const storeUser = useUser();
</script>

<template>
  <transition name="scale" mode="out-in">
    <n-button @click="storeUser.toggleTheme" v-if="storeUser.theme === ThemeEnum.Dark" quaternary>
      <template #icon>
        <n-icon><moon-regular /></n-icon>
      </template>
    </n-button>
    <n-button @click="storeUser.toggleTheme" v-else quaternary>
      <template #icon>
        <n-icon><sun-regular /></n-icon>
      </template>
    </n-button>
  </transition>
</template>
