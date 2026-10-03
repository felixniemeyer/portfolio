<script setup lang="ts">
import { computed, ref } from 'vue'

const beliefs = [
  { line: 'Nothing is more interesting than the truth.', note: 'I wrote this down years ago and I still like it.' },
  {
    line: 'Poke reality.',
    note: 'Realize ideas and see what happens — the most beautiful, least probable ones too. When I miss, I spend three days understanding why and do better next time.',
  },
  {
    line: 'Speed matters more than time.',
    note: 'Deadlines are chances to make the current state presentable, not the measure of its value.',
  },
  { line: 'Never work without knowing why.', note: 'Why, on what, and what for — all three, exactly.' },
  {
    line: 'Techno-optimism, unapologetically.',
    note: 'In my art master’s I was pretty much the only one excited about where technology is heading, so I left and made the art on my own. Tools — and now AI — let people realize ideas far bigger than themselves.',
  },
]

const born = new Date(1993, 6, 13)
const age = Math.floor((Date.now() - born.getTime()) / (365.25 * 24 * 3600 * 1000))
const span = 90

const phases = [
  { name: 'take', from: 0, to: 30, text: 'Learn, travel, absorb. Collect tools, places and people.' },
  { name: 'make', from: 30, to: 60, text: 'Build. Start projects, move matter, inspire people.' },
  { name: 'give', from: 60, to: span, text: 'Hand it on. Find the people to carry things further.' },
]
const selectedName = ref((phases.find((p) => age >= p.from && age < p.to) ?? phases[2]!).name)
const selected = computed(() => phases.find((p) => p.name === selectedName.value)!)
</script>

<template>
  <section id="beliefs" class="panel">
    <div class="inner">
      <div class="head" v-reveal>
        <p class="mono">04 — beliefs</p>
        <h2>Some things I hold <em>to be useful</em>, if not true.</h2>
      </div>

      <ol class="beliefs">
        <li v-for="(b, i) in beliefs" :key="b.line" v-reveal="i % 2">
          <span class="mono">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3>{{ b.line }}</h3>
          <p>{{ b.note }}</p>
        </li>
      </ol>

      <div class="life" v-reveal>
        <h3>Take, make, give.</h3>
        <p class="mono">a rough structure for a life — tap a phase</p>
        <div class="bar">
          <button
            v-for="p in phases"
            :key="p.name"
            :class="[p.name, { on: selectedName === p.name }]"
            :style="{ flexGrow: p.to - p.from }"
            @click="selectedName = p.name"
          >
            <span class="mono">{{ p.name }}</span>
          </button>
          <span class="marker" :style="{ left: `${(age / span) * 100}%` }">
            <span class="mono">me, {{ age }}</span>
          </span>
        </div>
        <Transition name="fade" mode="out-in">
          <p :key="selected.name" class="phase-text">
            <strong>{{ selected.from }}–{{ selected.to === span ? '∞' : selected.to }}:</strong> {{ selected.text }}
          </p>
        </Transition>
      </div>

      <blockquote v-reveal>
        A life is a drop in a pond. Projects started, people met, matter moved — the ripples go on long after the
        drop is gone.
      </blockquote>
    </div>
  </section>
</template>

<style scoped>
.beliefs {
  list-style: none;
  padding: 0;
  margin: 0 0 clamp(64px, 10vw, 120px);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 420px), 1fr));
  gap: 48px 64px;

  & li {
    display: grid;
    gap: 8px;
    padding-top: 20px;
    border-top: 1px solid var(--line);
  }
  & h3 {
    font-size: var(--fs-l);
    font-weight: 400;
    line-height: 1.15;
  }
  & p {
    color: color-mix(in srgb, var(--fg) 72%, transparent);
    max-width: 46ch;
  }
}

.life {
  display: grid;
  gap: 10px;
  max-width: 760px;
  margin-bottom: clamp(64px, 10vw, 120px);

  & h3 {
    font-size: var(--fs-l);
    font-weight: 400;
  }

  & .bar {
    position: relative;
    display: flex;
    gap: 4px;
    margin: 40px 0 8px;
    height: 44px;

    & button {
      cursor: pointer;
      border: 1px solid var(--c);
      border-radius: 8px;
      background: color-mix(in srgb, var(--c) 10%, transparent);
      color: var(--fg);
      padding: 0 12px;
      transition: background 0.4s;
      &.take {
        --c: var(--cyan);
      }
      &.make {
        --c: var(--pink);
      }
      &.give {
        --c: var(--amber);
      }
      &.on,
      &:hover {
        background: color-mix(in srgb, var(--c) 35%, transparent);
      }
      & .mono {
        color: inherit;
      }
    }

    & .marker {
      position: absolute;
      top: -10px;
      bottom: -10px;
      width: 2px;
      background: var(--fg);
      box-shadow: 0 0 14px var(--fg);
      pointer-events: none;
      & .mono {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
        color: var(--fg);
        padding-bottom: 4px;
      }
    }
  }

  & .phase-text {
    min-height: 3.2em;
  }
}

blockquote {
  margin: 0;
  max-width: 28ch;
  font-size: var(--fs-l);
  font-style: italic;
  font-weight: 300;
  line-height: 1.25;
  padding-left: 24px;
  border-left: 2px solid var(--cyan);
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s var(--ease);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
