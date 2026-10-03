<script setup lang="ts">
import { ref } from 'vue'
import { contact } from '../data'

const topics = [
  'agents that plan alongside humans',
  'live visuals & fulldome',
  'decentralized coordination',
  'music × machine learning',
  'long journeys, slow travel',
  'whatever you are obsessed with',
]

const copied = ref(false)
async function copy() {
  try {
    await navigator.clipboard.writeText(contact.email)
    copied.value = true
    setTimeout(() => (copied.value = false), 1800)
  } catch {
    location.href = `mailto:${contact.email}`
  }
}
</script>

<template>
  <section id="contact" class="panel">
    <div class="inner">
      <div class="head" v-reveal>
        <p class="mono">05 — contact</p>
        <h2>Let’s talk <em>futures</em>.</h2>
        <p>
          I want to meet the most interesting people in tech: thinkers, idealists, hackers. People building strange
          tools, coordination systems, art machines, or AI that helps humans realize what they actually want. If
          that’s you, write me.
        </p>
      </div>

      <ul class="topics" v-reveal>
        <li v-for="t in topics" :key="t" class="mono">{{ t }}</li>
      </ul>

      <div class="reach" v-reveal>
        <a class="email" :href="`mailto:${contact.email}`">{{ contact.email }}</a>
        <button class="mono" @click="copy">{{ copied ? 'copied ✓' : 'copy' }}</button>
      </div>
      <p class="links mono" v-reveal>
        <a :href="contact.github" target="_blank" rel="noopener">github</a>
        <a :href="contact.soundcloud" target="_blank" rel="noopener">soundcloud</a>
        <a :href="contact.youtube" target="_blank" rel="noopener">youtube</a>
        <a :href="contact.instagram" target="_blank" rel="noopener">instagram</a>
      </p>
    </div>
    <footer class="mono">
      <span>“Whenever I get asked for my CV I realize I’m unemployable.”</span>
      <span>© {{ new Date().getFullYear() }} Felix Niemeyer · built with Vue</span>
    </footer>
  </section>
</template>

<style scoped>
.head p {
  color: color-mix(in srgb, var(--fg) 78%, transparent);
}

.topics {
  list-style: none;
  padding: 0;
  margin: 0 0 56px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-width: 820px;

  & li {
    color: var(--fg);
    border: 1px dashed var(--line);
    border-radius: 99px;
    padding: 6px 14px;
  }
}

.reach {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px 24px;

  & .email {
    font-size: var(--fs-l);
    font-style: italic;
    text-decoration: none;
    background: linear-gradient(90deg, var(--cyan), var(--pink));
    background-size: 0% 1px;
    background-repeat: no-repeat;
    background-position: 0 100%;
    transition:
      background-size 0.6s var(--ease),
      color 0.3s;
    word-break: break-all;
    &:hover {
      background-size: 100% 1px;
    }
  }

  & button {
    cursor: pointer;
    color: var(--fg);
    background: transparent;
    border: 1px solid var(--line);
    border-radius: 99px;
    padding: 6px 14px;
    &:hover {
      border-color: var(--cyan);
    }
  }
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  margin-top: 24px;
}

footer {
  max-width: var(--max);
  margin: clamp(96px, 14vw, 180px) auto 0;
  padding-top: 24px;
  border-top: 1px solid var(--line);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px 32px;
}
</style>
