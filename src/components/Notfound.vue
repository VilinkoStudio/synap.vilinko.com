<template>
  <div class="error-container">
    <div class="grid-overlay"></div>

    <div class="content-box">
      <h1 class="error-code">404</h1>
      
      <h2 class="error-title">迷路了，灵感断线</h2>
      <p class="error-subtitle">抱歉，你访问的页面不存在。</p>
      
      <div class="error-actions">
        <a href="/" class="md-btn md-btn-filled">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          返回首页
        </a>
        
        <button @click="goBack" class="md-btn md-btn-tonal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="12 8 8 12 12 16"/>
            <path d="M16 12H8"/>
          </svg>
          返回上一页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const goBack = () => {
  if (window.history.length > 1) {
    window.history.back()
  } else {
    window.location.href = '/'
  }
}
</script>

<style scoped>
.error-container {
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
  max-width: 600px;
  margin-top: -8vh;
}

.error-code {
  font-size: 10rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
  padding-bottom: 0.15em;
  margin-bottom: -0.1em;
  background: linear-gradient(135deg, var(--md-primary), #5279FB, #9AB1FA);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 8s ease infinite, scaleUpIn 0.5s cubic-bezier(0.2, 0, 0, 1);
}

.error-title {
  font-size: 2rem;
  font-weight: 600;
  color: var(--md-on-surface);
  margin-top: 1rem;
  margin-bottom: 1rem;
  animation: fadeIn 0.8s ease-out 0.1s both;
}

.error-subtitle {
  color: var(--md-on-surface-variant);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 4rem;
  opacity: 0.8;
  animation: fadeIn 0.8s ease-out 0.2s both;
}

.error-actions {
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
  border: none;
  background: transparent;
  color: inherit;
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

.md-btn:hover::before { opacity: 0.08; }
.md-btn:active::before { opacity: 0.12; }

.md-btn-filled {
  background-color: var(--md-primary);
  color: var(--md-on-primary);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.md-btn-filled:hover { box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2); }
.md-btn-filled:active { box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15); }

.md-btn-tonal {
  background-color: var(--md-primary-container);
  color: var(--md-on-primary-container);
}
.md-btn-tonal:hover { box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }

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
  .error-code { font-size: 6.5rem; }
  .error-title { font-size: 1.6rem; }
  .error-actions { flex-direction: column; width: 100%; max-width: 280px; }
  .md-btn { width: 100%; justify-content: center; }
}
</style>