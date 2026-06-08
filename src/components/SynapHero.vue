<template>
  <div class="hero-container">
    <div class="grid-overlay"></div>

    <div class="content-box">
      <h1 class="title">Synap</h1>
      <p class="subtitle">捕捉灵感 快如闪电</p>
      
      <div class="hero-buttons">
        <router-link to="/download" class="md-btn md-btn-filled">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          立即下载
        </router-link>
        
        <a href="https://docs.vilinko.com/docs/synap/" class="md-btn md-btn-tonal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          文档
        </a>
        
        <a href="https://github.com/VilinkoStudio/Synap" target="_blank" class="md-btn md-btn-outlined">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          项目地址
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.hero-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.content-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 10;
  padding: 2rem;
  margin-top: -8vh;
}

.title {
  font-size: 8rem;
  font-weight: 700;
  line-height: 1.2;
  padding-bottom: 0.2em;
  margin-bottom: -0.2em;
  background: linear-gradient(135deg, var(--md-primary), #5279FB, #9AB1FA);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 8s ease infinite, scaleUpIn 0.6s cubic-bezier(0.2, 0, 0, 1);
}

.subtitle {
  color: var(--md-on-surface-variant);
  font-size: 1.3rem;
  letter-spacing: 0.8em;
  text-indent: 0.8em;
  margin-top: 1.5rem;
  margin-bottom: 4rem;
  opacity: 0.85;
  animation: fadeIn 0.8s ease-out 0.15s both;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
  animation: fadeIn 0.8s ease-out 0.3s both;
}

.md-btn {
  font-family: 'MiSans', sans-serif;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.8rem 2.2rem;
  border-radius: 100px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.2s cubic-bezier(0.2, 0, 0, 1), background-color 0.2s cubic-bezier(0.2, 0, 0, 1);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.md-btn::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: currentColor;
  opacity: 0;
  transition: opacity 0.15s linear;
}

.md-btn:hover::before {
  opacity: 0.08;
}

.md-btn:active::before {
  opacity: 0.12;
}

.md-btn-filled {
  background-color: var(--md-primary);
  color: var(--md-on-primary);
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.md-btn-filled:hover {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
.md-btn-filled:active {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}

.md-btn-tonal {
  background-color: var(--md-primary-container);
  color: var(--md-on-primary-container);
  border: none;
  box-shadow: 0 0 0 transparent;
}
.md-btn-tonal:hover {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.md-btn-outlined {
  background-color: transparent;
  color: var(--md-primary);
  border: 1px solid var(--md-outline);
}
.md-btn-outlined:hover {
  border-color: var(--md-primary);
}

.grid-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background-image: 
    linear-gradient(var(--md-grid-color) 1px, transparent 1px),
    linear-gradient(90deg, var(--md-grid-color) 1px, transparent 1px);
  background-size: 80px 80px;
  background-position: center;
  opacity: 0.7;
  pointer-events: none;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
@keyframes scaleUpIn {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .title { font-size: 4.5rem; }
  .subtitle { font-size: 1rem; letter-spacing: 0.4em; text-indent: 0.4em; }
  .hero-buttons { flex-direction: column; width: 100%; max-width: 280px; }
  .md-btn { width: 100%; justify-content: center; }
}
</style>