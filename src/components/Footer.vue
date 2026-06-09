<template>
  <footer class="md-footer">
    <div class="footer-container">
      <div class="footer-meta">
        <p class="copyright">Copyright © {{ currentYear }} Vilinko. All rights reserved.</p>
        <div class="footer-links">
          <a href="https://github.com/VilinkoStudio/Synap" target="_blank" class="footer-link">GitHub</a>
          <a href="https://docs.vilinko.com/agreement/privacy.html" target="_blank" class="footer-link">隐私政策</a>
          <a href="https://docs.vilinko.com/agreement/tos.html" target="_blank" class="footer-link">服务条款</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';

const currentYear = computed(() => {
  try {
    return new Date().getFullYear();
  } catch (e) {
    return 2026;
  }
});
</script>

<style scoped>
.md-footer {
  width: 100%;
  background-color: transparent;
  border-top: 1px solid var(--md-sys-color-outline-variant, rgba(255, 255, 255, 0.06));
  padding: 2rem 1.5rem;
  margin-top: auto;
  position: relative;
  z-index: 10;
}

.footer-container {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-meta {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.75rem;
}

.copyright {
  margin: 0;
  font-size: 0.85rem;
  color: var(--md-sys-color-on-surface-variant, #c4c6d0);
  opacity: 0.7;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.footer-link {
  font-size: 0.85rem;
  color: var(--md-sys-color-on-surface-variant, #c4c6d0);
  text-decoration: none;
  transition: color 0.2s cubic-bezier(0.2, 0, 0, 1);
  position: relative;
}

.footer-link:hover {
  color: var(--md-sys-color-primary, #adc6ff);
}

@media (max-width: 600px) {
  .footer-meta {
    gap: 1rem;
  }
  
  .footer-links {
    gap: 1.75rem;
  }
}
</style>