<script setup lang="ts">
import { computed, ref } from 'vue'
import { mentionables, tags, type Tag } from '../data'

const active = ref<Tag | null>(null)
const shown = computed(() => (active.value ? mentionables.filter((m) => m.tag === active.value) : mentionables))

function toggle(tag: Tag) {
  active.value = active.value === tag ? null : tag
}
</script>

<template>
  <section id="mentionables" class="panel">
    <div class="inner">
      <div class="head" v-reveal>
        <p class="mono">02 — mentionables</p>
        <h2>A ledger of things worth <em>mentioning</em>, from jam sessions to planetaria.</h2>
      </div>

      <div class="filters" v-reveal role="group" aria-label="filter by topic">
        <button
          v-for="tag in tags"
          :key="tag"
          class="mono"
          :class="[tag, { on: active === tag }]"
          :aria-pressed="active === tag"
          @click="toggle(tag)"
        >
          {{ tag }}
        </button>
      </div>

      <TransitionGroup tag="ol" name="row" class="list">
        <li v-for="m in shown" :key="m.title" :class="m.tag">
          <span class="mono year">{{ m.year }}</span>
          <component :is="m.link ? 'a' : 'span'" class="title" :href="m.link" target="_blank" rel="noopener">
            {{ m.title }}<span v-if="m.link" class="arrow" aria-hidden="true">↗</span>
          </component>
          <span class="where">{{ m.where }}</span>
          <span class="mono tag">{{ m.tag }}</span>
        </li>
      </TransitionGroup>
    </div>
  </section>
</template>

<style scoped>
.visuals {
  --c: var(--cyan);
}
.music {
  --c: var(--pink);
}
.tools {
  --c: var(--amber);
}
.web3 {
  --c: #a98bff;
}
.teaching {
  --c: #7dffb0;
}
.life {
  --c: #ff8a5c;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;

  & button {
    cursor: pointer;
    color: var(--fg);
    background: transparent;
    border: 1px solid var(--line);
    border-radius: 99px;
    padding: 6px 14px 6px 12px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition:
      background 0.3s,
      border-color 0.3s,
      color 0.3s;

    &::before {
      content: '';
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--c);
    }

    &:hover {
      border-color: var(--c);
    }
    &.on {
      background: var(--c);
      border-color: var(--c);
      color: var(--bg);
      &::before {
        background: var(--bg);
      }
    }
  }
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;

  & li {
    display: grid;
    grid-template-columns: 4.5em 1fr minmax(0, 16em) 6em;
    align-items: baseline;
    gap: 4px 20px;
    padding: 14px 0;
    border-bottom: 1px solid var(--line);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -1px;
      height: 1px;
      width: 0;
      background: var(--c);
      transition: width 0.6s var(--ease);
    }
    &:hover::after {
      width: 100%;
    }

    @media (max-width: 760px) {
      grid-template-columns: 3.5em 1fr;
      & .where {
        grid-column: 2;
      }
      & .tag {
        display: none;
      }
    }
  }

  & .title {
    text-decoration: none;
  }
  & a.title:hover {
    color: var(--c);
  }
  & .arrow {
    font-size: var(--fs-s);
    margin-left: 6px;
    color: var(--muted);
  }
  & .where {
    color: var(--muted);
    font-style: italic;
  }
  & .tag {
    text-align: right;
    color: var(--c);
  }
}

.row-move,
.row-enter-active,
.row-leave-active {
  transition:
    opacity 0.45s var(--ease),
    transform 0.45s var(--ease);
}
.row-enter-from,
.row-leave-to {
  opacity: 0;
  transform: translateX(-16px);
}
.row-leave-active {
  position: absolute;
  width: 100%;
}
</style>
