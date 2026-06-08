<template>
  <div class="download-page-container">
    <div class="grid-overlay"></div>
    
    <div class="container">
      <div class="fixed-header-section">
        <div class="hero">
          <h1>下载 Synap</h1>
          <p>选择您的平台，开始使用 Synap 笔记应用</p>
        </div>

        <div class="quick-downloads-dropdown">
          <div class="dropdown-wrapper">
            <button class="md-dropdown-btn" @click="toggleDropdown">
              <span class="dropdown-btn-icon">📥</span>
              <span class="dropdown-btn-text">选择平台下载 Synap</span>
              <span class="dropdown-arrow-icon" :class="{ 'is-open': isDropdownOpen }">▼</span>
            </button>
            
            <transition name="menu-fade">
              <ul v-if="isDropdownOpen" class="md-dropdown-menu">
                <li v-for="release in quickDownloads" :key="release.platform">
                  <a 
                    :href="release.download_src" 
                    target="_blank" 
                    class="dropdown-item"
                    @click="isDropdownOpen = false"
                  >
                    <span class="item-icon">{{ platformIcons[release.platform] }}</span>
                    <div class="item-content">
                      <span class="item-title">{{ platformNames[release.platform] }}</span>
                      <span class="item-subtitle">{{ release.version }}</span>
                    </div>
                  </a>
                </li>
              </ul>
            </transition>
          </div>
        </div>

        <h2 class="section-title">更新记录</h2>
        
        <div class="platform-tabs">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            class="platform-tab" 
            :class="{ active: currentPlatform === tab.id }"
            @click="currentPlatform = tab.id"
          >
            {{ tab.name }}
          </button>
        </div>
      </div>

      <div class="releases-scroll-viewport">
        <div class="releases-list">
          <div v-if="loading" class="loading">加载中...</div>
          
          <div v-else-if="error" class="error">{{ error }}</div>
          
          <div 
            v-else
            v-for="(release, index) in filteredReleases" 
            :key="index"
            class="release-card" 
            :style="{ animationDelay: `${index * 0.05}s` }"
          >
            <div class="release-header">
              <div class="release-info">
                <div class="release-version">
                  {{ release.version }}
                  <span class="release-badge badge-pre-release">Pre-release</span>
                  <span class="release-badge" :class="`badge-${release.platform}`">
                    {{ platformNames[release.platform] }}
                  </span>
                </div>
                <div class="release-date">{{ release.date }}</div>
              </div>
            </div>
            
            <ul class="release-changes">
              <li v-for="(change, cIndex) in release.changes" :key="cIndex">
                {{ change }}
              </li>
            </ul>
            
            <div class="release-footer">
              <div class="release-contributors">
                <span class="contributors-label">贡献者：</span>
                <a 
                  v-for="c in release.contributors" 
                  :key="c"
                  :href="`https://github.com/${c}`" 
                  target="_blank" 
                  :title="c" 
                  class="contributor-info"
                >
                  <img 
                    class="contributor-avatar" 
                    :src="avatarMap[c] || `https://github.com/identicons/${c}.png`" 
                    :alt="c"
                  >
                  <span class="contributor-name">{{ c }}</span>
                </a>
              </div>
              <div class="release-actions">
                <a :href="release.download_src" target="_blank" class="md-btn btn-download">
                  {{ release.download_platform }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const avatarMap = {
  "yyckn": "https://avatars.githubusercontent.com/u/189811683?s=64&v=4",
  "Fuwaki": "https://avatars.githubusercontent.com/u/52279718?s=64&v=4",
  "KitraMGP": "https://avatars.githubusercontent.com/u/44922707?s=64&v=4"
}

const platformNames = {
  "android": "Android",
  "windows": "Windows",
  "linux": "Linux"
}

const platformIcons = {
  "android": "🤖",
  "windows": "🪟",
  "linux": "🐧"
}

const tabs = [
  { id: 'all', name: '全部' },
  { id: 'android', name: 'Android' },
  { id: 'windows', name: 'Windows' },
  { id: 'linux', name: 'Linux' }
]

const releasesData = ref(null)
const currentPlatform = ref('all')
const loading = ref(true)
const error = ref(null)

const isDropdownOpen = ref(false)
const toggleDropdown = (e) => {
  e.stopPropagation()
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}

onMounted(async () => {
  window.addEventListener('click', closeDropdown)
  try {
    const response = await fetch('/releases.json')
    if (!response.ok) throw new Error('数据文件加载失败')
    releasesData.value = await response.json()
  } catch (err) {
    error.value = `加载失败: ${err.message}`
  } finally {
    loading.value = false
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('click', closeDropdown)
})

const quickDownloads = computed(() => {
  if (!releasesData.value || !releasesData.value.releases) return []
  const latestByPlatform = {}
  releasesData.value.releases.forEach(release => {
    if (!latestByPlatform[release.platform]) {
      latestByPlatform[release.platform] = release
    }
  })
  return Object.values(latestByPlatform)
})

const filteredReleases = computed(() => {
  if (!releasesData.value || !releasesData.value.releases) return []
  if (currentPlatform.value === 'all') {
    return releasesData.value.releases
  }
  return releasesData.value.releases.filter(r => r.platform === currentPlatform.value)
})
</script>

<style scoped>
.download-page-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 900px;
  height: 100%;
  margin: 0 auto;
  padding: 3rem 2rem 2rem;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
}

.fixed-header-section {
  flex-shrink: 0;
}

.releases-scroll-viewport {
  flex: 1;
  overflow-y: auto;
  padding-right: 6px;
  margin-top: 0.5rem;
  scrollbar-width: thin;
  scrollbar-color: var(--md-surface-variant) transparent;
}

.releases-scroll-viewport::-webkit-scrollbar { width: 6px; }
.releases-scroll-viewport::-webkit-scrollbar-track { background: transparent; }
.releases-scroll-viewport::-webkit-scrollbar-thumb {
  background-color: var(--md-surface-variant);
  border-radius: 100px;
}

.releases-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-bottom: 4rem;
}

