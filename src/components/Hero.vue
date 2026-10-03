<script setup lang="ts">
const roles = ['creative technologist', 'builder', 'traveler']
</script>

<template>
  <header class="hero">
    <div class="inner">
      <p class="mono intro">hi, I'm</p>
      <h1>
        <span v-for="(part, i) in ['Felix', 'Niemeyer']" :key="part" :style="{ '--i': i }">{{ part }}</span>
      </h1>
      <p class="roles">
        <span v-for="(role, i) in roles" :key="role" :style="{ '--i': i + 2 }">{{ role }}</span>
      </p>
      <p class="lede">
        I write shaders for planetarium domes and festival stages, build tools that turn ideas into
        steps, and keep moving. Looking for the <em>thinkers, idealists and hackers</em>.
      </p>
    </div>
    <p class="mono hint">tap anywhere — the water listens</p>
  </header>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: grid;
  align-items: center;
  padding: 120px var(--gutter) 96px;
  /* fallback when WebGL is unavailable */
  background: radial-gradient(circle at 75% 0%, rgba(255, 198, 92, 0.06), transparent 50%);

  & .inner {
    width: 100%;
    max-width: var(--max);
    margin: 0 auto;
    pointer-events: none;
    & a,
    & em {
      pointer-events: auto;
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
  & .lede {
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
    margin-bottom: 36px;

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
    max-width: 34ch;
    font-size: var(--fs-l);
    font-weight: 300;
    line-height: 1.3;
    color: color-mix(in srgb, var(--fg) 85%, transparent);

    & em {
      color: var(--fg);
    }
  }

  & .hint {
    position: absolute;
    left: 50%;
    bottom: 28px;
    transform: translateX(-50%);
    white-space: nowrap;
    animation: breathe 4s ease-in-out infinite;
  }
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(0.4em);
    filter: blur(8px);
  }
}

@keyframes breathe {
  50% {
    opacity: 0.35;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero * {
    animation: none !important;
  }
}
</style>
