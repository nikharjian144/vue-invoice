<script setup>
import HelloWorld from '@/components/HelloWorld.vue'
import { RouterLink, RouterView } from 'vue-router'
import TheWelcome from '@/components/TheWelcome.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/invoices">Invoices</RouterLink>
      </nav>
    </div>
  </header>
  <main>
    <TheWelcome />
  </main>
</template>