.hero {
  text-align: center;
  margin-bottom: 2rem;
  animation: scaleUpIn 0.6s cubic-bezier(0.2, 0, 0, 1);
}

.hero h1 {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  padding-bottom: 0.1em;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--md-primary), #5279FB, #9AB1FA);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 8s ease infinite;
}

.hero p {
  color: var(--md-on-surface-variant);
  font-size: 1.1rem;
  opacity: 0.85;
}

.quick-downloads-dropdown {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  animation: fadeIn 0.8s ease-out 0.15s both;
  position: relative;
  z-index: 100;
}

.dropdown-wrapper {
  position: relative;
  width: 280px;
}

.md-dropdown-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 1.5rem;
  background-color: var(--md-primary);
  color: var(--md-on-primary);
  border: none;
  border-radius: 16px;
  font-family: 'MiSans', sans-serif;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.08);
  transition: box-shadow 0.2s, background-color 0.2s;
}

.md-dropdown-btn:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.dropdown-btn-text {
  flex: 1;
  text-align: left;
}

.dropdown-arrow-icon {
  font-size: 0.65rem;
  transition: transform 0.3s cubic-bezier(0.2, 0, 0, 1);
  opacity: 0.8;
}

.dropdown-arrow-icon.is-open {
  transform: rotate(180deg);
}

.md-dropdown-menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 100%;
  background-color: var(--md-surface-container-high, #2b2b2b);
  border-radius: 16px;
  padding: 0.5rem 0;
  margin: 0;
  list-style: none;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3), 0 0 1px rgba(255, 255, 255, 0.1);
  overflow: hidden;
  z-index: 110;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1.25rem;
  text-decoration: none;
  color: var(--md-on-surface);
  position: relative;
  transition: background-color 0.15s;
}

.dropdown-item:hover {
  background-color: var(--md-surface-variant);
}

.item-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--md-surface-container-highest);
  border-radius: 10px;
  font-size: 1.1rem;
}

.item-content {
  display: flex;
  flex-direction: column;
}

.item-title {
  font-size: 0.95rem;
  font-weight: 500;
}

.item-subtitle {
  font-size: 0.75rem;
  color: var(--md-on-surface-variant);
  opacity: 0.7;
}

.menu-fade-enter-active {
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
}
.menu-fade-leave-active {
  transition: all 0.15s cubic-bezier(0.4, 0, 1, 1);
}
.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}

