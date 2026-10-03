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
]

const born = new Date(1993, 6, 13)
const age = Math.floor((Date.now() - born.getTime()) / (365.25 * 24 * 3600 * 1000))
const span = 90

// overlapping raised-cosine curves: take peaks at birth and is gone by 30,
// make peaks at 45, give grows towards 90
const bump = (x: number) => (Math.abs(x) < 1 ? 0.5 * (1 + Math.cos(Math.PI * x)) : 0)
const phases = [
  { name: 'take', weight: (a: number) => (a < 30 ? bump(a / 30) : 0), text: 'Take in as much as possible.' },
  { name: 'make', weight: (a: number) => bump((a - 45) / 30), text: 'Start projects, meet and inspire people, move matter.' },
  { name: 'give', weight: (a: number) => (a > 50 ? bump((a - 90) / 40) : 0), text: 'Give back, and choose who carries things on.' },
]

const W = 900
const H = 200
const x = (a: number) => (a / span) * W
const y = (v: number) => H - 16 - v * (H - 40)
const ages = Array.from({ length: span + 1 }, (_, a) => a)
const paths = phases.map((p) => {
  const line = ages.map((a) => `${x(a).toFixed(1)},${y(p.weight(a)).toFixed(1)}`).join(' L')
  return { name: p.name, line: `M${line}`, area: `M${x(0)},${y(0)} L${line} L${x(span)},${y(0)} Z` }
})
const ticks = [0, 30, 45, 60, 90]

const dominant = phases.reduce((best, p) => (p.weight(age) > best.weight(age) ? p : best))
const selectedName = ref(dominant.name)
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
        <p class="mono">a rough structure for a life — the phases blend</p>
        <svg class="curves" :viewBox="`0 0 ${W} ${H}`" role="img" aria-label="take peaks at birth, make at 45, give at 90">
          <line class="axis" :x1="0" :x2="W" :y1="y(0)" :y2="y(0)" />
          <g v-for="t in ticks" :key="t">
            <text class="tick" :x="x(t)" :y="H - 1" :text-anchor="t === 0 ? 'start' : t === span ? 'end' : 'middle'">{{ t }}</text>
          </g>
          <g
            v-for="p in paths"
            :key="p.name"
            :class="[p.name, { on: selectedName === p.name }]"
            @click="selectedName = p.name"
          >
            <path class="area" :d="p.area" />
            <path class="line" :d="p.line" />
          </g>
          <line class="me" :x1="x(age)" :x2="x(age)" :y1="12" :y2="y(0)" />
          <text class="tick me-label" :x="x(age) + 8" :y="22">me, {{ age }}</text>
        </svg>
        <div class="legend">
          <button
            v-for="p in phases"
            :key="p.name"
            class="mono"
            :class="[p.name, { on: selectedName === p.name }]"
            @click="selectedName = p.name"
          >
            {{ p.name }}
          </button>
        </div>
        <Transition name="fade" mode="out-in">
          <p :key="selected.name" class="phase-text">{{ selected.text }}</p>
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

  & .take {
    --c: var(--cyan);
  }
  & .make {
    --c: var(--pink);
  }
  & .give {
    --c: var(--amber);
  }

  & .curves {
    width: 100%;
    height: auto;
    margin: 24px 0 4px;
    overflow: visible;

    & g {
      cursor: pointer;
    }
    & .area {
      fill: var(--c);
      fill-opacity: 0.08;
      transition: fill-opacity 0.4s;
    }
    & .line {
      fill: none;
      stroke: var(--c);
      stroke-width: 2;
      stroke-opacity: 0.6;
      vector-effect: non-scaling-stroke;
      transition: stroke-opacity 0.4s;
    }
    & g.on,
    & g:hover {
      & .area {
        fill-opacity: 0.25;
      }
      & .line {
        stroke-opacity: 1;
      }
    }
    & .axis {
      stroke: var(--line);
    }
    & .me {
      stroke: var(--fg);
      stroke-dasharray: 3 4;
    }
    & .tick {
      font-family: var(--mono);
      font-size: 13px;
      fill: var(--muted);
    }
    & .me-label {
      fill: var(--fg);
    }
  }

  & .legend {
    display: flex;
    gap: 8px;

    & button {
      cursor: pointer;
      color: var(--fg);
      background: transparent;
      border: 1px solid var(--c);
      border-radius: 99px;
      padding: 4px 14px;
      transition: background 0.3s;
      &.on,
      &:hover {
        background: color-mix(in srgb, var(--c) 30%, transparent);
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
