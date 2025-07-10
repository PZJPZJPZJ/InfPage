<script setup lang="ts">
import VPNavbarBrand from '@theme/VPNavbarBrand.vue'
import VPNavbarItems from '@theme/VPNavbarItems.vue'
import VPToggleColorModeButton from '@theme/VPToggleColorModeButton.vue'
import VPToggleSidebarButton from '@theme/VPToggleSidebarButton.vue'
import { useData } from '@theme/useData'
import { DeviceType, useUpdateDeviceStatus } from '@theme/useUpdateDeviceStatus'
import { hasGlobalComponent } from '@vuepress/helper/client'
import type { VNode } from 'vue'
import { computed, ref, resolveComponent, useTemplateRef } from 'vue'

defineEmits<{
  toggleSidebar: []
}>()

defineSlots<{
  before?: (props: Record<never, never>) => VNode | VNode[] | null
  after?: (props: Record<never, never>) => VNode | VNode[] | null
}>()

const SearchBox = hasGlobalComponent('SearchBox')
  ? resolveComponent('SearchBox')
  : (): null => null

const { themeLocale } = useData()

const navbar = useTemplateRef<HTMLElement | null>('navbar')
const navbarBrand = useTemplateRef<HTMLElement | null>('navbar-brand')

const linksWrapperMaxWidth = ref(0)
const linksWrapperStyle = computed(() => {
  if (!linksWrapperMaxWidth.value) {
    return {}
  }
  return {
    maxWidth: `${linksWrapperMaxWidth.value}px`,
  }
})

const getCssValue = (el: HTMLElement | null, property: string): number => {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const val = el?.ownerDocument.defaultView?.getComputedStyle(el, null)[
    property as keyof CSSStyleDeclaration
  ]

  const num = Number.parseInt(val as string, 10)

  return Number.isNaN(num) ? 0 : num
}

useUpdateDeviceStatus(
  DeviceType.Mobile,
  (mobileDesktopBreakpoint: number): void => {
    // avoid overlapping of long title and long navbar links
    const navbarHorizontalPadding =
      getCssValue(navbar.value, 'paddingLeft') +
      getCssValue(navbar.value, 'paddingRight')
    if (window.innerWidth < mobileDesktopBreakpoint) {
      linksWrapperMaxWidth.value = 0
    } else {
      linksWrapperMaxWidth.value =
        navbar.value!.offsetWidth -
        navbarHorizontalPadding -
        (navbarBrand.value?.offsetWidth ?? 0)
    }
  },
)
</script>

<template>
  <header ref="navbar" class="vp-navbar" vp-navbar>
    <span class="vp-navbar-blur">
      <span class="blur-layer"></span>
      <span class="blur-layer"></span>
      <span class="blur-layer"></span>
      <span class="blur-layer"></span>
      <span class="blur-layer"></span>
    </span>

    <VPToggleSidebarButton @toggle="$emit('toggleSidebar')" />

    <span ref="navbar-brand">
      <VPNavbarBrand />
    </span>

    <div class="vp-navbar-items-wrapper" :style="linksWrapperStyle">
      <slot name="before" />
      <VPNavbarItems class="vp-hide-mobile" />
      <slot name="after" />
      <VPToggleColorModeButton v-if="themeLocale.colorModeSwitch" />
      <SearchBox />
    </div>
  </header>
</template>

<style lang="scss">
@use '@vuepress/theme-default/lib/client/styles/variables' as *;

.vp-navbar {
  --navbar-line-height: calc(
    var(--navbar-height) - 2 * var(--navbar-padding-v)
  );

  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 20;

  box-sizing: border-box;
  height: var(--navbar-height);
  padding: var(--navbar-padding-v) var(--navbar-padding-h);
  border-bottom: none;

  background-color: transparent;

  line-height: var(--navbar-line-height);

  transition:
    background-color var(--vp-t-color),
    border-color var(--vp-t-color);

  @media screen and (max-width: $MQMobile) {
    padding-inline-start: 4rem;
  }
}

.vp-navbar-items-wrapper {
  position: absolute;
  inset-inline-end: var(--navbar-padding-h);
  top: var(--navbar-padding-v);

  display: flex;

  box-sizing: border-box;
  height: var(--navbar-line-height);
  padding-inline-start: var(--navbar-padding-h);

  font-size: 0.9rem;
  white-space: nowrap;
}

.blur-layer{
  position: absolute;
  inset:0;
}

.blur-layer:nth-child(1){
  backdrop-filter: blur(20px);
  mask: linear-gradient(0deg, transparent 80%, black 100%);
}

.blur-layer:nth-child(2){
  backdrop-filter: blur(10px);
  mask: linear-gradient(0deg, transparent 60%, black 80%);
}

.blur-layer:nth-child(3){
  backdrop-filter: blur(5px);
  mask: linear-gradient(0deg, transparent 40%, black 60%);
}

.blur-layer:nth-child(4){
  backdrop-filter: blur(3px);
  mask: linear-gradient(0deg, transparent 20%, black 40%);
}

.blur-layer:nth-child(5){
  backdrop-filter: blur(1px);
  mask: linear-gradient(0deg, transparent 0%, black 20%);
}
</style>