.md-dropdown-btn::before,
.dropdown-item::before,
.platform-tab::before,
.release-card::before,
.md-btn::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: currentColor;
  opacity: 0;
  transition: opacity 0.15s linear;
  pointer-events: none;
}
.md-dropdown-btn:hover::before, .dropdown-item:hover::before, .platform-tab:hover::before, .release-card:hover::before, .md-btn:hover::before { opacity: 0.06; }
.md-dropdown-btn:active::before, .platform-tab:active::before, .md-btn:active::before { opacity: 0.12; }

.section-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  color: var(--md-on-surface);
  animation: fadeIn 0.8s ease-out 0.2s both;
}

.platform-tabs {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  animation: fadeIn 0.8s ease-out 0.25s both;
}

.platform-tab {
  font-family: 'MiSans', sans-serif;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.6rem 1.6rem;
  background-color: transparent;
  border: 1px solid var(--md-outline);
  border-radius: 100px;
  color: var(--md-on-surface-variant);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
}

.platform-tab.active {
  background-color: var(--md-primary-container);
  color: var(--md-on-primary-container);
  border-color: transparent;
}

.release-card {
  background-color: var(--md-surface-container);
  border-radius: 24px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  animation: fadeIn 0.8s cubic-bezier(0.2, 0, 0, 1) both;
}

.release-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.release-version {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--md-on-surface);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.release-badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
  font-weight: 500;
}

.badge-pre-release { background: rgba(255, 183, 0, 0.15); color: #ffb700; }
.badge-android { background: rgba(61, 220, 132, 0.15); color: #3ddc84; }
.badge-windows { background: rgba(0, 120, 212, 0.15); color: #0078d4; }
.badge-linux { background: rgba(255, 165, 0, 0.15); color: #ffa500; }

.release-date {
  color: var(--md-on-surface-variant);
  font-size: 0.9rem;
  opacity: 0.7;
}

.release-changes {
  list-style: none;
  margin-bottom: 1.5rem;
}

.release-changes li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  color: var(--md-on-surface);
  opacity: 0.9;
  line-height: 1.6;
}

.release-changes li::before {
  content: '';
  position: absolute;
  left: 0.2rem;
  top: 0.65rem;
  width: 6px;
  height: 6px;
  background-color: var(--md-primary);
  border-radius: 50%;
}

.release-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--md-surface-variant);
}

.release-contributors {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.contributors-label {
  color: var(--md-on-surface-variant);
  font-size: 0.85rem;
  opacity: 0.8;
}

.contributor-info {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
}

.contributor-avatar {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1px solid var(--md-surface-variant);
}

.contributor-name {
  font-size: 0.85rem;
  color: var(--md-on-surface-variant);
}

.contributor-info:hover .contributor-name {
  color: var(--md-primary);
}

.md-btn {
  font-family: 'MiSans', sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  padding: 0.65rem 1.8rem;
  border-radius: 100px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  border: none;
  cursor: pointer;
  transition: box-shadow 0.2s ease, background-color 0.2s ease;
}

.btn-download {
  background-color: var(--md-primary);
  color: var(--md-on-primary);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.btn-download:hover { box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15); }
.btn-download:active { box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); }

.loading, .error {
  text-align: center;
  padding: 4rem;
  color: var(--md-on-surface-variant);
  opacity: 0.7;
}
.error { color: #ff006e; opacity: 1; }

.grid-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background-image: 
    linear-gradient(var(--md-grid-color) 1px, transparent 1px),
    linear-gradient(90deg, var(--md-grid-color) 1px, transparent 1px);
  background-size: 80px 80px;
  pointer-events: none;
  z-index: 0;
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
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .container { padding-top: 1.5rem; }
  .hero h1 { font-size: 2.5rem; }
  .hero { margin-bottom: 1.5rem; }
  .quick-downloads-dropdown { margin-bottom: 2rem; width: 100%; }
  .dropdown-wrapper { width: 100%; }
  .release-header { flex-direction: column; }
  .release-footer { flex-direction: column; align-items: flex-start; gap: 1.2rem; }
  .release-actions { width: 100%; }
  .btn-download { width: 100%; justify-content: center; }
}
</style>