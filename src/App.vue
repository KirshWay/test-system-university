<script setup lang="ts">
import {
  darkTheme,
  NConfigProvider,
  NDialogProvider,
  NLayout,
  NLoadingBarProvider,
  NMessageProvider,
  NNotificationProvider,
} from 'naive-ui';
import {
  computed, provide, ref,
} from 'vue';

const screenWidth = ref(window.innerWidth);

provide('screenWidth', computed(() => screenWidth.value));

window.addEventListener('resize', () => {
  screenWidth.value = window.innerWidth;
});
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider placement="bottom">
            <n-layout>
              <router-view v-slot="{ Component }">
                <transition name="scale" mode="out-in">
                  <component :is="Component" />
                </transition>
              </router-view>
            </n-layout>
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style lang="scss">
html {
  --header-height: 64px;
}

body {
  overflow: hidden;
}

a {
  text-decoration: none;
}

.n-layout {
  height: 100vh;
}

.n-button-group:not(.n-button-group--vertical) a:last-child:not(:first-child) .n-button {
  margin-left: 0!important;
  border-top-left-radius: 0!important;
  border-bottom-left-radius: 0!important;
}

.n-button-group:not(.n-button-group--vertical) a:not(:first-child):not(:last-child) .n-button {
  margin-left: 0!important;
  margin-right: 0!important;
  border-radius: 0!important;
}

.n-button-group:not(.n-button-group--vertical) a:first-child:not(:last-child) .n-button {
  margin-right: 0!important;
  border-top-right-radius: 0!important;
  border-bottom-right-radius: 0!important;
}

.scale-enter-active,
.scale-leave-active {
  transition: opacity 0.2s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
}
</style>
