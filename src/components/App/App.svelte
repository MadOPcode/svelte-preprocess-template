<template>
  <div id="app">
    <h1>Hello <span class="name">{name}</span>!</h1>
    <Nested />
  </div>
</template>

<script lang="typescript">
  import Nested from 'components/Nested';
  let name: string = 'Svelte';
</script>

<style lang="scss">
  $name-text-color: #dd2911;

  .name {
    color: $name-text-color;
  }
</style>
