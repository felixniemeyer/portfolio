<script setup lang="ts">
import { next } from '../data'
</script>

<template>
  <section id="next" class="panel">
    <div class="inner">
      <div class="head" v-reveal>
        <p class="mono">02 — next</p>
        <h2>Rooms where sound, image and code <em>meet</em>.</h2>
        <p>
          I’m rarely at home, so the places I work in matter. The best ones are full of other people’s work —
          musicians, sound and media artists, people who build things. Right now I’m looking for a studio in Vienna.
          This is what I’d do with one.
        </p>
        <p class="mono status"><span></span>looking for a studio · Vienna</p>
      </div>

      <ol class="plans">
        <li v-for="(item, i) in next" :key="item.title" v-reveal="i">
          <span class="mono">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.head p {
  color: color-mix(in srgb, var(--fg) 78%, transparent);
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  justify-self: start;
  border: 1px solid var(--line);
  border-radius: 99px;
  padding: 6px 14px;
  margin-top: 8px;

  & span {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #7dffb0;
    box-shadow: 0 0 10px #7dffb0;
    animation: pulse 2.4s ease-in-out infinite;
  }
}

.plans {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
  gap: 20px;

  & li {
    display: grid;
    align-content: start;
    gap: 10px;
    padding: 22px 20px 26px;
    border: 1px solid var(--line);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.02);
    transition:
      border-color 0.4s,
      opacity 0.9s var(--ease),
      transform 0.9s var(--ease);

    &:hover {
      border-color: color-mix(in srgb, var(--amber) 50%, transparent);
    }
  }

  & p {
    color: color-mix(in srgb, var(--fg) 75%, transparent);
  }
}

@keyframes pulse {
  50% {
    opacity: 0.35;
  }
}

@media (prefers-reduced-motion: reduce) {
  .status span {
    animation: none;
  }
}
</style>
