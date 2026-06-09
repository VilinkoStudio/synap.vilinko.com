<template>
  <RouterView />
</template>

<script setup>
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
  }
}

html, body, #app {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  overflow: hidden;
  background-color: var(--md-surface);
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
}

* {
  box-sizing: border-box;
}

body {
  font-family: 'MiSans', system-ui, -apple-system, sans-serif;
  color: var(--md-on-surface);
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>