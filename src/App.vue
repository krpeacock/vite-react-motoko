<script setup lang="ts">
import { ref } from 'vue';
import logo from './assets/logo2.svg';
import { backend } from './declarations/backend/index';
let greeting = ref('');

async function handleSubmit(e: SubmitEvent) {
  e.preventDefault();
  const target = e.target as HTMLFormElement;
  const name = (target.querySelector('#name') as HTMLInputElement).value;
  await backend.greet(name).then((response) => {
    greeting.value = response;
  });
}
</script>

<template>
  <main>
    <img v-bind:src="logo" alt="DFINITY logo" />
    <br />
    <br />
    <form action="#" @submit="handleSubmit">
      <label for="name">Enter your name: &nbsp;</label>
      <input id="name" alt="Name" type="text" />
      <button type="submit">Click Me!</button>
    </form>
    <section id="greeting">{{ greeting }}</section>
  </main>
</template>
