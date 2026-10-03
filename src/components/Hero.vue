<script setup lang="ts">
import { ref } from 'vue'
import { reel } from '../data'

const roles = ['creative technologist', 'builder', 'traveler']
const playing = ref(false)
</script>

<template>
  <header class="hero">
    <div class="inner">
      <div class="name">
        <p class="mono intro">hi, I'm</p>
        <h1>
          <span v-for="(part, i) in ['Felix', 'Niemeyer']" :key="part" :style="{ '--i': i }">{{ part }}</span>
        </h1>
        <p class="roles">
          <span v-for="(role, i) in roles" :key="role" :style="{ '--i': i + 2 }">{{ role }}</span>
        </p>
      </div>
      <p class="lede">
        I write real-time visuals for planetarium domes and festival stages, build tools that turn ideas into steps,
        and am rarely at home. Looking for the <em>thinkers, idealists and hackers</em>.
      </p>
      <figure class="reel">
        <iframe
          v-if="playing"
          :src="`https://www.youtube-nocookie.com/embed/${reel.youtube}?autoplay=1&rel=0`"
          :title="reel.title"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowfullscreen
        ></iframe>
        <button v-else :aria-label="`play ${reel.title}`" @click="playing = true">
          <img :src="`https://i.ytimg.com/vi/${reel.youtube}/maxresdefault.jpg`" :alt="reel.title" fetchpriority="high" />
          <span class="play" aria-hidden="true"></span>
        </button>
        <figcaption class="mono">{{ reel.title }} · {{ reel.caption }}</figcaption>
      </figure>
    </div>
  </header>
</template>

<style scoped>
.hero {
  min-height: 100svh;
  display: grid;
  align-items: center;
  padding: 120px var(--gutter) 96px;
  background:
    radial-gradient(circle at 80% 0%, rgba(255, 198, 92, 0.07), transparent 45%),
    radial-gradient(circle at 0% 100%, rgba(110, 242, 255, 0.05), transparent 40%);

  & .inner {
    width: 100%;
    max-width: var(--max);
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 32px clamp(32px, 5vw, 72px);
    align-items: center;

    @media (max-width: 900px) {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  & .reel {
    grid-column: 2;
    grid-row: 1 / span 2;
    @media (max-width: 900px) {
      grid-column: auto;
      grid-row: auto;
    }
  }

  & h1 {
    font-size: var(--fs-xl);
    font-weight: 300;
    line-height: 0.92;
    letter-spacing: -0.035em;
    margin: 12px 0 28px;

    & span {
      display: block;
      &:last-child {
        font-style: italic;
        padding-left: 0.6em;
        background: linear-gradient(90deg, var(--cyan), var(--pink) 60%, var(--amber));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
    }
  }

  & span,
  & .intro,
  & .lede,
  & .reel {
    animation: rise 1.2s var(--ease) both;
    animation-delay: calc(var(--i, 0) * 0.12s + 0.1s);
  }

  & .roles {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 28px;
    font-family: var(--mono);
    font-size: var(--fs-s);
    text-transform: uppercase;
    letter-spacing: 0.18em;

    & span {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      &::before {
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--cyan);
        box-shadow: 0 0 12px var(--cyan);
      }
      &:nth-child(2)::before {
        background: var(--pink);
        box-shadow: 0 0 12px var(--pink);
      }
      &:nth-child(3)::before {
        background: var(--amber);
        box-shadow: 0 0 12px var(--amber);
      }
    }
  }

  & .lede {
    --i: 5;
    align-self: start;
    font-size: var(--fs-m);
    max-width: 40ch;
    color: color-mix(in srgb, var(--fg) 85%, transparent);

    & em {
      color: var(--fg);
    }
  }

  & .reel {
    --i: 6;
    margin: 0;
    display: grid;
    gap: 10px;

    & button,
    & iframe {
      display: block;
      width: 100%;
      aspect-ratio: 16 / 9;
      border: 1px solid var(--line);
      border-radius: 14px;
      overflow: hidden;
      background: #000;
    }

    & button {
      position: relative;
      padding: 0;
      cursor: pointer;
      transition:
        border-color 0.4s,
        box-shadow 0.5s;

      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.8s var(--ease);
      }

      &:hover {
        border-color: color-mix(in srgb, var(--cyan) 50%, transparent);
        box-shadow: 0 24px 80px -24px color-mix(in srgb, var(--cyan) 45%, transparent);
        & img {
          transform: scale(1.03);
        }
        & .play {
          transform: translate(-50%, -50%) scale(1.08);
        }
      }
    }

    & .play {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 72px;
      height: 72px;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: rgba(5, 5, 10, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.3);
      -webkit-backdrop-filter: blur(6px);
      backdrop-filter: blur(6px);
      transition: transform 0.4s var(--ease);
      animation: none;
      &::after {
        content: '';
        position: absolute;
        left: 28px;
        top: 23px;
        border: 13px solid transparent;
        border-left: 20px solid var(--fg);
        border-right: 0;
      }
    }
  }
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(0.4em);
    filter: blur(8px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero * {
    animation: none !important;
  }
}
</style>
