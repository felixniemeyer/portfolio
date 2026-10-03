<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import Hero from './components/Hero.vue'
import Works from './components/Works.vue'
import Music from './components/Music.vue'
import Mentionables from './components/Mentionables.vue'
import Philosophy from './components/Philosophy.vue'
import Contact from './components/Contact.vue'

const sections = ['works', 'music', 'mentionables', 'beliefs', 'contact']
const current = ref('')
const scrolled = ref(false)

let observer: IntersectionObserver | undefined
const onScroll = () => {
  scrolled.value = window.scrollY > 40
  if (window.scrollY < window.innerHeight / 2) current.value = ''
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) if (entry.isIntersecting) current.value = entry.target.id
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )
  for (const id of sections) observer.observe(document.getElementById(id)!)
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <nav :class="{ scrolled }">
    <a href="#" class="mark" aria-label="top">fn<span>.</span></a>
    <div class="links">
      <a v-for="id in sections" :key="id" :href="`#${id}`" class="mono" :class="{ on: current === id }">{{ id }}</a>
    </div>
  </nav>
  <Hero />
  <main>
    <Works />
    <Music />
    <Mentionables />
    <Philosophy />
    <Contact />
  </main>
</template>

<style scoped>
nav {
  position: fixed;
  inset: 0 0 auto;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px var(--gutter);
  transition:
    background 0.4s,
    padding 0.4s var(--ease);

  &.scrolled {
    padding-block: 12px;
    background: rgba(5, 5, 10, 0.75);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--line);
  }

  & .mark {
    font-size: var(--fs-l);
    font-style: italic;
    text-decoration: none;
    line-height: 1;
    & span {
      color: var(--pink);
    }
  }

  & .links {
    display: flex;
    gap: clamp(12px, 3vw, 32px);
    overflow-x: auto;
    scrollbar-width: none;

    & a {
      text-decoration: none;
      position: relative;
      padding: 4px 0;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 1px;
        background: var(--cyan);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.4s var(--ease);
      }
      &.on {
        color: var(--fg);
        &::after {
          transform: scaleX(1);
        }
      }
    }
  }

  @media (max-width: 520px) {
    & .links a:nth-child(3) {
      display: none;
    }
  }
}
</style>
