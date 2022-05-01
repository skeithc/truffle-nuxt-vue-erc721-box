<script setup lang="ts">
const route = useRoute();

useHead({
  title: `Magic Token - ${route.meta.title}`,
  meta: [
    { name: 'description', content: 'Magic Token Mint' },
    { name: 'keywords', content: 'magic, token, nft, mint, erc721, ethereum' }
  ]
})
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style lang="stylus">
body
  background #222
  color white
</style>
