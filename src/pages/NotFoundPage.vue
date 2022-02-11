<script setup lang="ts">
import {
  NResult,
  NButton,
} from 'naive-ui';
import {useRouter} from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="notFoundPage">
    <n-result
        status="404"
        title="404 Not Found Page"
    />
    <n-button @click="router.push('/')" type="info">Back to main page</n-button>
  </div>
</template>

<style lang="scss">
.notFoundPage {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
