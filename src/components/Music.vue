<script setup lang="ts">
import { music } from '../data'
</script>

<template>
  <section id="music" class="panel">
    <div class="inner">
      <div class="head" v-reveal>
        <p class="mono">02 — music</p>
        <h2>I love music — mostly <em>with others</em>.</h2>
      </div>

      <div class="layout">
        <article class="jam" v-reveal>
          <p class="mono">community music</p>
          <h3>{{ music.jam.title }}</h3>
          <p>{{ music.jam.text }}</p>
        </article>

        <div class="side">
          <div v-reveal="1">
            <p class="mono label">listen</p>
            <ul>
              <li v-for="t in music.tracks" :key="t.title">
                <a :href="t.link" target="_blank" rel="noopener">{{ t.title }}<span aria-hidden="true">↗</span></a>
                <span>{{ t.text }}</span>
              </li>
            </ul>
          </div>
          <div v-reveal="2">
            <p class="mono label">instruments I built</p>
            <ul>
              <li v-for="t in music.built" :key="t.title">
                <a :href="t.link" target="_blank" rel="noopener">{{ t.title }}<span aria-hidden="true">↗</span></a>
                <span>{{ t.text }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(32px, 6vw, 80px);
  align-items: start;

  @media (max-width: 800px) {
    grid-template-columns: minmax(0, 1fr);
  }
}

.jam {
  display: grid;
  gap: 14px;
  padding: clamp(24px, 4vw, 40px);
  border: 1px solid var(--line);
  border-radius: 14px;
  background:
    radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--pink) 16%, transparent), transparent 60%),
    rgba(255, 255, 255, 0.02);

  & h3 {
    font-size: var(--fs-l);
    font-weight: 400;
    line-height: 1.15;
  }
  & p:last-child {
    color: color-mix(in srgb, var(--fg) 78%, transparent);
  }
}

.side {
  display: grid;
  gap: 40px;

  & .label {
    margin-bottom: 8px;
  }

  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  & li {
    display: grid;
    gap: 2px;
    padding: 12px 0;
    border-bottom: 1px solid var(--line);

    & a {
      text-decoration: none;
      &:hover {
        color: var(--pink);
      }
      & span {
        font-size: var(--fs-s);
        margin-left: 6px;
        color: var(--muted);
      }
    }
    & > span {
      color: var(--muted);
      font-style: italic;
    }
  }
}
</style>
