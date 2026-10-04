<script setup lang="ts">
import { works } from '../data'
</script>

<template>
  <section id="works" class="panel">
    <div class="inner">
      <div class="head" v-reveal>
        <p class="mono">01 — works</p>
        <h2>Things that run in a browser tab, <em>under domes</em>, on stages and in repos.</h2>
      </div>
      <div class="grid">
        <article
          v-for="(work, i) in works"
          :key="work.title"
          v-reveal="i % 3"
          class="card"
          :class="{ wide: work.wide }"
          :style="{ '--hue': work.hue }"
        >
          <div class="media" :class="{ contain: work.contain, pair: work.images }">
            <img v-for="src in work.images" :key="src" :src="src" :alt="work.title" loading="lazy" decoding="async" />
            <img
              v-if="work.youtube || work.image"
              :src="work.youtube ? `https://i.ytimg.com/vi/${work.youtube}/hqdefault.jpg` : work.image"
              :alt="work.title"
              loading="lazy"
              decoding="async"
            />
            <div v-else-if="!work.images" class="rings"></div>
            <span v-if="work.youtube" class="play" aria-hidden="true"></span>
          </div>
          <div class="body">
            <p class="mono">{{ work.kind }}</p>
            <h3>
              <a class="primary" :href="work.link" target="_blank" rel="noopener">{{ work.title }}</a>
            </h3>
            <p class="text">{{ work.text }}</p>
            <a v-if="work.code" class="mono code" :href="work.code" target="_blank" rel="noopener">code ↗</a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  grid-auto-flow: dense;
  gap: 20px;
}

.card {
  --tint: hsl(var(--hue) 100% 70%);
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  border: 1px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.02);
  transition:
    transform 0.5s var(--ease),
    border-color 0.4s,
    box-shadow 0.5s,
    opacity 0.9s var(--ease);

  &.wide {
    grid-column: span 2;
    @media (max-width: 680px) {
      grid-column: auto;
    }
  }

  &:hover {
    color: inherit;
    transform: translateY(-4px);
    border-color: color-mix(in srgb, var(--tint) 50%, transparent);
    box-shadow: 0 20px 60px -20px color-mix(in srgb, var(--tint) 40%, transparent);

    & img,
    & .rings {
      transform: scale(1.05);
    }
    & h3 {
      color: var(--tint);
    }
  }

  & .media {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: hsl(var(--hue) 40% 8%);

    & img,
    & .rings {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.8s var(--ease);
    }

    &.pair {
      display: flex;
      aspect-ratio: 9 / 8;
      & img {
        width: 50%;
      }
    }

    &.contain {
      background: #000;
      & img {
        object-fit: contain;
      }
    }

    & .rings {
      background:
        radial-gradient(circle at 70% 40%, color-mix(in srgb, var(--tint) 35%, transparent), transparent 55%),
        repeating-radial-gradient(
          circle at 70% 40%,
          transparent 0 14px,
          color-mix(in srgb, var(--tint) 22%, transparent) 15px 16px
        );
    }

    & .play {
      position: absolute;
      left: 16px;
      bottom: 16px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(5, 5, 10, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.25);
      &::after {
        content: '';
        position: absolute;
        left: 15px;
        top: 12px;
        border: 8px solid transparent;
        border-left: 12px solid var(--fg);
        border-right: 0;
      }
    }
  }

  & .body {
    display: grid;
    gap: 6px;
    padding: 18px 20px 22px;
  }

  & h3 {
    transition: color 0.3s;
  }

  /* the title link covers the whole card; secondary links sit above it */
  & .primary {
    text-decoration: none;
    &,
    &:hover {
      color: inherit;
    }
    &::after {
      content: '';
      position: absolute;
      inset: 0;
    }
  }

  & .code {
    position: relative;
    justify-self: start;
    margin-top: 4px;
    text-decoration: none;
    &:hover {
      color: var(--tint);
    }
  }

  & .text {
    color: color-mix(in srgb, var(--fg) 75%, transparent);
  }
}
</style>
