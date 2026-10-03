import { createApp, type Directive } from 'vue'
import './style.css'
import App from './App.vue'

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('shown')
        observer.unobserve(entry.target)
      }
    }
  },
  { rootMargin: '0px 0px -8% 0px' },
)

// v-reveal or v-reveal="index" to stagger siblings
const reveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    el.dataset.reveal = ''
    if (binding.value) el.style.setProperty('--delay', `${Math.min(binding.value, 8) * 0.06}s`)
    observer.observe(el)
  },
  unmounted(el) {
    observer.unobserve(el)
  },
}

createApp(App).directive('reveal', reveal).mount('#app')
