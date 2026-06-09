<template>
  <div class="app-layout">
    <main class="app-content">
      <RouterView />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Footer from './components/Footer.vue'
</script>

<style>
@font-face {
  font-family: 'MiSans';
  src: url('/MiSans-Semibold.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

:root {
  --md-primary: #5279FB;
  --md-on-primary: #FFFFFF;
  --md-primary-container: #E0E4FF;
  --md-on-primary-container: #001453;
  --md-surface: #F9F9FC;
  --md-on-surface: #1A1C1E;
  --md-surface-variant: #E1E2EC;
  --md-on-surface-variant: #44464F;
  --md-outline: #757780;
  --md-grid-color: rgba(0, 0, 0, 0.02);

  /* 【新增】Material You 语义映射：浅色模式 */
  --md-sys-color-background: var(--md-surface);
  --md-sys-color-on-background: var(--md-on-surface);
  --md-sys-color-surface-container: #F0F0F3;
  --md-sys-color-surface-container-low: #F4F3F7;
  --md-sys-color-surface-container-high: #EAE9ED;
  --md-sys-color-surface-container-highest: #E2E2E6;
  --md-sys-color-on-surface: var(--md-on-surface);
  --md-sys-color-on-surface-variant: var(--md-on-surface-variant);
  --md-sys-color-outline-variant: #C1C2CC;
  --md-sys-color-primary: var(--md-primary);
  --md-sys-color-on-primary: var(--md-on-primary);
  --md-sys-color-secondary-container: var(--md-primary-container);
  --md-sys-color-on-secondary-container: var(--md-on-primary-container);
  --md-sys-color-error: #BA1A1A;
}

@media (prefers-color-scheme: dark) {
  :root {
    --md-primary: #C9D7FF;
    --md-on-primary: #00287D;
    --md-primary-container: #355CC2;
    --md-on-primary-container: #E0E4FF;
    --md-surface: #111318;
    --md-on-surface: #E2E2E6;
    --md-surface-variant: #44464F;
    --md-on-surface-variant: #C5C6D0;
    --md-outline: #8E9099;
    --md-grid-color: rgba(255, 255, 255, 0.02);

    /* 【新增】Material You 语义映射：深色模式 */
    --md-sys-color-background: var(--md-surface);
    --md-sys-color-on-background: var(--md-on-surface);
    --md-sys-color-surface-container: #1A1C22;
    --md-sys-color-surface-container-low: #111318;
    --md-sys-color-surface-container-high: #24262B;
    --md-sys-color-surface-container-highest: #2F3136;
    --md-sys-color-on-surface: var(--md-on-surface);
    --md-sys-color-on-surface-variant: var(--md-on-surface-variant);
    --md-sys-color-outline-variant: var(--md-surface-variant);
    --md-sys-color-primary: var(--md-primary);
    --md-sys-color-on-primary: var(--md-on-primary);
    --md-sys-color-secondary-container: rgba(82, 121, 251, 0.15);
    --md-sys-color-on-secondary-container: var(--md-primary);
    --md-sys-color-error: #FFB4AB;
  }
}

html, body, #app {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  background-color: var(--md-surface);
}

/* 【修改】改造 #app 为全局纵向 flex 容器，确保布局向下延伸 */
#app {
  display: flex;
  flex-direction: column;
}

/* 【新增】整体骨架流 */
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

/* 【新增】主内容区自动填满剩余空间，把页脚推到底部 */
.app-content {
  flex: 1 0 auto;
  width: 100%;
  position: relative;
}

* {
  box-sizing: border-box;
}

body {
  font-family: 'MiSans', system-ui, -apple-system, sans-serif;
  color: var(--md-on-surface);
  transition: background-color 0.3s ease, color 0.3s ease;
  overflow-x: hidden; /* 防止移动端左右晃动 */
}
</style>