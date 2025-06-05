<script setup lang="ts">
import { Content } from 'vuepress/client'
</script>

<template>
  <main class="vp-home">
    <div vp-content>
      <Content />
    </div>
  </main>
</template>

<style lang="scss">
@use '@vuepress/theme-default/lib/client/styles/variables' as *;

.vp-home {
  display: block;
  margin: 0 auto;
  padding: 0;

  @media (max-width: $MQMobileNarrow) {
    padding-inline: 0;
  }

  [vp-content] {
    margin: 0;
    padding: 0;
  }
}
</style>